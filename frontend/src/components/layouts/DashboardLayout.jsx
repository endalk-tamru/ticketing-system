import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

import NavBar from "./Navbar";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <NavBar />

      <Container className="d-flex flex-column align-items-center my-5 min-vh-100">
        <h2 className="mb-2">Welcome {userInfo?.username || ""}!</h2>
        <Outlet />
        <Toaster />
      </Container>
    </>
  );
}
