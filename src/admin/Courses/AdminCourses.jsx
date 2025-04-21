import Layout from "../Utils/Layout";

import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddCourseMutation, useGetAllCoursesQuery } from "@services/rootApi";
import { useState } from "react";
import { categories } from "@libs/constants";
import { Button } from "@mui/material";

const AdminCourses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user);
  const courses = useGetAllCoursesQuery()?.data?.courses;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [addCourse] = useAddCourseMutation();
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    setBtnLoading(true);
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);
    try {
      // Call addLecture mutation with params.id as part of the body
      await addCourse(myForm); // Pass the formData and params.id

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePrev("");

      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };
  if (user && user.role !== "admin") return navigate("/");
  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1 className="text-xl font-bold">All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
              <p>No Courses</p>
            )}
          </div>
        </div>
        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form action="" onSubmit={submitHandler}>
                <label htmlFor="text">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="text">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="text">Price</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="text">CreatedBy</label>
                <input
                  type="text"
                  required
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>

                <label htmlFor="text">Duration</label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />

                <input type="file" required onChange={changeImageHandler} />
                {imagePrev && (
                  <img src={imagePrev} alt="Course Preview" width={300} />
                )}
                <Button variant="contained" type="submit" disabled={btnLoading}>
                  {btnLoading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
