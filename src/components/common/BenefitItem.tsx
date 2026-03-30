interface BenefitItemProps {
  strongText: string;
  text?: string;
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#3592FD" fillOpacity="0.12" />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke="#3592FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BenefitItem({ strongText, text }: BenefitItemProps) {
  return (
    <div className="flex gap-[6px] items-center px-4 py-3 bg-[#f6f8fa] rounded-[8px] w-full">
      <span className="shrink-0">
        <CheckIcon />
      </span>
      <div className="flex gap-1 items-center flex-wrap">
        <span className="typography-body-2 text-[#2a2b2d]">{strongText}</span>
        {text && <span className="typography-body-3 text-[#676b6e]">{text}</span>}
      </div>
    </div>
  );
}
