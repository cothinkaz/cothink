export default function ReaderSearch({ variant, searchQuery, setSearchQuery, setSearchOpen }) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 px-6 py-2 flex items-center gap-3 z-20">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={variant === "book" ? "Kitab daxilində axtar..." : "Prezentasiya daxilində axtar..."}
        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 outline-none focus:border-blue-500"
      />
      <button
        type="button"
        onClick={() => setSearchOpen(false)}
        className="text-xs text-gray-500 hover:text-gray-800 font-medium"
      >
        Bağla
      </button>
    </div>
  );
}
