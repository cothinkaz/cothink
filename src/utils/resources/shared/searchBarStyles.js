export const searchBarStyles = {
  "resources": {
    "container": "flex flex-col gap-3 sm:flex-row sm:items-center",
    "inputContainer": "relative w-full min-w-0 flex-1",
    "icon": "absolute left-5 top-1/2 -translate-y-1/2",
    "input": "h-[50px] w-full rounded-full border border-[#D9D9D9] pl-14 pr-12 text-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#2A4EBB]/30 [&::-webkit-search-cancel-button]:appearance-none",
    "filter": "flex h-[50px] w-full shrink-0 items-center justify-center gap-3 rounded-full border border-[#D9D9D9] px-6 text-[16px] text-[#404040] sm:w-auto"
  },
  "default": {
    "container": "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
    "inputContainer": "relative w-full sm:flex-1",
    "icon": "absolute left-4 top-1/2 -translate-y-1/2 sm:left-5",
    "input": "h-[44px] w-full rounded-full border border-[#D9D9D9] pl-12 pr-4 text-[14px] outline-none sm:h-[50px] sm:pl-14 sm:pr-5 sm:text-[16px]",
    "filter": "flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#D9D9D9] px-6 text-[14px] text-[#404040] sm:h-[50px] sm:w-auto sm:gap-3 sm:text-[16px]"
  }
};
