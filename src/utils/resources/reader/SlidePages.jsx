export default function SlidePages({ zoom, registerPage, totalSlides }) {
  return (
    <main className="flex-1 overflow-y-auto py-10 px-6 flex flex-col items-center gap-10">

      <div
        ref={registerPage(4)}
        className="w-[880px] max-w-full aspect-[16/9] bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] p-10 relative flex flex-col justify-between overflow-hidden transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoom / 100})` }}
      >

        <div className="absolute top-8 right-24 h-12 w-12 rotate-45 border-2 border-blue-100 opacity-60 pointer-events-none" />
        <div className="absolute top-20 left-16 h-8 w-8 rotate-45 border-2 border-blue-100 opacity-60 pointer-events-none" />
        <div className="absolute bottom-16 right-16 h-14 w-14 rotate-45 border-2 border-blue-100 opacity-50 pointer-events-none" />
        <div className="absolute -bottom-10 left-6 h-28 w-28 rounded-full border-4 border-blue-50 opacity-40 pointer-events-none" />

        <div>
          <h2 className="text-[26px] font-bold text-[#1E3A8A] tracking-tight">
            Rəqib Analizi
          </h2>
        </div>

        <div className="relative my-auto h-[320px] w-full max-w-[680px] mx-auto">

          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#3B82F6]" />

          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#3B82F6]" />

          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] font-medium text-gray-700">
            Yüksək qiymət
          </span>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-medium text-gray-700">
            Aşağı qiymət
          </span>
          <span className="absolute top-1/2 -left-28 -translate-y-1/2 text-[12px] font-medium text-gray-700">
            Aşağı keyfiyyət
          </span>
          <span className="absolute top-1/2 -right-28 -translate-y-1/2 text-[12px] font-medium text-gray-700">
            Yüksək keyfiyyət
          </span>

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: "44%", top: "35%" }}
          >
            <div className="h-12 w-11 rounded bg-[#111827] border-2 border-[#D97706] p-1 shadow-md flex flex-col items-center justify-center">
              <span className="text-[8px] font-serif font-black text-[#F59E0B]">★</span>
              <span className="text-[5px] font-bold text-white uppercase tracking-tighter">ALL STAR</span>
            </div>
          </div>

          <div
            className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#0056D2] text-[15px] tracking-tight"
            style={{ left: "68%", top: "18%" }}
          >
            <span className="text-base">🔷</span>
            <span>coursera</span>
          </div>

          <div
            className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#A435F0] text-[15px]"
            style={{ left: "64%", top: "30%" }}
          >
            <span className="text-base">🟣</span>
            <span>ûdemy</span>
          </div>

          <div
            className="absolute -translate-y-1/2 flex flex-col items-center text-center"
            style={{ left: "54%", top: "38%" }}
          >
            <div className="flex items-center gap-1 text-[#2563EB]">
              <span className="text-sm">📢</span>
              <span className="text-[8px] font-bold leading-tight">ALL STAR</span>
            </div>
          </div>

          <div
            className="absolute -translate-y-1/2 text-[14px] font-bold text-[#EF4444] italic"
            style={{ left: "54%", top: "48%" }}
          >
            eSchool
          </div>

          <div
            className="absolute -translate-y-1/2 flex items-center gap-1.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-1 text-[14px] font-black text-[#1E40AF] shadow-sm"
            style={{ left: "68%", top: "52%" }}
          >
            <span>📘</span>
            <span>CoThink</span>
          </div>

          <div
            className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#FF4500] text-[14px]"
            style={{ left: "28%", top: "54%" }}
          >
            <span className="text-base">🔴</span>
            <span>reddit</span>
          </div>

          <div
            className="absolute -translate-y-1/2 rounded bg-black px-2.5 py-1 text-[11px] font-black text-white uppercase tracking-wider shadow-sm"
            style={{ left: "40%", top: "52%" }}
          >
            BRAINLY
          </div>

          <div
            className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-black text-[13px]"
            style={{ left: "54%", top: "65%" }}
          >
            <span>⚫</span>
            <span>Medium</span>
          </div>

          <div
            className="absolute -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-tr from-purple-700 via-pink-600 to-amber-500 shadow-md flex items-center justify-center text-[7px] text-white font-bold"
            style={{ left: "43%", top: "65%" }}
          >
            ✦
          </div>

        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t border-gray-100">
          <span>CoThink Startup Pitch Deck</span>
          <span>Slayd 4 / {totalSlides}</span>
        </div>
      </div>

      <div
        ref={registerPage(5)}
        className="w-[880px] max-w-full aspect-[16/9] bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col justify-end transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoom / 100})` }}
      >

        <div className="absolute inset-0 top-10 bg-[#1D4ED8] rounded-t-[200px] flex items-center justify-between px-16 text-white pt-6">
          <div>
            <h3 className="text-[36px] font-black tracking-tight">Bazar Potensialı</h3>
            <p className="text-sm text-blue-200 mt-1">Azərbaycan və regional tələbə və akademik resurs bazarı</p>
          </div>
          <div className="text-right">
            <span className="text-[54px] font-black tracking-tight">246K</span>
            <span className="block text-sm font-bold text-blue-200 uppercase tracking-widest">TAM</span>
          </div>
        </div>
      </div>

    </main>
  );
}
