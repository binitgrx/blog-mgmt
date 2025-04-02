import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

import {getById} from "../../../slices/userSlice";
import ToastBox from "../../../components/Toast";

const UserEdit = () => {
  const { pathname = "" } = useLocation();
  const userId = pathname.split("/")[3] ?? "";
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.users);
  const [msg, setMsg] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = await dispatch(updateUser({ id: userId, payload }));
    if (d?.payload?.msg) {
      setMsg(d?.payload?.msg);
    }
  };

  useEffect(() => {
    dispatch(getById(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (user) {
      setPayload({ name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <div className="d-flex container justify-content-center">
      {error && <ToastBox msg={error} />}
      {msg && <ToastBox msg={msg} variant="success" />}
      <div className="col-lg-6">
        <div className="text-center h3">Edit User</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={payload.name}
              placeholder="Enter Name"
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={payload.email}
              placeholder="Enter Email"
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Update
          </Button>
          <Link className="btn btn-danger" to="/admin/users">
            Go back
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default UserEdit;