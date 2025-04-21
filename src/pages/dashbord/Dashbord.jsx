import "./dashbord.css";

import CourseCard from "../../components/coursecard/CourseCard";
import { useGetMyCoursesQuery } from "@services/rootApi";

const Dashbord = () => {
  const mycourse = useGetMyCoursesQuery()?.data?.courses;
  console.log(mycourse);
  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
