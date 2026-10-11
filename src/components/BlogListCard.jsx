import { useState } from "react";
import { Link } from "react-router-dom";
import lookIcon from "../assets/look.svg";
import likeIcon from "../assets/like.svg";
import commentsIcon from "../assets/comments.svg";
import saveIcon from "../assets/save.svg";

const Avatar = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-[28px] w-[28px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-[40px] sm:w-[40px]">
        <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] sm:h-[34px] sm:w-[34px]" fill="#8A8A8A">
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
      className="h-[28px] w-[28px] shrink-0 rounded-full object-cover sm:h-[40px] sm:w-[40px]"
    />
  );
};

const DotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#404040">
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="12" cy="19" r="1.8" />
  </svg>
);

/*
  "Bütün bloqlar" siyahısının bir sətri.
  Öz border-i yoxdur: kartları Blogs.jsx-dəki ümumi çərçivə və
  divide-y xətləri birləşdirir.
*/
const BlogListCard = ({ blog }) => {
  return (
    <article className="relative flex gap-3 p-3 sm:gap-5 sm:p-5">
      {/* Şəkil */}
      <div className="aspect-[2/1] w-[150px] shrink-0 self-center overflow-hidden rounded-[10px] bg-[#F0F2F8] sm:w-[300px] sm:rounded-[14px] lg:w-[360px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      {/* Məzmun */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Müəllif + menyu */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Avatar src={blog.authorAvatar} alt={blog.author} />
            <div className="min-w-0 leading-snug">
              <p className="truncate text-[12px] font-medium text-[#171717] sm:text-[16px]">
                {blog.author}
              </p>
              <p className="truncate text-[10px] text-[#737373] sm:text-[14px]">
                {blog.readTime} · {blog.date}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Əlavə seçimlər"
            className="relative z-10 shrink-0"
          >
            <DotsIcon />
          </button>
        </div>

        {/* Başlıq */}
        <h6 className="mt-2 text-[14px] font-semibold leading-snug text-[#171717] sm:mt-3 sm:text-[20px]">
          <Link to={`/blogs/${blog.id}`} className="after:absolute after:inset-0">
            {blog.title}
          </Link>
        </h6>

        {/* Təsvir */}
        <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-[#404040] sm:mt-2 sm:text-[14px]">
          {blog.description}
        </p>

        {/* Teqlər */}
        <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 sm:gap-3">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap rounded-full bg-[#E8EDFB] px-3 py-[4px] text-[10px] text-[#2A4EBB] sm:px-4 sm:py-[6px] sm:text-[12px]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Statistika + bookmark (həmişə aşağıda) */}
        <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#404040] sm:gap-x-8">
            <span className="flex items-center gap-1 text-[10px] sm:gap-2 sm:text-[14px]">
              <img src={lookIcon} alt="" className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px]" /> {blog.views}
            </span>
            <span className="flex items-center gap-1 text-[10px] sm:gap-2 sm:text-[14px]">
              <img src={likeIcon} alt="" className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px]" /> {blog.likes}
            </span>
            <span className="flex items-center gap-1 text-[10px] sm:gap-2 sm:text-[14px]">
              <img src={commentsIcon} alt="" className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px]" /> {blog.comments}
            </span>
          </div>

          <button type="button" aria-label="Yadda saxla" className="relative z-10 shrink-0">
            <img src={saveIcon} alt="" className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogListCard;