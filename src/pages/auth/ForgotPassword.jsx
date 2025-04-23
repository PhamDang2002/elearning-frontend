import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";

import { useChangePasswordMutation } from "@services/rootApi";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { Button } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await changePassword({ email });

      dispatch(openSnackbar({ type: "success", message: data.message }));
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      dispatch(openSnackbar({ type: "error", message: error.data.message }));
      setBtnLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            disabled={btnLoading}
            variant="contained"
            className="common-btn"
            type="submit"
          >
            {btnLoading ? "Please Wait..." : "Forgot Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
