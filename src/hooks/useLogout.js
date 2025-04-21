import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutAction());
    navigate("/login", { replace: true });
  };

  return { logOut };
};
