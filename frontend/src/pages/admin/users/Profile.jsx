import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Form, Image, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, changePassword } from "../../../slices/userSlice";
import { BASE_URL } from "../../../constants";

import ToastBox from "../../../components/Toast";

const GetProfile = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.users);
  const [preview, setPreview] = useState([]);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    console.log("Sending payload:", passwords);

    const res = await dispatch(changePassword({
      oldPassword: passwords.currentPassword,
      newPassword: passwords.newPassword
    }));

    if (res?.payload?.msg) {
      setMsg(res.payload.msg);
      dispatch(getProfile()); 
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (user?.profilePic) {
        setPreview([`${BASE_URL}/resources${user?.profilePic}`]);
      }
    }
  }, [user]);

  return (
    <div className="d-flex container justify-content-center py-2">
      {error && <ToastBox msg={error} />}
      {msg && <ToastBox msg={msg} variant="success" />}
      <div className="col-lg-6">
        <Card className="shadow p-3">
          <Card.Body>
            <div className="text-center h4 mb-3">User Profile</div>
            <div className="text-center mb-3">
              {preview.length > 0 && (
                <Image
                  src={preview[0]}
                  fluid
                  style={{
                    maxHeight: "150px",
                    maxWidth: "150px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <div className="text-center mb-3">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
            <hr />
            <Form onSubmit={handlePasswordChange}>
              <div className="text-center h5 mb-3">Change Password</div>
              <Form.Group className="mb-2">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <div className="text-center mt-3">
                <Button variant="warning" type="submit" className="w-100">
                  Change Password
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
  
};

export default GetProfile;
