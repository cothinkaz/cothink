import { useState } from "react";

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


const ThumbIcon = () => (
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
    <div className={isReply ? "ml-8 mt-4 sm:ml-12" : ""}>
      <div className="flex items-start gap-3">
        <Avatar size={isReply ? 32 : 36} alt={comment.author} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="leading-snug">
              <p className="text-[14px] font-medium text-[#171717]">{comment.author}</p>
              <p className="text-[12px] text-[#737373]">{comment.time}</p>
            </div>

            <button type="button" aria-label="Əlavə seçimlər" className="shrink-0">
              <DotsIcon />
            </button>
          </div>

          <p className="mt-1 text-[13px] leading-snug text-[#404040] sm:text-[14px]">
            {comment.text}
          </p>

          <div className="mt-2 flex items-center gap-5 text-[13px] text-[#2A4EBB]">
            <button type="button" className="flex items-center gap-1">
              <ReplyIcon /> Cavabla
            </button>
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              className="flex items-center gap-1"
            >
              <ThumbIcon /> {likes}
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

      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Şərhinizi yazın"
          className="h-[44px] min-w-0 flex-1 rounded-full border border-[#D9D9D9] px-5 text-[14px] outline-none"
        />

        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Göndər"
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#2A4EBB] disabled:opacity-50"
        >
          <SendIcon />
        </button>
      </div>

      {comments.length > 0 ? (
        <div className="mt-6 flex flex-col gap-6">
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

export default CommentsSection;