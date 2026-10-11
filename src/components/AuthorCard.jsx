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


const AuthorCard = ({ name, avatar, bio, stats, following, onToggleFollow }) => (
  <section className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 sm:p-6">
    <div className="flex items-start gap-4 sm:gap-6">
      <Avatar src={avatar} alt={name} size={72} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[18px] font-semibold text-[#171717] sm:text-[20px]">
              {name}
            </p>
            <p className="text-[13px] text-[#737373] sm:text-[14px]">{bio}</p>
          </div>

          <button
            type="button"
            onClick={onToggleFollow}
            className="flex shrink-0 items-center gap-1 text-[13px] text-[#2A4EBB] sm:text-[14px]"
          >
            {following ? "İzlənilir" : "Mövzuya izlə"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex gap-6 sm:gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[16px] font-semibold text-[#171717] sm:text-[18px]">
                {s.value}
              </p>
              <p className="text-[12px] text-[#737373]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AuthorCard;