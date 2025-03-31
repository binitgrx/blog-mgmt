import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-4 border-top mt-2">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          ></Link>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; {new Date().getFullYear()} BlogQuill, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-5">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              target="_blank"
              href="https://github.com/Aurora-Academy/batch-11-blog-mgmt-fe"
            >
              <FaGithub width={24} height={24} />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
