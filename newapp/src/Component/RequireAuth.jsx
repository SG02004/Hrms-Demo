import { Navigate } from 'react-router-dom';

// RequireAuth wraps protected route and If no token in localStorage -> redirect to login
// If token exists ->show the children

export default function RequireAuth({ children }) {
  const token = localStorage.getItem('auth_token');
 
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
