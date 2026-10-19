const ResourcePagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const pages = [];
  const maxVisible = 3;

  // Always show first pages
  for (let i = 1; i <= Math.min(maxVisible, total); i++) {
    pages.push(i);
  }

  // Add ellipsis + last page if needed
  if (total > maxVisible + 1) {
    pages.push("...");
    pages.push(total);
  } else if (total === maxVisible + 1) {
    pages.push(total);
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1"
    >
      {/* First */}
      <button
        type="button"
        onClick={() => onChange(1)}
        disabled={current === 1}
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] text-[#404040] disabled:opacity-30"
        aria-label="İlk səhifə"
      >
        «
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] text-[#404040] disabled:opacity-30"
        aria-label="Əvvəlki"
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-[36px] w-[36px] items-center justify-center text-[14px] text-[#404040]"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] font-medium ${
              current === page
                ? "bg-[#2A4EBB] text-white"
                : "text-[#404040] hover:bg-[#F5F5F5]"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] text-[#404040] disabled:opacity-30"
        aria-label="Növbəti"
      >
        ›
      </button>

      {/* Last */}
      <button
        type="button"
        onClick={() => onChange(total)}
        disabled={current === total}
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] text-[#404040] disabled:opacity-30"
        aria-label="Son səhifə"
      >
        »
      </button>
    </nav>
  );
};

export default ResourcePagination;
