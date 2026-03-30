import { useNavigate } from 'react-router-dom';
import SLButton from '@/components/common/SLButton';
import PlanCard from '@/features/membership/components/PlanCard';

const BENEFITS = [
  { strongText: 'Unlimited access', text: 'to all decks' },
  { strongText: 'Seamless auto-play', text: 'deck audio' },
  { strongText: 'Create unlimited', text: 'study folders' },
];

const LEGAL_LINKS = ['Restore Purchases', 'Terms of Use', 'Privacy Policy'];

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full hover:bg-[#f2f4f5] transition-colors"
      aria-label="닫기"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="#2a2b2d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function LegalLinks() {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {LEGAL_LINKS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 && <span className="w-px h-[11px] bg-[#868889]" />}
          <button className="typography-caption-2 text-[#868889] hover:underline">
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}

function BottomCTA() {
  return (
    <div className="flex flex-col gap-3">
      <p className="typography-caption-2 text-[#676b6e] text-center">
        Auto-renews monthly at $3.99. Payment is charged to your store account.
        Cancel anytime in App Store or Google Play settings.
      </p>
      <LegalLinks />
      <SLButton variant="primary" fullWidth>Start PLUS</SLButton>
    </div>
  );
}

export default function MembershipPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 bg-[#f2f4f5]">

      {/* ── 모바일 (< sm): 스크롤 콘텐츠 + 하단 고정 CTA */}
      <div className="flex flex-col flex-1 sm:hidden">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex justify-end py-3">
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="text-center mb-6">
            <p className="typography-caption-1 text-[#2a2b2d] mb-3">
              더 많은 기능은 멤버십 가입 후 이용할 수 있어요
            </p>
            <h1 className="typography-heading-4 text-[#2a2b2d] mb-2">
              Unlock Every Deck Without{' '}
              <span className="text-[#3592fd]">Limits!</span>
            </h1>
            <p className="typography-body-3 text-[#676b6e]">
              Experience a limitless learning environment
              <br />with DearLangs PLUS.
            </p>
          </div>
          <div className="pb-4">
            <PlanCard
              name="DearLangs PLUS"
              price="$ 3.99"
              period="/Month"
              badgeLabel="Premium"
              benefitsLabel="PLUS Benefits"
              benefits={BENEFITS}
            />
          </div>
        </div>
        {/* 고정 하단 */}
        <div className="bg-white shadow-[0px_-3px_8px_0px_rgba(154,154,154,0.12)] px-5 pt-4 pb-9">
          <BottomCTA />
        </div>
      </div>

      {/* ── 태블릿 / 데스크탑 (>= sm): 자연스러운 스크롤 흐름 */}
      <div className="hidden sm:block w-full max-w-2xl mx-auto px-6 py-6">
        <div className="flex justify-end mb-4">
          <CloseButton onClick={() => navigate(-1)} />
        </div>

        {/* 히어로 */}
        <div className="text-center mb-8">
          <p className="typography-caption-1 text-[#2a2b2d] mb-3">
            더 많은 기능은 멤버십 가입 후 이용할 수 있어요
          </p>
          <h1 className="typography-heading-1 text-[#2a2b2d] mb-3">
            Unlock Every Deck Without{' '}
            <span className="text-[#3592fd]">Limits!</span>
          </h1>
          <p className="typography-body-1 text-[#676b6e]">
            Experience a limitless learning environment with DearLangs PLUS.
          </p>
        </div>

        {/* 플랜 카드 */}
        <div className="max-w-lg mx-auto mb-8">
          <PlanCard
            name="DearLangs PLUS"
            price="$ 3.99"
            period="/Month"
            badgeLabel="Premium"
            benefitsLabel="PLUS Benefits"
            benefits={BENEFITS}
          />
        </div>

        {/* CTA */}
        <div className="max-w-lg mx-auto">
          <BottomCTA />
        </div>
      </div>

    </div>
  );
}
