import { PAGE_STEPS, PAGE_LAST_INDEX } from "./resourceFilterOptions";
const BLUE = "#2A4EBB";

export const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#404040"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke={BLUE}
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const SectionTitle = ({ children }) => (
  <p className="mb-3 text-[16px] font-medium text-[#171717]">{children}</p>
);

export function FilterSection({ title, children, first = false }) {
  return <div className={first ? "mt-8" : "mt-7 border-t border-[#EEEEEE] pt-6"}><SectionTitle>{title}</SectionTitle>{children}</div>;
}

export function RadioChoices({ name, options, value, onChange, large = false }) {
  return (
    <div className={large ? "flex flex-wrap gap-x-6 gap-y-3" : "flex flex-wrap gap-x-5 gap-y-3"}>
      {options.map((option) => {
        const choice = typeof option === "string" ? { value: option, label: option } : option;
        return <label key={choice.value} className="flex cursor-pointer items-center gap-2 text-[14px] text-[#404040]">
          <input type="radio" name={name} checked={value === choice.value} onChange={() => onChange(choice.value)}
            className={large ? "h-[22px] w-[22px] cursor-pointer accent-[#2A4EBB]" : "h-[20px] w-[20px] cursor-pointer accent-[#2A4EBB]"} />
          {choice.label}
        </label>;
      })}
    </div>
  );
}

export function CheckboxChoices({ options, selected, onToggle }) {
  return options.map((option) => {
    const checked = selected.includes(option);
    return (
      <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] focus-within:ring-2 focus-within:ring-[#2A4EBB]/30 ${checked ? "border-[#2A4EBB] text-[#2A4EBB]" : "border-[#BDBDBD] text-[#404040]"}`}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(option)} />
        <span className={`flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border ${checked ? "border-[#2A4EBB]" : "border-[#737373]"}`}>{checked && <CheckIcon />}</span>
        {option}
      </label>
    );
  });
}

export function LanguageChoices({ options, selected, onToggle }) {
  return options.map((option) => (
    <button key={option} type="button" aria-pressed={selected.includes(option)} onClick={() => onToggle(option)}
      className={`rounded-full border px-5 py-2 text-[14px] ${selected.includes(option) ? "border-[#2A4EBB] bg-[#F2F5FF] text-[#2A4EBB]" : "border-[#BDBDBD] text-[#404040]"}`}>{option}</button>
  ));
}

export function OtherOption({ language = false }) {
  return <button type="button" className={`flex items-center gap-1 rounded-full border border-[#BDBDBD] py-2 text-[14px] text-[#404040] ${language ? "px-5" : "px-4"}`}>Digər<ChevronDown /></button>;
}

export function ChevronDown({ className, size = 14 }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>;
}

export function PageLimit({ value, onChange }) {
  const fillPercent = value / PAGE_LAST_INDEX * 100;
  return (
    <div className="px-3">
      <div className="relative h-[16px]">
        <div className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#EEEEEE]" />
        <div
          className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full"
          style={{ width: `${fillPercent}%`, backgroundColor: BLUE }}
        />
        {PAGE_STEPS.map((step, i) => (
          <button
            key={step}
            type="button"
            aria-label={`${step}${i === PAGE_LAST_INDEX ? "+" : ""} səhifə`}
            onClick={() => onChange(i)}
            className="absolute top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${(i / PAGE_LAST_INDEX) * 100}%`,
              backgroundColor:
                i <= value ? BLUE : "#EEEEEE",
            }}
          />
        ))}
      </div>
      <div className="relative mt-2 h-[18px] text-[12px] text-[#404040]">
        {PAGE_STEPS.map((step, i) => (
          <span
            key={step}
            className="absolute -translate-x-1/2"
            style={{
              left: `${(i / PAGE_LAST_INDEX) * 100}%`,
            }}
          >
            {step}
            {i === PAGE_LAST_INDEX ? "+" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
