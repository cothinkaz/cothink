import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsChatRightText } from "react-icons/bs";
import { FaBookmark, FaRegBookmark, FaRegComments, FaRegFile } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { ratingImage, durationImage, eyeImage, profileImage, playImage } from "../assets/assets";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import Comments from "../components/Comments";
import courseComments from "../data/courseComments";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/data/courses.json").then((res) => {
      const foundCourse = res.data.find((c) => String(c.id) === String(id));
      setCourse(foundCourse);
    });
  }, [id]);

  if (!course) {
    return <div>Kurs tapılmadı</div>;
  }

  const filteredComments = courseComments.filter(
    (item) => String(item.course_id) === String(id)
  );
  const handleComment = () => {
    setOpenCommentForm(!openCommentForm);
  }

  const getEmbedUrl = (url) => {
    const videoUrl = url?.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoUrl}`;
  };

  const handleNext = () => {
    if (currentIndex < course.lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleSendComment = () => {
    if (comment.trim() === "") {
      setError("Şərh boş ola bilməz");
      return;
    }
    setError("");
  }

  const courseTabs = [
    {
      key: "summary",
      label: "İcmal",
      content:
        "Bu dərsdə Python proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
    {
      key: "resources",
      label: "Əlavə materiallar",
      content:
        "Python proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
    {
      key: "notes",
      label: "Qeydlər",
      content:
        "Bu proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        <div className="col-span-7">
          <div className="flex justify-center relative flex-col items-center">
            <iframe
              src={course && getEmbedUrl(course?.lessons[currentIndex]?.video_link)}
              className="md:h-[64vh] h-[40vh] w-full object-cover rounded-md"
              controls={true}
            />
          </div>

          <div className="flex justify-between mt-3">
            <button
              className="px-5 py-2 border border-gray-200 bg-white rounded-full"
              onClick={handlePrev}
            >
              Əvvəlki
            </button>
            <button
              className="px-5 py-2 bg-indigo-400 text-white rounded-full"
              onClick={handleNext}
            >
              növbəti
            </button>
          </div>
{
  openCommentForm && (
    <div className="mt-4 fixed flex inset-0 items-center w-full bg-black/50 bg-opacity-500 p-4 shadow-md z-50">
<div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
<button className="absolute top-2 right-5 text-gray-500 hover-text-gray-700" onClick={()=>setOpenCommentForm(false)}>
&#x2715;
</button>
<textarea
  className="p-2 border border-gray-300 rounded-md"
  placeholder="Şərhinizi yazın..."  > </textarea>
  <button onClick={handleSendComment} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
    Şərh göndər
  </button>
</div>

    </div>
  )
}
          <div className="mt-4 mb-4 flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 text-xs font-medium">
            <div className="flex h-full w-1/2 items-center justify-center overflow-hidden bg-indigo-600 text-white" />
          </div>

          <div className="flex justify-between gap-5">
            <h4 className="font-semibold text-xl">{course.lessons[0].lesson_title}</h4>
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                <img src={durationImage} alt="duration" />
                {course.duration}
              </div>
              <div className="flex gap-3">
                <img src={playImage} alt="play" />
                Video dərs
              </div>
              <div className="flex gap-3">
                <img src={eyeImage} alt="views" />
                2.3k baxis
              </div>
            </div>
          </div>
       <div className="flex gap-4 mt-5 mb-5 items-center">
            <img src={profileImage} className="" alt="profile" />
            <div className="flex-col gap-2">
              <h4 className="font-bold text-2xl">{course.author}</h4>
              <p className="text-gray-400">{course.authorPosition}</p>
            </div>
          </div>
          <div className="nav-tabs mt-5 mb-5">
            <div className="flex">
              {courseTabs.map((tab) => (
                <button
                  className={`w-full px-5 py-2 font-semibold border-b ${
                    activeTab === tab.key
                      ? "text-indigo-600 border-b-indigo-600"
                      : "text-gray-600 border-b-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  key={tab.key}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-white p-5">
              <p className="text-gray-600 leading-7">
                {courseTabs.find((tab) => tab.key === activeTab)?.content}
              </p>
            </div>
          </div>



          <form className="mt-5 mb-5" onSubmit={(e) => e.preventDefault()}ss>
            {error && (
              <p className="text-center text-red-600 bg-red-50 rounded-md p-2 font-bold text-lg mb-3">
                {error}
              </p>
            )}
            <h4 className="mt-5 font-bold text-lg">Rəylər</h4>
            <div className="flex justify-between">
              <img src={ratingImage} alt="rating" />
              <button className="border border-indigo-600 text-indigo-600 rounded-full px-4 py-2" onClick={()=>setOpenCommentForm(true)}>
                Şərhinizi yazın
              </button>
            </div>
          </form>

          {filteredComments.length > 0 && (
            <>
              {filteredComments.map((item) => (
                <Comments key={item.id} courseId={id} />
              ))}
            </>
          )}
        </div>

        <div className="col-span-5">
          {open && (
            <div className="bg-gray-100 shadow-md rounded-md px-5 py-2">
              {course?.lessons && course?.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => (
                  <div
                    key={`${lesson.lesson_title}-${index}`}
                    className="w-full mt-5 mb-5 bg-white rounded-md px-5 py-2"
                  >
                    <div className="cursor-pointer">
                      <div className="flex w-full justify-between">
                        <div className="text-gray-500 font-semibold">{lesson.lesson_title}</div>
                        <IoIosArrowDown fontSize={24} className="text-gray-400" />
                      </div>
                      <div className="text-gray-400">3 dəq 45 san</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-bold col-span-4 text-center text-xl">Dərs tapılmadı</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
