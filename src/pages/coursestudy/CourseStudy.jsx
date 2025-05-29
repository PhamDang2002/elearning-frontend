import { useSelector } from "react-redux";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetDetailCourseQuery } from "@services/rootApi";

const CourseStudy = () => {
  const params = useParams();

  const user = useSelector((state) => state.auth.userInfo.user);
  const navigate = useNavigate();
  const course = useGetDetailCourseQuery(params.id)?.data?.course;

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  return (
    <>
      {course && (
        <div className="course-study-page mt-20 !h-[100vh]">
          <img
            src={`${import.meta.env.VITE_API_URL}/${course.image}`}
            alt=""
            width={350}
          />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          <Link to={`/lectures/${course._id}`}>
            <h2>Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
