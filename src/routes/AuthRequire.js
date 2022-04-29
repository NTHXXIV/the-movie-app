import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthRequire({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  console.log(location);

  if (!currentUser.uid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
