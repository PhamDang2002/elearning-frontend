import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";

import "./dashboard.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchStatsQuery } from "@services/rootApi";

const AdminDashbord = () => {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user);
  const data = useFetchStatsQuery();
  console.log(data);
  useEffect(() => {
    setStats(data?.data?.stats);
  }, [data.data]);
  if (user && user.role !== "admin") return navigate("/");
  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="box">
            <p>Total Courses</p>
            <p>{stats?.totalCourses}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats?.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Users</p>
            <p>{stats?.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
