import BenefitItem from '@/components/common/BenefitItem';

interface Benefit {
  strongText: string;
  text?: string;
}

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  badgeLabel?: string;
  benefitsLabel?: string;
  benefits: Benefit[];
}

function CrownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12h12M2.5 12L1 5l4 3 3-5 3 5 4-3-1.5 7H2.5z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1L9.5 6.5H15L10.5 9.5L12 15L8 12L4 15L5.5 9.5L1 6.5H6.5L8 1Z"
        fill="#F5A623"
      />
    </svg>
  );
}

export default function PlanCard({
  name,
  price,
  period,
  badgeLabel = 'Premium',
  benefitsLabel = 'PLUS Benefits',
  benefits,
}: PlanCardProps) {
  return (
    <div className="bg-white border-2 border-[#3592fd] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.06)] overflow-hidden relative w-full">
      {/* Premium badge */}
      <div className="absolute top-0 right-5 flex gap-1 items-center bg-[#3592fd] px-[10px] py-2 rounded-b-[6px]">
        <CrownIcon />
        <span className="typography-caption-3 text-white">{badgeLabel}</span>
      </div>

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-[#f2f4f5]">
        <div className="flex flex-col gap-1">
          <span className="typography-subtitle-3 text-[#2a2b2d]">{name}</span>
          <div className="flex items-end gap-[2px]">
            <span className="text-[30px] font-semibold leading-none tracking-[-0.75px] text-[#3592fd]">
              {price}
            </span>
            <span className="typography-body-3 text-[#676b6e] mb-[2px]">{period}</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-5 pt-3 pb-5 flex flex-col gap-3">
        <div className="flex items-center gap-[6px]">
          <StarIcon />
          <span className="typography-caption-2 text-[#676b6e]">{benefitsLabel}</span>
        </div>
        <div className="flex flex-col gap-2">
          {benefits.map((benefit, i) => (
            <BenefitItem key={i} strongText={benefit.strongText} text={benefit.text} />
          ))}
        </div>
      </div>
    </div>
  );
}
