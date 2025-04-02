import { Link } from "react-router";
import { Button, Table } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { removeAll, removeBookmark } from "../../slices/bookmarkSlice";

import EmptyCart from "../../components/EmptyCart";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);

  const handleRemoveAll = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      // logic
      dispatch(removeAll());
      Swal.fire({
        title: "Deleted!",
        text: "Your bookmarks have been deleted.",
        icon: "success",
      });
    }
  };

  return (
    <>
      {bookmarks.length === 0 ? (
        <>
          <EmptyCart />
        </>
      ) : (
        <div>
          <h3 className="text-center">My Bookmarks</h3>
          <div className="d-flex flex-row-reverse">
            <Button variant="danger" onClick={handleRemoveAll}>
              Remove All
            </Button>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookmarks.map((bm, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link
                      to={`/blogs/${bm?.slug}`}
                      className="link-offset-2 link-underline link-underline-opacity-0"
                    >
                      {bm?.title}
                    </Link>
                  </td>
                  <td>{bm?.author?.name}</td>
                  <td>
                    <BiTrash
                      color="red"
                      onClick={() => dispatch(removeBookmark(bm?.slug))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
