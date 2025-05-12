import { useLogout } from "@hooks/useLogout";
import { useUserInfo } from "@hooks/useUserInfo";
import { Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ response }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useUserInfo();

  const { logOut } = useLogout();
  const navigate = useNavigate();
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={() => navigate(`/account`)}>Profile</MenuItem>
      <MenuItem onClick={() => logOut()}>Logout</MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (event) => {
    setAnchorEl(event.target);
  };

  return (
    <div>
      <AppBar color="white" position="static" className="py-4">
        <Toolbar className="container mx-auto !min-h-fit justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/weconnect-logo.png" className="h-9 w-9" />
            </Link>
          </div>
          <div className="flex">
            <div className="flex items-center gap-2">
              <IconButton size="small">
                <Link to="/courses">Courses</Link>
              </IconButton>
              <IconButton size="small">
                <Link to="/about">About</Link>
              </IconButton>
            </div>

            {response?.data?.user?._id ? (
              <div>
                <IconButton size="medium" onClick={handleUserProfileClick}>
                  <Avatar className="!bg-primary-main">
                    {userInfo?.name?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </div>
            ) : (
              <IconButton size="small">
                <Link to="/login">Login</Link>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
export default Header;
