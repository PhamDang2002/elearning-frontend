import { useNavigate, useParams } from "react-router-dom";
import "./coursedescription.css";

import { useFetchCourseQuery } from "@services/rootApi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { currencyFormatter } from "@libs/utils";
import { useEffect } from "react";
import { getCourse } from "@redux/slices/authSlice";

const CourseDescription = () => {
  const params = useParams();

  const user = useSelector((store) => store.auth.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useFetchCourseQuery(params.id)?.data?.course;
  useEffect(() => {
    // Dispatch với đúng kiểu dữ liệu
    dispatch(getCourse({ getCourse: params.id }));
  }, [params, dispatch]);

  const checkoutHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/create-payment-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course._id,
            amount: course.price, // Course price
            description: course.title, // Course description
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = data.checkoutUrl; // Redirect to PayOS checkout page
      } else {
        console.error("Error creating payment link:", response.statusText);
      }
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  };

  return (
    <>
      {course && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={`${import.meta.env.VITE_API_URL}/${course.image}`}
              alt=""
              className="course-image"
            />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>Instructor: {course.createdBy}</p>
              <p>Duration: {course.duration} weeks</p>
            </div>
          </div>

          <p>{course.description}</p>

          <p>
            Les get started with course At{" "}
            {currencyFormatter(course.price, "VND")}
          </p>

          {user && user.subscription.includes(course._id) ? (
            <Button
              variant="contained"
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn !mt-6"
            >
              Study
            </Button>
          ) : (
            <Button
              onClick={checkoutHandler}
              variant="contained"
              className="common-btn !mt-6"
            >
              Buy Now
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;
