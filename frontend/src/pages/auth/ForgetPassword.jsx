import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { URLS } from "../../constants";
import instance from "../../utils/axios";
import errorParser from "../../utils/errorParser";
import AlertBox from "../../components/AlertBox";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      setMsg("");
      setErr("");
      
      const { data } = await instance.post(URLS.GENERATE_FORGET_PASSWORD, { email });
      setMsg(data.msg);
      
      setTimeout(() => {
        navigate("/auth/verify-forget-password", { state: { email } });
      }, 1000);
    } catch (e) {
      const errMsg = e?.response?.data?.msg || "Something went wrong!";
      setErr(errorParser(errMsg));
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
            <p className="text-center m-2 h4">Forgot your password?</p>
            <small className="text-center text-secondary">
              Please enter the email address associated with your account and
              we&apos;ll email you an OTP code to reset your password.
            </small>
            <div className="text-center m-2 text-secondary">
              {err && <AlertBox label={err} />}
              {msg && <AlertBox variant="success" label={msg} />}
            </div>
            <div className="card-body">
              <form className="mx-5 mb-5" onSubmit={handleSendOTP}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary py-2" type="submit" disabled={isDisabled}>
                    {isDisabled ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                Already have an account?&nbsp;
                <Link
                  to="/auth/login"
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
