import { Link, useNavigate } from "react-router";
import { Badge, Container, Nav, Navbar, Button } from "react-bootstrap";
import { BsBookmarks } from "react-icons/bs";

import { useSelector } from "react-redux";

import { getItem } from "../utils/session";

const AppNavbar = () => {
  const { quantity } = useSelector((state) => state.bookmark);
  const navigate = useNavigate();
  const { name = "" } = JSON.parse(getItem("currentUser"));
  return (
    <div>
      <Navbar
        expand="lg"
        className="py-3"
        bg="light"
        data-bs-theme="light"
        fixed="top"
      >
        <Container>
          <Link to="/" className="navbar-brand fw-bold">
            <img src="auth/logo.png" width={"auto"} height={30} />
            &nbsp; Blog Quill
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/blogs" className="nav-link">
                Blogs
              </Link>
            </Nav>
            <Button
              variant="outline-danger"
              size="sm"
              className="me-2"
              onClick={() => navigate("/bookmarks")}
            >
              <BsBookmarks size="1.3em" />
              <Badge bg="dark">{quantity}</Badge>
            </Button>
            {name ? (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/admin")}
              >
                Welcome {name}
              </Button>
            ) : (
              <Button variant="outline-success" size="sm">
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
