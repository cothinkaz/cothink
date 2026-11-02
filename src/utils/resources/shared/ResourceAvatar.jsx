import { useState } from "react";

const UserAvatar = ({ size = 42, src = null, alt = "Avatar", className = "" }) => {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex items-end justify-center overflow-hidden rounded-full bg-[#E5E7EB] shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ width: size * 1.05, height: size * 1.05 }}
        fill="#9CA3AF"
      >
        <circle cx="12" cy="8" r="4.2" />
        <path d="M3 24c0-5.2 4-8 9-8s9 2.8 9 8z" />
      </svg>
    </div>
  );
};

export default UserAvatar;
