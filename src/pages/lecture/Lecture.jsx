import Loading from "@components/Loading";
import {
  useAddLectureMutation,
  useAddProgressMutation,
  useDeleteLectureMutation,
  useFetchProgressQuery,
  useGetDetailLectureQuery,
  useGetDetailLecturesQuery,
} from "@services/rootApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./lecture.css";
import { Button, LinearProgress } from "@mui/material";
import toast from "react-hot-toast";
import { Done, DoneAll } from "@mui/icons-material";
import DetailLecture from "@components/DetailLecture";

const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(true);
  const params = useParams();
  const [id, setId] = useState(null);
  const { data: dataLectures } = useGetDetailLecturesQuery(params.id);
  const dataLecture = useGetDetailLectureQuery(id)?.data?.lecture;

  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.userInfo.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progressLec, setProgressLec] = useState([]);
  const [progress] = useAddProgressMutation();
  const { data, refetch } = useFetchProgressQuery({ course: params.id });
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
  }
  const OnSubmit = (lectureId) => {
    setId(lectureId); // set the id when a lecture is selected
  };

  useEffect(() => {
    setLectures(dataLectures?.lectures);
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
      refetch();
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
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        await deleteLectureApi(id);
        refetch();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const addProgress = async (id) => {
    await progress({ course: params.id, lectureId: id });
    refetch();
  };
  const courseCount = dataLectures?.lectures?.length;
  useEffect(() => {
    setCompleted(data?.courseProgressPercentage);
    setCompletedLec(data?.completedLectures);
    setLectLength(data?.allLectures);
    setProgressLec(data?.progress);
  }, [
    data?.courseProgressPercentage,
    data?.completedLectures,
    data?.allLectures,
    data?.progress,
  ]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progress !mt-28">
            Lecture completed: {completedLec || 0} out of {courseCount || 0}
            <br />
            <LinearProgress
              variant="determinate"
              value={(completedLec / lectLength) * 100}
              color="secondary"
              sx={{ height: "8px" }}
            />
            <div className="mt-2">{Math.round(completed) || 0} %</div>
          </div>
          <DetailLecture
            lecture={lecture}
            lecLoading={lecLoading}
            progressLec={progressLec}
            addProgress={addProgress}
            user={user}
            submitHandler={submitHandler}
            title={title}
            Button={Button}
            DoneAll={DoneAll}
            Done={Done}
            lectures={lectures}
            show={show}
            videoPrev={videoPrev}
            btnLoading={btnLoading}
            OnSubmit={OnSubmit}
            changeVideoHandler={changeVideoHandler}
            deleteHandler={deleteHandler}
            setShow={setShow}
          />
        </>
      )}
    </>
  );
};

export default Lecture;
