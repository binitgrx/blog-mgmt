import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Form } from "react-bootstrap";

import { instance } from "../../utils/axios";
import { URLS } from "../../constants";
import errorParser from "../../utils/errorParser";

import AlertBox from "../../components/AlertBox";

const Register = () => {
  const navigate = useNavigate();
  const registerRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      setMsg("");
      setErr("");
      const rawForm = registerRef.current;
      const formData = new FormData(rawForm);
      const { data } = await instance.post(URLS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(data.msg);
      setTimeout(() => {
        navigate("/auth/email-verify", {
          state: { email: formData.get("email") },
        });
      }, 1000);
    } catch (e) {
      const err = e?.response?.data?.msg || "Something went wrong!";
      setErr(errorParser(err));
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div
        className="container-fluid d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <div className="card mw-25 shadow p-3 mb-5 rounded">
          <div className="row d-flex justify-content-center align-items-center">
            <img
              src="logo.png"
              className="mt-4 rounded"
              style={{ maxWidth: "250px" }}
            />
            <p className="text-center m-2 text-secondary">Sign up with us!</p>
            <div className="text-center m-2 text-secondary">
              {err && <AlertBox label={err} />}
              {msg && <AlertBox variant="success" label={msg} />}
            </div>
            <div className="card-body">
              <Form ref={registerRef} onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Your Picture</Form.Label>
                  <Form.Control type="file" name="image" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter your full name"
                    name="name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isDisabled}>
                    {isDisabled ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
              <div className="d-flex justify-content-center">
                Already have an account?&nbsp;
                <Link
                  to="/auth/login"
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
