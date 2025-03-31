import { Link } from "react-router";
import { BsCartX, BsArrowRight } from "react-icons/bs";

const EmptyCart = () => {
  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <BsCartX
          className="bi mt-4 mb-3"
          style={{ color: "var(--bs-indigo)" }}
          width="100"
          height="100"
          size={100}
        />
        <h1 className="text-body-emphasis">No Bookmarks found!</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Visit blogs section to start adding bookmarks.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <Link
            to="/blogs"
            className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
            type="button"
          >
            Go to Blogs &nbsp;
            <BsArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
