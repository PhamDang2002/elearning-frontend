import CourseCard from "@components/coursecard/CourseCard";
import { testimonialsData } from "@libs/constants";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useGetAllCoursesQuery } from "@services/rootApi";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const courses = useGetAllCoursesQuery().data?.courses;
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    if (!courses || courses?.length <= visibleCount) return;
    const interval = setInterval(() => {
      setStartIdx((prev) =>
        prev + visibleCount < courses?.length ? prev + 1 : 0,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [courses, visibleCount]);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!courses) return;
    setStartIdx((prev) =>
      prev + visibleCount < courses?.length ? prev + 1 : 0,
    );
  };

  return (
    <section className="py-[40px] text-center">
      <div className="mb-[30px] flex flex-col items-center justify-center gap-4">
        <video
          width="300"
          className="rounded-xl shadow-md md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]"
          controls
          autoPlay
          loop
          muted
          data-testid="testimonials-video"
        >
          <source src="/shortvideo.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
        <h2 className="text-[32px] font-bold text-[#8a4baf]">
          Featured courses?
        </h2>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handlePrev}
            disabled={startIdx === 0}
            className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            <ChevronLeft />
          </button>
          <div className="relative mx-auto w-[960px] overflow-hidden">
            <div
              className="course-container flex transition-transform duration-500"
              style={{
                transform: `translateX(-${startIdx * 320}px)`, // 320 là width + gap của 1 card, chỉnh lại cho đúng
                width: courses ? `${courses?.length * 320}px` : "0px",
              }}
            >
              {courses && courses?.length > 0 ? (
                courses.map((e) => (
                  <div key={e._id} style={{ minWidth: 270, maxWidth: 270 }}>
                    <CourseCard course={e} courses={courses} />
                  </div>
                ))
              ) : (
                <p>No Courses Yet!</p>
              )}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={!courses || courses?.length <= visibleCount}
            className={`${startIdx + visibleCount < courses?.length ? "cursor-pointer" : "cursor-not-allowed opacity-50"} rounded bg-gray-200 px-2 py-1 hover:bg-gray-300`}
          >
            <ChevronRight />
          </button>
        </div>
        <h2 className="text-[32px] font-bold text-[#8a4baf]">
          What our students say?
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {testimonialsData.map(({ id, name, position, message, image }) => (
          <div
            className="flex w-[300px] flex-col items-center rounded-[10px] bg-white p-[20px] text-left shadow-sm"
            key={id}
          >
            <div className="mb-6 h-20 w-20 overflow-hidden rounded-full object-cover">
              <img src={image} alt={name} />
            </div>
            <p className="mb-3 text-lg text-[#333]">{message}</p>
            <div className="text-center">
              <h3 className="text-4 mb-[5px] font-bold text-[#8a4baf]">
                {name}
              </h3>
              <p className="text-sm text-[#666]">{position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Testimonials;
