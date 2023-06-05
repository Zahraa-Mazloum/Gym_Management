import { useLocation, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import Layout from "./layout";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    toast.warning("Please login first!");

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RequireAuth;
