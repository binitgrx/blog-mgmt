import { useCallback, useEffect } from "react";
import { Link } from "react-router";
import { Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";

import {
  getMyBlogs,
  updateStatusBySlug,
  removeBySlug,
  setCurrentPage,
  setLimit,
} from "../../../slices/blogSlice";

import AlertBox from "../../../components/AlertBox";
import { TableLoading } from "../../../components/SkeletalLoading";
import Paginate from "../../../components/Paginate";
import ToastBox from "../../../components/Toast";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, currentPage, error, limit, loading, total } = useSelector(
    (state) => state.blogs
  );

  const handleStatusChange = (blog) => {
    dispatch(updateStatusBySlug(blog.slug));
  };

  const handleCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const handleLimit = (num) => {
    dispatch(setLimit(num));
  };

  const handleRemove = (blog) => {
    dispatch(removeBySlug(blog?.slug));
  };

  const initFetch = useCallback(() => {
    dispatch(getMyBlogs({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div>
      {error && <ToastBox msg={error} />}
      {loading && blogs.length === 0 && (
        <TableLoading tableHeaders={["title", "Author", "Status"]} />
      )}
      {!loading && blogs.length === 0 && <AlertBox label="Data not found..." />}
      <div className="d-flex flex-row-reverse">
        <Link to="/admin/add-blog" className="btn btn-danger">
          Add
        </Link>
      </div>
      {blogs && blogs.length > 0 && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <Link
                    to={`/admin/blogs/${blog?._id}`}
                    className="link-offset-2 link-underline link-underline-opacity-0"
                  >
                    {blog?.title}
                  </Link>
                </td>
                <td>{blog?.author?.name}</td>
                <td>
                  <Form.Check
                    type="switch"
                    checked={blog?.status === "published"}
                    onChange={() => handleStatusChange(blog)}
                  />
                </td>
                <td>
                  <BiTrash color="red" onClick={() => handleRemove(blog)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="d-flex justify-content-center">
        <Paginate
          //blogs, currentPage, limit
          currentPage={currentPage}
          limit={limit}
          total={total}
          setPage={handleCurrentPage}
          setLimit={handleLimit}
        />
      </div>
    </div>
  );
};

export default BlogList;
