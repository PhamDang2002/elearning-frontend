import { useGetAllCoursesQuery } from "@services/rootApi";
import "./courses.css";
import CourseCard from "@components/coursecard/CourseCard";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const data = useGetAllCoursesQuery().data?.courses;
  useEffect(() => {
    if (data) {
      setCourses(data); // Cập nhật danh sách khóa học khi có dữ liệu
    }
  }, [data]);
  return (
    <div className="courses">
      <h2>Available Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => (
            <CourseCard
              key={e._id}
              course={e}
              courses={courses}
              setCourses={setCourses}
            />
          ))
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
