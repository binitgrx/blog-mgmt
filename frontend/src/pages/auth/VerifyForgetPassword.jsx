import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { URLS } from "../../constants";
import instance from "../../utils/axios";
import errorParser from "../../utils/errorParser";

import AlertBox from "../../components/AlertBox";

const VerifyForgetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [payload, setPayload] = useState({
    email: state?.email || "",
    token: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      setMsg("");
      setErr("");
      const { data } = await instance.post(URLS.VERIFY_FORGET_PASSWORD, payload);
      setMsg(data.msg);
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (e) {
      const err = e?.response?.data?.msg || "Something went wrong!";
      setErr(errorParser(err));
    } finally {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (!state?.email) {
      navigate("/auth/login");
    }
  }, [state?.email, navigate]);

  return (
    <>
      <div className="container-fluid d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#f7fafc" }}>
        <div className="card mw-25 shadow p-2 mb-5 rounded">
          <div className="row d-flex justify-content-center align-items-center">
            <img src="/auth/logo.png" className="mt-4 rounded" style={{ maxWidth: "250px" }} />
            <p className="text-center m-2 h4">Please check your email!</p>
            <small className="text-center text-secondary">
              We&apos;ve emailed a 6-digit confirmation code. Please enter the
              code in the box below to verify your email and reset your password.
            </small>
            <div className="text-center m-2 text-secondary">
              {err && <AlertBox label={err} />}
              {msg && <AlertBox variant="success" label={msg} />}
            </div>
            <div className="card-body">
              <form className="mx-5 mb-5" onSubmit={handleVerify}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={payload.email} disabled required />
                </div>
                <div className="mb-3">
                  <label className="form-label">OTP</label>
                  <input className="form-control" onChange={(e) => setPayload((prev) => ({ ...prev, token: e.target.value }))} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))} required />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary py-2" type="submit" disabled={isDisabled}>
                    {isDisabled ? "Verifying..." : "Change Password"}
                  </button>
                </div>
              </form>
              <p className="text-center mb-3">
                Don&apos;t have a code?&nbsp;
                <a role="button" onClick={() => {}} className="link-offset-2 link-underline link-underline-opacity-0">
                  Resend
                </a>
              </p>
              <div className="d-flex justify-content-center">
                Return to&nbsp;
                <Link to="/auth/login" className="link-offset-2 link-underline link-underline-opacity-0">
                  sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyForgetPassword;