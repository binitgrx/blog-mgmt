import { useState } from "react";
import { Link, useNavigate } from "react-router";

import AlertBox from "../../components/AlertBox";
import CustomButton from "../../components/CustomButton";

import errorParser from "../../utils/errorParser";
import instance from "../../utils/axios";
import { URLS } from "../../constants";
import { setItem, setToken } from "../../utils/session";

const Login = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsDisabled(true);
      setErr("");
      const { data } = await instance.post(URLS.LOGIN, payload);
      setToken(data.data.accessToken);
      setItem(
        "currentUser",
        JSON.stringify({ name: data?.data?.name, email: data?.data?.email })
      );
      setMsg(data?.msg);
      setTimeout(() => {
        setMsg("");
        navigate("/admin");
      }, 2000);
    } catch (e) {
      const err = e?.response?.data?.msg || "Something went wrong!";
      setErr(errorParser(err));
    } finally {
      setPayload({ email: "", password: "" });
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <div className="card mw-25 shadow p-3 mb-5 rounded">
        <div className="row d-flex justify-content-center align-items-center">
          <img
            src="logo.png"
            className="mt-4 rounded"
            style={{ maxWidth: "200px" }}
          />
          <p className="text-center m-2 text-secondary">
            Sign in to your account
          </p>
          <div className="text-center m-2 text-secondary">
            {err && <AlertBox label={err} />}
            {msg && <AlertBox variant="success" label={msg} />}
          </div>
          <div className="card-body">
            <form className="mx-5 mb-5">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label">Keep me logged in</label>
                </div>
                <div className="mb-3 form-check">
                  <Link
                    to="/auth/forget-password"
                    className="link-offset-2 link-underline link-underline-opacity-0"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="d-grid">
                <CustomButton
                  variant="primary"
                  label="Submit"
                  loading={isLoading}
                  disabled={isDisabled}
                  onClick={() => handleSubmit()}
                />
              </div>
            </form>
            <div className="d-flex justify-content-center">
              Don&apos;t have an account?&nbsp;
              <Link
                to="/auth/register"
                className="link-offset-2 link-underline link-underline-opacity-0"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;