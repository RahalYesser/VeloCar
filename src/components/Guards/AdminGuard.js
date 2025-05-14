import { Navigate, Outlet } from 'react-router-dom';

const AdminGuard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Check if user exists and has admin role
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
