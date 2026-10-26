import { Link, Navigate, useLocation } from "react-router-dom";
import { getToken, getUser } from "../auth";

// Dapat kapareho ng ROLE_HOME sa SignIn.jsx
const ROLE_HOME = {
  ADMIN: "/admin",
  AFFILIATE: "/affiliate",
  CLIENT: "/appointments",
};

// roles (optional): listahan ng role na pwede sa page. Kapag wala, kahit sinong naka-login ay pwede.
export default function RequireAuth({ children, roles }) {
  const location = useLocation();
  const token = getToken();
  const user = getUser();

  // Hindi naka-login
  if (!token || !user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  // Naka-login pero hindi para sa role niya ang page
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  // Admin na nagpi-preview ng client/affiliate site: may "Back to Admin" button sa kanang-ibaba
  const isPreview = user.role === "ADMIN" && !location.pathname.startsWith("/admin");

  return (
    <>
      {children}
      {isPreview && (
        <Link
          to="/admin"
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full bg-[#1f4d3f] px-4 py-2.5 text-[13px] font-semibold text-white no-underline shadow-lg transition-colors hover:bg-[#2a8570]"
        >
          <span className="size-2 rounded-full bg-[#f3b53f]" />
          Previewing as admin · Back to Admin
        </Link>
      )}
    </>
  );
}