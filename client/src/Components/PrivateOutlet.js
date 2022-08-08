import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet({ auth }) {
  return auth ? <Outlet /> : <Navigate to="/" />;
}
