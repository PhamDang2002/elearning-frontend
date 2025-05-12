import { Button } from "@mui/material";
import Loading from "./Loading";

const DetailLecture = ({
  lecture,
  lecLoading,
  progressLec,
  addProgress,
  user,
  setShow,
  show,
  submitHandler,
  title,
  setTitle,
  description,
  setDescription,
  changeVideoHandler,
  videoPrev,
  btnLoading,
  lectures,
  OnSubmit,
  DoneAll,
  deleteHandler,
}) => {
  return (
    <div className="lecture-page container mx-auto">
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
                  onEnded={() => addProgress(lecture._id)}
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

              {videoPrev && <video src={videoPrev} controls width={300} />}

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
            <div key={e?._id}>
              <div
                className={`lecture-number ${lecture?._id === e?._id && "active"}`}
                onClick={() => OnSubmit(e?._id)}
              >
                {i + 1}. {e?.title}{" "}
                {progressLec &&
                  progressLec[0]?.completedLectures.includes(e?._id) && (
                    <span>
                      <DoneAll />
                    </span>
                  )}
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
            </div>
          ))
        ) : (
          <p>No Lectures Yet!</p>
        )}
      </div>
    </div>
  );
};
export default DetailLecture;
