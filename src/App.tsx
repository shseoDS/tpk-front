import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/common/Header';
import HomePage from '@/pages/HomePage';
import ExamListPage from '@/pages/ExamListPage';
import ExamDetailPage from '@/pages/ExamDetailPage';
import QuestionPage from '@/pages/QuestionPage';
import PracticePage from '@/pages/PracticePage';
import MembershipPage from '@/pages/MembershipPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-svh bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exams" element={<ExamListPage />} />
            <Route path="/exams/:examKey" element={<ExamDetailPage />} />
            <Route path="/exams/:examKey/questions" element={<QuestionPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
