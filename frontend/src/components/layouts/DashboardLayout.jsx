import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

import NavBar from "./Navbar";

export default function DashboardLayout() {
  return (
    <>
      <NavBar />

      <Container className="d-flex flex-column align-items-center my-5 min-vh-100">
        <h2 className="mb-2">Welcome!</h2>
        <Outlet />
        <Toaster />
      </Container>
    </>
  );
}
