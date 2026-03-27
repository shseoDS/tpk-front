import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-2 text-gray-500">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
