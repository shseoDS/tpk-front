import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamSessionStore } from '@/store/examSessionStore';
import { useExamInstructions } from '@/features/exam/hooks/useExam';
import ExitConfirmModal from '@/features/exam/components/ExitConfirmModal';
import InstructionCard from '@/features/exam/components/InstructionCard';
import ProgressBar from '@/features/exam/components/ProgressBar';
import QuestionCard from '@/features/exam/components/QuestionCard';
import ChoiceList from '@/features/exam/components/ChoiceList';
import FeedbackCard from '@/features/exam/components/FeedbackCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SLButton from '@/components/common/SLButton';

export default function QuestionPage() {
  const { examKey } = useParams<{ examKey: string }>();
  const key = Number(examKey);
  const navigate = useNavigate();

  const { session, setCurrentIndex, setAnswer } = useExamSessionStore();

  // 지시문 목록
  const { data: instructions } = useExamInstructions(key);

  // 문제번호 → 지시문 룩업맵
  const instructionMap = useMemo(() => {
    const map = new Map<number, { fullSentence: string; paragraph: string | null }>();
    for (const ins of instructions ?? []) {
      if (!ins.ins_json) continue;
      const { full_sentence, paragraph, no_list } = ins.ins_json;
      for (const no of no_list) {
        map.set(no, { fullSentence: full_sentence, paragraph: paragraph ?? null });
      }
    }
    return map;
  }, [instructions]);

  // 로컬 UI 상태
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // 0-based
  const [submitted, setSubmitted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // 정답 확인 후 버튼 영역으로 자동 스크롤
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (submitted) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [submitted]);

  // ── 세션 없으면 상세 페이지로 리다이렉트
  useEffect(() => {
    if (!session || session.examKey !== key) {
      navigate(`/exams/${key}`, { replace: true });
    }
  }, [session, key, navigate]);

  // ── 문제 바뀔 때 선택 초기화
  useEffect(() => {
    setSelectedIdx(null);
    setSubmitted(false);
  }, [session?.currentIndex]);

  // ── 뒤로가기(popstate) 인터셉트
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    function handlePopState() {
      window.history.pushState(null, '', window.location.href);
      setShowExitModal(true);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (!session || session.examKey !== key) {
    return <LoadingSpinner fullPage />;
  }

  const { questions, currentIndex } = session;
  const question = questions[currentIndex];
  const qj = question?.question_json;
  const total = questions.length;
  const isLast = currentIndex === total - 1;
  const isCorrect =
    submitted && selectedIdx !== null
      ? selectedIdx + 1 === qj?.correct_answer
      : false;

  // 현재 문제의 지시문
  const instruction = question ? instructionMap.get(question.question_no) : undefined;

  function handleSelect(idx: number) {
    if (!submitted) setSelectedIdx(idx);
  }

  function handleSubmit() {
    if (selectedIdx === null || !qj) return;
    setAnswer(question.question_no, selectedIdx + 1);
    setSubmitted(true);
  }

  function handleNext() {
    if (isLast) {
      navigate(`/exams/${key}`, { replace: true });
      return;
    }
    setCurrentIndex(currentIndex + 1);
  }

  function handleRetry() {
    setSelectedIdx(null);
    setSubmitted(false);
  }

  function handleExitConfirm() {
    setShowExitModal(false);
    navigate(`/exams/${key}`, { replace: true });
  }

  if (!question || !qj) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-6">
        <p className="text-gray-400">문제 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full px-4 py-4">

        {/* ── 상단 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowExitModal(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="시험 종료"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <ProgressBar current={currentIndex + 1} total={total} />
          </div>
        </div>

        {/* ── 지시문 (해당 문제에 지시문이 있을 때만) */}
        {instruction && (
          <InstructionCard
            fullSentence={instruction.fullSentence}
            paragraph={instruction.paragraph}
          />
        )}

        {/* ── 문제 카드 */}
        <div className="mb-5">
          <QuestionCard
            questionNo={question.question_no}
            questionText={qj.question_text}
            passage={qj.passage}
            questionType={question.question_type || undefined}
            score={question.score ?? undefined}
          />
        </div>

        {/* ── 보기 */}
        <div className="mb-5">
          <ChoiceList
            choices={qj.choices}
            selectedIdx={selectedIdx}
            correctIdx={qj.correct_answer - 1}
            answerState={!submitted ? 'idle' : isCorrect ? 'correct' : 'wrong'}
            onSelect={handleSelect}
          />
        </div>

        {/* ── 해설 */}
        {submitted && selectedIdx !== null && (qj.feedback?.length ?? 0) > 0 && (
          <div className="mb-5">
            <FeedbackCard
              isCorrect={isCorrect}
              correctAnswer={qj.correct_answer}
              selectedChoice={selectedIdx + 1}
              feedbackList={qj.feedback ?? []}
            />
          </div>
        )}

        {/* ── 하단 버튼 */}
        <div
          ref={bottomRef}
          className="mt-auto pt-2 flex gap-2.5"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {!submitted ? (
            <SLButton
              variant="primary"
              fullWidth
              disabled={selectedIdx === null}
              onClick={handleSubmit}
              className="py-4"
            >
              정답 확인
            </SLButton>
          ) : (
            <>
              <SLButton variant="outlined" onClick={handleRetry} className="px-5 py-4">
                다시 풀기
              </SLButton>
              <button
                onClick={handleNext}
                className="flex-1 py-4 rounded-[12px] typography-body-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-gray-900 transition-colors"
              >
                {isLast ? '완료' : '다음 문제 →'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── 종료 확인 모달 */}
      {showExitModal && (
        <ExitConfirmModal
          onContinue={() => setShowExitModal(false)}
          onExit={handleExitConfirm}
        />
      )}
    </>
  );
}
