import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store"; // Update with your store's root state type

interface ProtectedRouteProps {
  children: React.ReactElement; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get the authentication state from Redux
  const phoneNumber = useSelector((state: RootState) => state.login.phoneNumber); // ✅ Use phoneNumber instead of token

  // If no phone number is found, redirect to the login page
  if (!phoneNumber) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (phone number exists), render the children
  return children;
};

export default ProtectedRoute;
