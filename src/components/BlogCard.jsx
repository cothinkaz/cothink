import { useState } from "react";
import { Link } from "react-router-dom";
import lookIcon from "../assets/look.svg";
import likeIcon from "../assets/like.svg";
import commentsIcon from "../assets/comments.svg";
import saveIcon from "../assets/save.svg";

const BookmarkIcon = () => (
  <img src={saveIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" />
);

const Avatar = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-[32px] w-[32px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-[44px] sm:w-[44px]">
        <svg viewBox="0 0 24 24" className="h-[28px] w-[28px] sm:h-[40px] sm:w-[40px]" fill="#8A8A8A">
          <circle cx="12" cy="8" r="4.2" />
          <path d="M3 24c0-5.2 4-8 9-8s9 2.8 9 8z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-[32px] w-[32px] shrink-0 rounded-full object-cover sm:h-[44px] sm:w-[44px]"
    />
  );
};

const BlogCard = ({ blog }) => {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
      {/* Şəkil + bookmark */}
      <div className="relative aspect-[2/1] shrink-0 bg-[#F0F2F8]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <button
          type="button"
          aria-label="Yadda saxla"
          className="absolute right-2 top-2 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-sm sm:h-[44px] sm:w-[44px]"
        >
          <BookmarkIcon />
        </button>
      </div>

      {/* Məzmun */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        {/* Müəllif */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Avatar src={blog.authorAvatar} alt={blog.author} />
          <div className="min-w-0 leading-snug">
            <p className="truncate text-[12px] font-medium text-[#171717] sm:text-[16px]">
              {blog.author}
            </p>
            <p className="text-[11px] text-[#737373] sm:text-[14px]">
              {blog.readTime} · {blog.date}
            </p>
          </div>
        </div>

<h6 className="mt-4 text-[15px] font-medium leading-snug text-[#171717] sm:mt-6 sm:text-[22px]">
  <Link to={`/library/blogs/${blog.id}`} className="after:absolute after:inset-0">
    {blog.title}
  </Link>
</h6>

        {/* Teqlər */}
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="flex-1 whitespace-nowrap rounded-full bg-[#E8EDFB] px-3 py-[5px] text-center text-[11px] text-[#2A4EBB] sm:px-4 sm:py-[6px] sm:text-[12px]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Statistika */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-[#404040] sm:gap-x-8 sm:pt-6">
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={lookIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.views}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={likeIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.likes}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={commentsIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.comments}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;