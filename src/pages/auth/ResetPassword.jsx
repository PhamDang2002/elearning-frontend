import { useEffect, useState } from "react";
import "./auth.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useResetPasswordMutation } from "@services/rootApi";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { Button } from "@mui/material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [resetPassword, { error }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const { data } = await resetPassword({ password, token: params.token }); // ✅ đúng

    dispatch(openSnackbar({ type: "success", message: data.message }));
    navigate("/login");
    setBtnLoading(false);
  };
  useEffect(() => {
    if (error) {
      setBtnLoading(false);
      dispatch(openSnackbar({ type: "error", message: error.data.message }));
    }
  }, [error, dispatch]);
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={btnLoading}
            className="common-btn"
          >
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
