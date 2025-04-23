import "./users.css";
import { useNavigate } from "react-router-dom";

import Layout from "../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchUsersQuery, useUpdateRoleMutation } from "@services/rootApi";
import { Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";

const AdminUsers = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user).data;

  const [users, setUsers] = useState([]);
  const data = useFetchUsersQuery();
  const dispatch = useDispatch();
  const [updateRoleApi] = useUpdateRoleMutation();
  useEffect(() => {
    setUsers(data?.data?.users);
  }, [data.data]);
  if (user && user.mainrole !== "superadmin") return navigate("/");
  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update role?")) {
      try {
        await updateRoleApi(id);
        dispatch(openSnackbar({ type: "success", message: "Role updated" }));
      } catch (error) {
        dispatch(
          openSnackbar({ type: "error", message: error?.data?.message }),
        );
      }
    }
  };
  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border={"black"}>
          <thead>
            <tr>
              <td>#</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>update-role</td>
            </tr>
          </thead>
          {users &&
            users.map((user, index) => (
              <tbody key={user._id}>
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={() => updateRole(user._id)}
                      className="common-btn"
                    >
                      update role
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
