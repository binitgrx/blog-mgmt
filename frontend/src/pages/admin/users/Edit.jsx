import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { getById, resetPassword, updateUserRole } from "../../../slices/userSlice";
import { BASE_URL } from "../../../constants";
import ToastBox from "../../../components/Toast";

const UserEdit = () => {
  const { pathname = "" } = useLocation();
  const userId = pathname.split("/")[3] ?? "";
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.users);
  const [profilePic, setProfilePic] = useState([]);
  const [preview, setPreview] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
  });
  const [msg, setMsg] = useState("");
  const [roles, setRoles] = useState({ admin: false, user: false });
  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    newPassword: "",
  });

  const handleResetPasswordChange = (e) => {
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(resetPasswordData));
    setMsg("Password reset successfully.");
  };

  const handleRolesChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleRolesSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = [];
    if (roles.admin) selectedRoles.push("admin");
    if (roles.user) selectedRoles.push("user");

    console.log("Selected Roles:", selectedRoles);

    dispatch(updateUserRole({ id: userId, roles: selectedRoles }));

    setMsg("Roles updated successfully");
  };

  useEffect(() => {
    setPreview([]);
    if (!profilePic) {
      return;
    }
    profilePic.map((file) => {
      const objectUrl = URL.createObjectURL(file);
      setPreview((prev) => [...prev, objectUrl]);
    });
  }, [profilePic]);

  useEffect(() => {
    dispatch(getById(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setPayload({ name: user?.name, email: user?.email });
      if (user?.profilePic) setPreview([`${BASE_URL}/resources${user?.profilePic}`]);
  
      const userRoles = user?.roles || [];
      setRoles({
        admin: userRoles.includes("admin"),
        user: userRoles.includes("user"),
      });
    }
  }, [user]);
  

  return (
    <div className="d-flex container justify-content-center">
      {error && <ToastBox msg={error} />}
      {msg && <ToastBox msg={msg} variant="success" />}
      <div className="col-lg-6">
        <div className="text-center h3">Edit User</div>
       <>
  <div className="text-center mb-3">
    {preview && preview.length > 0 && (
      <Image
        src={preview[0]}
        fluid
        style={{ maxHeight: "200px", maxWidth: "200px", borderRadius: "50%" }}
      />
    )}
  </div>

  <div className="mb-3">
    <label className="form-label">Name</label>
    <input
      className="form-control"
      value={payload?.name}
      placeholder="Enter Name"
      onChange={(e) =>
        setPayload((prev) => ({ ...prev, name: e.target.value }))
      }
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Email</label>
    <input
      className="form-control"
      value={payload?.email}
      placeholder="Enter Email"
      onChange={(e) =>
        setPayload((prev) => ({ ...prev, email: e.target.value }))
      }
    />
  </div>
</>

        <hr />
        <Form onSubmit={handleResetPasswordSubmit}>
          <div className="text-center h4">Reset Password</div>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={resetPasswordData.email=payload?.email}
              placeholder="Enter Email"
              onChange={handleResetPasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={resetPasswordData.newPassword}
              placeholder="Enter New Password"
              onChange={handleResetPasswordChange}
            />
          </Form.Group>
          <Button variant="warning" type="submit" className="me-2">
            Reset Password
          </Button>
        </Form>
        <hr />
        <Form onSubmit={handleRolesSubmit}>
          <div className="text-center h4">User Roles</div>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                label="Admin"
                name="admin"
                checked={roles.admin}
                onChange={handleRolesChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="User"
                name="user"
                checked={roles.user}
                onChange={handleRolesChange}
              />
            </Col>
          </Row>
          <Button variant="info" type="submit" className="me-2 mt-3">
            Update Roles
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserEdit;
