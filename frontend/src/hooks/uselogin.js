import { useState } from "react";
import { useNavigate } from "react-router";
import errorParser from "../utils/errorParser";
import { instance } from "../utils/axios";
import { URLS } from "../constants";
import { setItem, setToken } from "../utils/session";

export const useLogin = ({ setPayload }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async ({ payload }) => {
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
  return { isDisabled, isLoading, msg, err, handleSubmit };
};
