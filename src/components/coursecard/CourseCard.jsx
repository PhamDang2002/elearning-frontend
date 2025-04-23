import "./courseCard.css";
import { server } from "../../main";
import { Button } from "@mui/material";
import { currencyFormatter } from "@libs/utils";
import {
  useDeleteCourseMutation,
  useGetAuthUserQuery,
} from "@services/rootApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";

const CourseCard = ({ course, courses, setCourses }) => {
  // Thêm courses và setCourses
  const activationToken = useSelector((state) => state.auth.token);
  const data = useGetAuthUserQuery(activationToken).data?.user;
  const navigate = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const dispatch = useDispatch();

  // Hàm xử lý xóa và cập nhật lại danh sách courses
  const deleteHandler = async () => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        // Gọi API để xóa khóa học
        await deleteCourse(course._id).unwrap();

        // Cập nhật lại danh sách khóa học sau khi xóa (loại bỏ khóa học đã xóa)
        setCourses(courses.filter((item) => item._id !== course._id));
        dispatch(openSnackbar({ type: "success", message: "Course deleted" }));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="course-card">
      <img
        src={`${import.meta.env.VITE_API_URL}/${course.image}`}
        alt=""
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>Instructor- {course.createdBy}</p>
      <p>Duration- {course.duration} weeks</p>
      <p>Price- {currencyFormatter(course.price, "VND")}</p>
      {data ? (
        <>
          {data && data.role !== "admin" ? (
            <>
              {data.subscription.includes(course._id) ? (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          className="common-btn"
        >
          Get Started
        </Button>
      )}
      {data && data.role === "admin" && (
        <Button
          variant="contained"
          className="common-btn !ml-2 !bg-red-500"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default CourseCard;
