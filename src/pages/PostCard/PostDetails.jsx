import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lefticon from "../../assets/icon/arrow-left-1.svg";
import defaultImage from "../../assets/icon/user.svg";
import Succes from "../../assets/icon/succes-2.svg";
import Like from "../../assets/icon/like.svg";
import commet from "../../assets/icon/commet-2.svg";
import share from "../../assets/icon/share-2.svg";
import more from "../../assets/icon/more.svg";
import ComplaintModal from "../../components/ComplaintModal";
import Loading from "../../utils/Loading";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");
  const [complaint, setComplaint] = useState(false);

  useEffect(() => {
    axios
      .get("/data/postcard.json")
      .then((res) => {
        const found = res.data.find((p) => String(p.id) === id);
        if (found) {
          setPost(found);
          setStatus("ready");
        } else {
          setStatus("notfound");
        }
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <Loading/>;
  if (status === "notfound") return <p>Post tapılmadı</p>;
  if (status === "error") return <p>Xəta baş verdi</p>;

  const { author, title, text, images, tags, bestAnswer, commentsCount } = post;

  return (
    <div className="relative w-full max-w-[900px] mx-auto px-[16px] py-[16px] md:px-[24px] md:py-[24px]">
      {/* Yuxarı sağ: vaxt + more düyməsi */}
      <div className="absolute top-[16px] right-[16px] md:top-[24px] md:right-[24px] flex items-center gap-[8px] md:gap-[16px]">
        <p className="hidden sm:block text-[14px] md:text-[16px] text-[#8C8C8C] whitespace-nowrap">
          3 hours ago
        </p>
        <button
          type="button"
          onClick={() => setComplaint(true)}
          aria-label="Şikayət et"
          className="shrink-0"
        >
          <img src={more} alt="" />
        </button>
      </div>

      <div className="flex flex-col gap-[16px] md:gap-[24px]">
        {/* Author */}
        <div className="flex items-center gap-[8px] pr-[40px] md:pr-[160px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Geri"
            className="shrink-0"
          >
            <img src={lefticon} alt="" />
          </button>

          <img
            className="shrink-0 w-[44px] h-[44px] md:w-[60px] md:h-[60px] rounded-full object-cover bg-gray-200"
            src={author.avatar}
            alt={author.name}
          />

          <div className="flex flex-col min-w-0">
            <h3 className="text-[16px] md:text-[20px] font-medium text-black truncate">
              {author.name}
            </h3>
            <p className="text-[13px] md:text-[16px] text-gray-400 truncate">
              {author.title}
            </p>
          </div>

          <span className="hidden sm:inline-block ml-[8px] md:ml-[16px] px-[12px] md:px-[16px] py-[4px] text-[13px] md:text-[14px] text-blue-600 border border-blue-600 rounded-[6px] capitalize whitespace-nowrap">
            {author.role}
          </span>
        </div>

        {/* Mobilda role ayrıca göstərilir */}
        <span className="sm:hidden self-start px-[12px] py-[2px] text-[13px] text-blue-600 border border-blue-600 rounded-[6px] capitalize">
          {author.role}
        </span>

        {/* Title + text */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <h3 className="text-[20px] md:text-[28px] font-medium text-black break-words">
            {title}
          </h3>
          {text && (
            <p className="text-[16px] md:text-[28px] text-gray-500 break-words">
              {text}
            </p>
          )}
        </div>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-[8px] md:gap-[24px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-[12px] md:px-[16px] py-[4px] text-[13px] md:text-[14px] text-white bg-indigo-300 rounded-[6px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Image */}
        {images?.length > 0 && (
          <img
            className="w-full h-[200px] sm:h-[260px] md:h-[304px] object-cover rounded-[16px] md:rounded-[24px] border"
            src={images[0].url}
            alt={title}
          />
        )}

        {/* Best answer */}
        {bestAnswer && (
          <div className="w-full max-w-[661px] p-[12px] md:p-[16px] flex flex-col gap-[12px] bg-[#F7F9FF] border border-[#4468D5] rounded-[14px]">
            <div className="flex flex-wrap gap-[12px] md:gap-[24px] text-[16px] md:text-[18px] font-medium text-green-400">
              {bestAnswer.isPinned && (
                <span className="flex items-center gap-[12px]">
                  <img src={Succes} alt="" /> Pinned
                </span>
              )}
              {bestAnswer.isBestAnswer && <span>Best Answer</span>}
            </div>

            <div className="flex flex-wrap items-center gap-[8px]">
              <img
                className="shrink-0 w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full object-cover"
                src={bestAnswer.author.avatar}
                alt={bestAnswer.author.name}
              />
              <span className="text-[14px] font-medium">
                {bestAnswer.author.name}
              </span>
              <span className="px-[12px] py-[2px] text-[13px] text-blue-600 border border-blue-600 rounded-[6px] capitalize">
                {bestAnswer.author.role}
              </span>
              <span className="text-[13px] text-gray-500">2 hours ago</span>
            </div>

            <p className="text-[14px] text-gray-600 break-words">
              {bestAnswer.text}
            </p>

            <div className="flex gap-[16px] md:gap-[24px] text-[14px] text-gray-500">
              <span className="flex items-center gap-[8px]">
                <img className="w-[16px] h-[16px]" src={Like} alt="" />
                {bestAnswer.likesCount}
              </span>
              <span className="flex items-center gap-[8px]">
                <img src={commet} alt="" />
                {bestAnswer.commentsCount}
              </span>
              <span className="flex items-center gap-[8px]">
                <img src={share} alt="" />
                {bestAnswer.shareCount}
              </span>
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-[16px] md:text-[18px] font-medium">
            {commentsCount} Comments
          </h3>
          <div className="flex items-center gap-[8px]">
            <img
              className="shrink-0 w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full object-cover"
              src={defaultImage}
              alt=""
            />
            <input
              type="text"
              placeholder="Add a comment......."
              className="flex-1 min-w-0 px-[12px] md:px-[16px] py-[10px] text-[14px] border border-gray-300 rounded-[8px] outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {complaint && (
        <ComplaintModal complaint={complaint} setComplaint={setComplaint} />
      )}
    </div>
  );
}

export default PostDetails;