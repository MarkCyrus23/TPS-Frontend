import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const authed = sessionStorage.getItem("tf_auth") === "1";
  if (!authed) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }
  return children;
}
