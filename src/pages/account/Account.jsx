import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Account = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user);
  return (
    <div>
      {user && (
        <div className="profile">
          <h2 className="font-bold">My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name}</strong>
            </p>

            <p>
              <strong>Email - {user.email}</strong>
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="contained"
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Dashboard
              </Button>

              {user.role === "admin" && (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="common-btn"
                >
                  <MdDashboard />
                  Admin Dashboard
                </Button>
              )}

              <Button
                variant="contained"
                className="common-btn"
                style={{ background: "red" }}
              >
                <IoMdLogOut />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
