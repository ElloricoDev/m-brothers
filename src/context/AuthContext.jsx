import { useState } from 'react';
import { AuthContext } from './authContextValue';

const USERS_KEY = 'mbrothers-users';
const CURRENT_USER_KEY = 'mbrothers-current-user';

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'MBrothers Admin',
    email: 'admin@mbrothers.ph',
    password: 'admin123',
    role: 'admin',
  },
];

const loadUsers = () => {
  const savedUsers = localStorage.getItem(USERS_KEY);
  if (!savedUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    const parsedUsers = JSON.parse(savedUsers);
    const hasDefaultAdmin = parsedUsers.some(user => user.email === defaultUsers[0].email);

    if (hasDefaultAdmin) {
      return parsedUsers;
    }

    const usersWithAdmin = [...parsedUsers, defaultUsers[0]];
    localStorage.setItem(USERS_KEY, JSON.stringify(usersWithAdmin));
    return usersWithAdmin;
  } catch (error) {
    console.error('Failed to load users:', error);
    return defaultUsers;
  }
};

const loadCurrentUser = () => {
  const savedUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error('Failed to load current user:', error);
    return null;
  }
};

const withoutPassword = (user) => {
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  const saveUsers = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
  };

  const setSession = (user) => {
    const sessionUser = withoutPassword(user);
    setCurrentUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const register = ({ name, email, password, role }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = users.find(user => user.email === normalizedEmail);

    if (existingUser) {
      return { ok: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    };

    saveUsers([...users, newUser]);
    const sessionUser = setSession(newUser);
    return { ok: true, user: sessionUser };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(account => account.email === normalizedEmail && account.password === password);

    if (!user) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    const sessionUser = setSession(user);
    return { ok: true, user: sessionUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = ({ name, email }) => {
    if (!currentUser) {
      return { ok: false, message: 'You must be logged in to update your profile.' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailTaken = users.some(user => user.email === normalizedEmail && user.id !== currentUser.id);

    if (emailTaken) {
      return { ok: false, message: 'Another account already uses this email.' };
    }

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: normalizedEmail,
    };

    const updatedUsers = users.map(user =>
      user.id === currentUser.id ? { ...user, name: updatedUser.name, email: updatedUser.email } : user
    );

    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return { ok: true, user: updatedUser };
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === 'admin',
    login,
    logout,
    register,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
