import { Link, useLocation, useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";

import { getInitials } from "../utils/textParser";
import { getItem, removeData } from "../utils/session";
import { getDecodedTokenInfo } from "../utils/routeGuard";

import { AvatarComponent } from "avatar-initials";

const adminRoutes = [
  { label: "Home", url: "/admin", roles: ["user", "admin"] },
  { label: "My Blogs", url: "/admin/my-blogs", roles: ["user", "admin"] },
  { label: "Blogs", url: "/admin/blogs", roles: ["admin"] },
  { label: "Users", url: "/admin/users", roles: ["admin"] },
];

const getCurrentUserNavLinks = (links = []) => {
  const {
    data: { roles = [] },
  } = getDecodedTokenInfo();
  return links.filter((link) =>
    link?.roles.some((role) => roles.includes(role))
  );
};

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { name = "" } = JSON.parse(getItem("currentUser"));

  const handleLogout = () => {
    removeData();
    navigate("/auth/login");
  };

  const navLinks = getCurrentUserNavLinks(adminRoutes);
  return (
    <>
      <div className="col-auto">
        <div
          className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary vh-100"
          style={{ maxWidth: "310px", width: "310px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {navLinks.map((link, idx) => (
              <li key={idx} className="nav-item">
                <Link
                  to={link?.url}
                  className={`nav-link ${
                    pathname === link.url ? "active" : "link-body-emphasis"
                  } `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          <Dropdown data-bs-theme="light">
            <Dropdown.Toggle variant="outline-secondary">
              <AvatarComponent
                classes="rounded-full"
                useGravatar={false}
                size={24}
                color="#000000"
                background="#f1f1f1"
                fontSize={16}
                fontWeight={400}
                offsetY={12}
                initials={getInitials(name)}
              />
              <strong> &nbsp; {name}</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/admin/profile" className="dropdown-item">
                Profile
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
