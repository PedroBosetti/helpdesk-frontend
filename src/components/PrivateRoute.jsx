import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth';

export function PrivateRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
