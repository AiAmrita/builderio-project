import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLoginModal } from "./AdminLoginModal";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
}) => {
  const { isAdminAuthenticated, setShowLoginModal } = useAdminAuth();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAdminAuthenticated, setShowLoginModal]);

  if (!isAdminAuthenticated) {
    return (
      <>
        <Navigate to="/help" replace />
        <AdminLoginModal />
      </>
    );
  }

  return <>{children}</>;
};
