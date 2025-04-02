import { useCallback, useEffect } from "react";
import { Link } from "react-router";
import { Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";

import {
  listUsers
} from "../../../slices/userSlice";

import AlertBox from "../../../components/AlertBox";
import { TableLoading } from "../../../components/SkeletalLoading";
import Paginate from "../../../components/Paginate";
import ToastBox from "../../../components/Toast";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, currentPage, error, limit, loading, total } = useSelector(
    (state) => state.users
  );
  console.log(users);
  // const handleStatusChange = (blog) => {
  //   dispatch(updateStatusBySlug(blog.slug));
  // };

  const handleCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const handleLimit = (num) => {
    dispatch(setLimit(num));
  };

  // const handleRemove = (blog) => {
  //   dispatch(removeBySlug(blog?.slug));
  // };

  const initFetch = useCallback(() => {
    dispatch(listUsers({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div>
      {error && <ToastBox msg={error} />}
      {loading && users.length === 0 && (
        <TableLoading tableHeaders={["Name", "Email", "Status"]} />
      )}
      {!loading && users.length === 0 && <AlertBox label="Data not found..." />}
      
      {users && users.length > 0 && (
        <Table striped>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <Link
                    to={`/admin/users/${user?._id}`}
                    className="link-offset-2 link-underline link-underline-opacity-0"
                  >
                    {user?.name}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>
                  {user?.roles}
                </td>
                <td>
                  <BiTrash color="red" onClick={() => handleRemove(user)} />
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

export default UserList;
