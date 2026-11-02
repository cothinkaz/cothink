import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/blogData.js";
import { getAuthorInfo, getBlogDetails } from "../data/blogDetailsData.js";
import { parseViews } from "../utils/blogUtils";
import BlogCard from "../components/BlogCard";
import BlogListCard from "../components/BlogListCard";
import likeIcon from "../assets/like.svg";
import commentsIcon from "../assets/comments.svg";
import saveIcon from "../assets/save.svg";

/* Şəkil yoxdursa və ya yüklənmirsə boz siluet göstərir */
const Avatar = ({ src, alt = "", size = 40 }) => {
  const [failed, setFailed] = useState(false);
  const box = { width: size, height: size };

  if (!src || failed) {
    return (
      <div
        style={box}
        className="flex shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#D9D9D9]"
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: size * 0.9, height: size * 0.9 }}
          fill="#8A8A8A"
        >
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
      style={box}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full object-cover"
    />
  );
};

/* ================= Məqalə məzmunu (başlıq, cədvəl, kod, şəkil) ================= */
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard mövcud deyilsə heç nə etmə */
    }
  };

  return (
    <div className="mt-5 overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-[#F7F7F8]">
      <div className="flex items-center justify-between border-b border-[#E5E5E5] px-4 py-2 text-[12px] text-[#404040] sm:text-[13px]">
        <span className="flex items-center gap-2">
          <span aria-hidden="true">&lt;/&gt;</span>
          {language}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Kodu kopyala"
          className="flex items-center gap-1 text-[#737373]"
        >
          {copied ? (
            "Kopyalandı"
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h8" />
            </svg>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-4 text-[12px] leading-relaxed text-[#171717] sm:text-[14px]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};

const Figure = ({ src, caption }) => (
  <figure className="mt-6">
    {src ? (
      <img src={src} alt={caption} className="mx-auto max-h-[420px] max-w-full rounded-[12px] object-contain" />
    ) : (
      <div className="flex aspect-[16/7] items-center justify-center rounded-[12px] bg-[#F0F2F8] text-[12px] text-[#737373]">
        Şəkil əlavə olunmayıb
      </div>
    )}
    {caption && (
      <figcaption className="mt-2 text-center text-[12px] text-[#737373]">
        {caption}
      </figcaption>
    )}
  </figure>
);

const Table = ({ headers, rows }) => (
  <div className="mt-5 overflow-x-auto rounded-[12px] border border-[#E5E5E5]">
    <table className="w-full min-w-[480px] text-left text-[13px] sm:text-[15px]">
      <thead className="bg-[#F5F5F5] text-[#171717]">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E5E5E5] text-[#404040]">
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) => (
              <td key={i} className="px-4 py-3">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BlogContent = ({ blocks }) => (
  <div>
    {blocks.map((block, i) => {
      switch (block.type) {
        case "h2":
          return (
            <h2 key={i} className="mt-8 text-[18px] font-semibold text-[#171717] sm:text-[22px]">
              {block.text}
            </h2>
          );
        case "image":
          return <Figure key={i} src={block.src} caption={block.caption} />;
        case "table":
          return <Table key={i} headers={block.headers} rows={block.rows} />;
        case "code":
          return <CodeBlock key={i} language={block.language} code={block.code} />;
        case "note":
          return (
            <p key={i} className="mt-4 text-[13px] italic leading-relaxed text-[#737373] sm:text-[14px]">
              {block.text}
            </p>
          );
        case "p":
        default:
          return (
            <p key={i} className="mt-4 text-[14px] leading-relaxed text-[#404040] sm:text-[16px]">
              {block.text}
            </p>
          );
      }
    })}
  </div>
);

/* ================= Müəllif kartı ================= */
const AuthorCard = ({ name, avatar, bio, stats, following, onToggleFollow }) => (
  <section className="rounded-[16px] border border-[#D9D9D9] bg-white p-4 sm:rounded-[20px] sm:p-6">
    <div className="flex items-start gap-3 sm:gap-6">
      {/* Mobildə kiçik, sm və yuxarıda böyük avatar */}
      <div className="sm:hidden">
        <Avatar src={avatar} alt={name} size={48} />
      </div>
      <div className="hidden sm:block">
        <Avatar src={avatar} alt={name} size={72} />
      </div>

      <div className="min-w-0 flex-1">
        {/* Mobildə alt-alta, sm və yuxarıda yan-yana */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="break-words text-[16px] font-semibold text-[#171717] sm:text-[20px]">
              {name}
            </p>
            <p className="break-words text-[12px] text-[#737373] sm:text-[14px]">{bio}</p>
          </div>

          <button
            type="button"
            onClick={onToggleFollow}
            className="flex shrink-0 items-center gap-1 self-start text-[13px] text-[#2A4EBB] sm:text-[14px]"
          >
            {following ? "İzlənilir" : "Mövzuya izlə"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 sm:mt-4 sm:gap-x-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[15px] font-semibold text-[#171717] sm:text-[18px]">
                {s.value}
              </p>
              <p className="text-[11px] text-[#737373] sm:text-[12px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ================= Şərhlər ================= */
const SmallThumbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const ReplyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16v11H9l-5 4V5z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#737373">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
  </svg>
);

const countAll = (list) =>
  list.reduce((n, c) => n + 1 + countAll(c.replies ?? []), 0);

const CommentItem = ({ comment, isReply = false }) => {
  const [liked, setLiked] = useState(false);
  const likes = comment.likes + (liked ? 1 : 0);

  return (
    <div className={isReply ? "ml-6 mt-4 sm:ml-12" : ""}>
      <div className="flex items-start gap-2.5 sm:gap-3">
        <Avatar size={isReply ? 28 : 32} alt={comment.author} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 leading-snug">
              <p className="truncate text-[13px] font-medium text-[#171717] sm:text-[14px]">
                {comment.author}
              </p>
              <p className="text-[11px] text-[#737373] sm:text-[12px]">{comment.time}</p>
            </div>

            <button type="button" aria-label="Əlavə seçimlər" className="shrink-0">
              <DotsIcon />
            </button>
          </div>

          <p className="mt-1 break-words text-[13px] leading-snug text-[#404040] sm:text-[14px]">
            {comment.text}
          </p>

          <div className="mt-2 flex items-center gap-4 text-[12px] text-[#2A4EBB] sm:gap-5 sm:text-[13px]">
            <button type="button" className="flex items-center gap-1">
              <ReplyIcon /> Cavabla
            </button>
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              className="flex items-center gap-1"
            >
              <SmallThumbIcon /> {likes}
            </button>
          </div>
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );
};

const CommentsSection = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text) return;

    setComments((list) => [
      { id: Date.now(), author: "Siz", time: "İndicə", text, likes: 0, replies: [] },
      ...list,
    ]);
    setValue("");
  };

  return (
    <section>
      <h3 className="text-[18px] font-medium text-[#171717] sm:text-[22px]">
        Şərhlər ({countAll(comments)})
      </h3>

      <div className="mt-4 flex items-center gap-2 sm:gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Şərhinizi yazın"
          className="h-[40px] min-w-0 flex-1 rounded-full border border-[#D9D9D9] px-4 text-[14px] outline-none sm:h-[44px] sm:px-5"
        />

        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Göndər"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#2A4EBB] disabled:opacity-50 sm:h-[44px] sm:w-[44px]"
        >
          <SendIcon />
        </button>
      </div>

      {comments.length > 0 ? (
        <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:gap-6">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-[14px] text-[#737373]">Hələ şərh yoxdur. İlk şərhi siz yazın.</p>
      )}
    </section>
  );
};

const AUTHOR_STEP = 2;

/* ---------- Kiçik köməkçi komponentlər ---------- */
const ThumbIcon = ({ down = false }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={down ? { transform: "rotate(180deg)" } : undefined}
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SectionTitle = ({ children }) => (
  <h3 className="min-w-0 break-words text-[16px] font-medium text-[#171717] sm:text-[22px]">
    {children}
  </h3>
);

const StatsRow = ({ likes, comments, saves }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#404040] sm:gap-x-6 sm:text-[14px]">
    <span className="flex items-center gap-1.5 sm:gap-2">
      <img src={likeIcon} alt="" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" /> {likes}
    </span>
    <span className="flex items-center gap-1.5 sm:gap-2">
      <img src={commentsIcon} alt="" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" /> {comments}
    </span>
    <span className="flex items-center gap-1.5 sm:gap-2">
      <img src={saveIcon} alt="" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" /> {saves}
    </span>
  </div>
);

const FEEDBACK = [
  { key: "helpful", label: "Faydalı oldu", color: "#16A34A", icon: <ThumbIcon /> },
  { key: "neutral", label: "Orta", color: "#F59E0B", icon: <ClockIcon /> },
  { key: "notHelpful", label: "Faydalı olmadı", color: "#DC2626", icon: <ThumbIcon down /> },
];

/* ---------- Səhifənin məzmunu ---------- */
const BlogDetailsContent = ({ id }) => {
  const blog = blogs.find((b) => String(b.id) === id);

  const [vote, setVote] = useState(null);
  const [following, setFollowing] = useState(false);
  const [authorVisible, setAuthorVisible] = useState(AUTHOR_STEP);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const authorBlogs = useMemo(() => {
    if (!blog) return [];
    return blogs
      .filter((b) => b.author === blog.author && b.id !== blog.id)
      .sort((a, b) => parseViews(b.views) - parseViews(a.views));
  }, [blog]);

  const similar = useMemo(() => {
    if (!blog) return [];
    const others = blogs.filter((b) => b.id !== blog.id);
    const sameCategory = others.filter((b) => b.category === blog.category);
    const rest = others
      .filter((b) => b.category !== blog.category)
      .sort((a, b) => parseViews(b.views) - parseViews(a.views));
    return [...sameCategory, ...rest].slice(0, 3);
  }, [blog]);

  if (!blog) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-[20px] font-medium text-[#171717]">Bloq tapılmadı.</p>
        <Link to="/library/blogs" className="mt-4 inline-block text-[#2A4EBB]">
          Bloqlara qayıt
        </Link>
      </div>
    );
  }

  const details = getBlogDetails(blog);
  const author = getAuthorInfo(blog.author);

  const allAuthorBlogs = blogs.filter((b) => b.author === blog.author);
  const authorStats = [
    { value: allAuthorBlogs.length, label: "Bloq" },
    { value: author.followers, label: "İzləyici" },
    {
      value: allAuthorBlogs.reduce((sum, b) => sum + b.likes, 0),
      label: "Bəyənmə",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#737373] sm:text-[14px]">
        <span>Kitabxana</span>
        <ChevronRight />
        <Link to="/library/blogs" className="hover:text-[#2A4EBB]">
          Bloqlar
        </Link>
        <ChevronRight />
        <span className="min-w-0 max-w-full truncate text-[#2A4EBB]">{blog.title}</span>
      </nav>

      {/* Başlıq */}
      <h1 className="mt-4 break-words text-[22px] font-semibold leading-tight text-[#171717] sm:text-[36px]">
        {details.heading}
      </h1>

      {/* Müəllif sətri */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Avatar src={blog.authorAvatar} alt={blog.author} size={40} />
          <div className="min-w-0 leading-snug">
            <p className="truncate text-[14px] font-medium text-[#171717] sm:text-[16px]">
              {blog.author}
            </p>
            <p className="text-[11px] text-[#737373] sm:text-[14px]">
              {blog.readTime} · {blog.date} · {blog.views} oxunma
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFollowing((v) => !v)}
          className="shrink-0 rounded-full border border-[#2A4EBB] px-3 py-1.5 text-[12px] text-[#2A4EBB] sm:px-4 sm:py-2 sm:text-[14px]"
        >
          {following ? "İzlənilir" : "Mövzuya izlə"}
        </button>
      </div>

      <div className="mt-4">
        <StatsRow likes={blog.likes} comments={blog.comments} saves={details.saves} />
      </div>

      {/* Əsas şəkil */}
      <div className="mt-6 aspect-[2/1] overflow-hidden rounded-[16px] bg-[#F0F2F8] sm:rounded-[20px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      {/* Məqalə */}
      <div className="mt-6">
        <BlogContent blocks={details.content} />
      </div>

      {/* Teqlər */}
      <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="whitespace-nowrap rounded-full bg-[#E8EDFB] px-3 py-[5px] text-[11px] text-[#2A4EBB] sm:px-4 sm:py-[6px] sm:text-[12px]"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Faydalı oldumu? */}
      <section className="mt-8">
        <p className="text-[14px] font-medium text-[#171717] sm:text-[16px]">
          Bu yazı sizin üçün faydalı oldumu?
        </p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {FEEDBACK.map(({ key, label, color, icon }) => {
              const selected = vote === key;
              const count = details.feedback[key] + (selected ? 1 : 0);

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setVote(selected ? null : key)}
                  style={{
                    borderColor: color,
                    color,
                    backgroundColor: selected ? `${color}1A` : "#FFFFFF",
                  }}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] sm:gap-2 sm:px-4 sm:py-2 sm:text-[14px]"
                >
                  {icon}
                  {label}
                  <span className="ml-0.5 sm:ml-1">{count}</span>
                </button>
              );
            })}
          </div>

          <StatsRow likes={blog.likes} comments={blog.comments} saves={details.saves} />
        </div>
      </section>

      {/* Müəllif kartı */}
      <div className="mt-8">
        <AuthorCard
          name={blog.author}
          avatar={blog.authorAvatar}
          bio={author.bio}
          stats={authorStats}
          following={following}
          onToggleFollow={() => setFollowing((v) => !v)}
        />
      </div>

      {/* Müəllifin digər bloqları */}
      {authorBlogs.length > 0 && (
        <section className="mt-8 sm:mt-10">
          <SectionTitle>{blog.author}dan daha çox bloq</SectionTitle>

          <div className="mt-4 divide-y divide-[#E5E5E5] overflow-hidden rounded-[16px] border border-[#D9D9D9] bg-white sm:mt-5 sm:rounded-[20px]">
            {authorBlogs.slice(0, authorVisible).map((b) => (
              <BlogListCard key={b.id} blog={b} />
            ))}
          </div>

          {authorVisible < authorBlogs.length && (
            <button
              type="button"
              onClick={() => setAuthorVisible((n) => n + AUTHOR_STEP)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#C7D3FB] bg-white py-3 text-[13px] text-[#404040] sm:mt-5 sm:text-[14px]"
            >
              Daha çoxuna bax
              <ChevronRight />
            </button>
          )}
        </section>
      )}

      {/* Oxşar bloqlar */}
      {similar.length > 0 && (
        <section className="mt-8 sm:mt-10">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle>Oxşar bloqlar</SectionTitle>
            <Link
              to="/library/blogs"
              className="flex shrink-0 items-center gap-1.5 text-[13px] text-[#2A4EBB] sm:gap-2 sm:text-[14px]"
            >
              Hamısına bax
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </section>
      )}

      {/* Şərhlər */}
      <div className="mt-8 sm:mt-10">
        <CommentsSection initialComments={details.comments} />
      </div>
    </div>
  );
};

/* key={id}: başqa bloqa keçəndə state-lər sıfırlansın */
const BlogDetails = () => {
  const { id } = useParams();
  return <BlogDetailsContent key={id} id={id} />;
};

export default BlogDetails;