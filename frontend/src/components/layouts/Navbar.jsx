import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout } from "../../redux/slices/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const onLogoutClick = () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ticketing System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo && (
              <>
                <Nav.Link as={Link} to="/">
                  Tickets
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link
                  as="button"
                  onClick={onLogoutClick}
                  style={{ background: "none", border: "none" }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
            {!userInfo && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}

            <Nav.Link
              as={Link}
              to="https://documenter.getpostman.com/view/23024675/2sAYdimUYu"
              target="_blank"
            >
              API Doc
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
