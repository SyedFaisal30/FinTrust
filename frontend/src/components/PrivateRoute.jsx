import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ allowedRoles = ["customer"], children }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  if (!token || !isLoggedIn || !allowedRoles.includes(role)) {
    const fallbackLogin = location.pathname.startsWith("/banker")
      ? "/banker-login"
      : "/login";

    return <Navigate to={fallbackLogin} replace />;
  }

  return children;
};

export default PrivateRoute;
