import { PRESET_COLORS } from "../../../data/readerData";

export default function ReaderColorPalette({ variant, activeColor, setActiveColor, customHex, setCustomHex }) {
  return (
    <div className="absolute right-0 top-11 z-50 w-[230px] rounded-[16px] border border-gray-100 bg-white p-3.5 shadow-2xl">

      <div className="space-y-1.5 border-b border-gray-100 pb-2.5">
        {PRESET_COLORS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveColor(item.color);
              setCustomHex(item.color);
            }}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-[13px] text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-3.5 w-3.5 rounded-full shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[11px] text-gray-400 font-medium">{item.badge}</span>
            )}
          </button>
        ))}

        <div className="flex items-center justify-between rounded-lg px-2 py-1 text-[13px] font-medium text-gray-800">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-indigo-600 shadow-sm" />
            <span>Rəng seç</span>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div
          className="relative h-24 w-full rounded-xl shadow-inner cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, ${activeColor})`,
          }}
        >
          <div
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
            style={{ left: "75%", top: "45%", backgroundColor: activeColor }}
          />
        </div>

        <div className="mt-2 space-y-1.5">
          <input
            type="range"
            min="0"
            max="360"
            defaultValue="270"
            onChange={(e) => {
              const hue = e.target.value;
              const newColor = `hsl(${hue}, 85%, 65%)`;
              setActiveColor(newColor);
              if (variant === "book") setCustomHex(newColor);
            }}
            className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 outline-none cursor-pointer"
          />
          {variant === "book" && (
            <input
              type="range"
              min="10"
              max="100"
              defaultValue="80"
              className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-transparent to-purple-600 outline-none cursor-pointer"
            />
          )}
        </div>

        {variant === "book" && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 pt-1.5 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div
                className="h-5 w-5 shrink-0 rounded-md border border-gray-200 shadow-sm"
                style={{ backgroundColor: activeColor }}
              />
              <span className="font-medium text-gray-600">HEX</span>
              <input
                type="text"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-16 rounded border border-gray-200 px-1 py-0.5 text-center font-mono text-[10.5px] text-gray-700 outline-none"
              />
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-gray-600">
              <span>151</span>
              <span>81</span>
              <span>242</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
