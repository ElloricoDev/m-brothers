import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
