import Loading from "@components/Loading";
import {
  useAddLectureMutation,
  useDeleteLectureMutation,
  useGetDetailLectureQuery,
  useGetDetailLecturesQuery,
} from "@services/rootApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./lecture.css";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(true);
  const params = useParams();
  const [id, setId] = useState(null);
  const dataLectures = useGetDetailLecturesQuery(params.id);
  const dataLecture = useGetDetailLectureQuery(id)?.data?.lecture;
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.userInfo.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
  }
  const OnSubmit = (lectureId) => {
    setId(lectureId); // set the id when a lecture is selected
  };

  useEffect(() => {
    setLectures(dataLectures?.data?.lectures);
    setLoading(false);
    setLecture(dataLecture);
    setLecLoading(false);
  }, [dataLectures, dataLecture]);

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const [addLecture] = useAddLectureMutation();
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    // Create the FormData object
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    myForm.append("lectureId", params.id); // Use params.id from useParams()

    try {
      // Call addLecture mutation with params.id as part of the body
      await addLecture({ id: params.id, formData: myForm }); // Pass the formData and params.id

      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      setShow(false); // Close the form
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  const [deleteLectureApi] = useDeleteLectureMutation();
  const deleteHandler = async (lectureId) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        await deleteLectureApi(lectureId);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lecture-page">
            <div className="left">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture?.video ? (
                    <>
                      <video
                        src={`${import.meta.env.VITE_API_URL}/${lecture?.video}`}
                        width={"100%"}
                        controls
                        autoPlay
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                      ></video>
                      <h1>{lecture?.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1>Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="right">
              {user && user.role === "admin" && (
                <Button
                  variant="contained"
                  className="common-btn !mt-2"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "Add Lecture"}
                </Button>
              )}
              {show && (
                <div className="lecture-form">
                  <h2>Add Lecture</h2>
                  <form onSubmit={submitHandler}>
                    <label htmlFor="textt">Title</label>
                    <input
                      type="text"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="text">Description</label>
                    <input
                      type="text"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                      type="file"
                      placeholder="choose video"
                      onChange={changeVideoHandler}
                      required
                    />

                    {videoPrev && (
                      <video src={videoPrev} controls width={300} />
                    )}

                    <Button
                      disabled={btnLoading}
                      variant="contained"
                      type="submit"
                      className="common-btn"
                    >
                      {btnLoading ? "Uploading..." : "Upload"}
                    </Button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <>
                    <div
                      className={`lecture-number ${lecture?._id === e?._id && "active"}`}
                      onClick={() => OnSubmit(e?._id)}
                      key={e?._id}
                    >
                      {i + 1}. {e?.title}
                    </div>
                    {user && user.role === "admin" && (
                      <Button
                        variant="contained"
                        className="common-btn !mt-4 !font-bold !text-white"
                        style={{
                          backgroundColor: "red",
                        }}
                        onClick={() => deleteHandler(e?._id)}
                      >
                        Delete {e?.title}
                      </Button>
                    )}
                  </>
                ))
              ) : (
                <p>No Lectures Yet!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
