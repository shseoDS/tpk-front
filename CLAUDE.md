# React TypeScript Project Guide

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Language:** TypeScript
- **State Management:** Zustand 
- **Styling:** Tailwind CSS
- **Data Fetching:** React Query

## 📂 Recommended Directory Structure
```text
src/
├── assets/          # 이미지, 폰트 등 정적 파일
├── components/      # 공통 UI 컴포넌트 (Button, Input, Modal 등)
│   └── common/
├── features/        # 핵심 비즈니스 기능별 모듈 (추천 방식)
│   ├── auth/
│   │   ├── components/  # 해당 기능에서만 쓰는 컴포넌트
│   │   ├── hooks/       # 해당 기능 전용 커스텀 훅
│   │   ├── services/    # API 호출 로직
│   │   └── types/       # 해당 기능 전용 타입 정의
│   └── user/
├── hooks/           # 전역에서 사용하는 공통 커스텀 훅
├── pages/           # 라우팅 페이지 컴포넌트
├── services/        # 전역 API 설정 (axios 인스턴스 등)
├── store/           # 전역 상태 관리 (Zustand 등)
├── types/           # 전역 공통 타입 정의
└── utils/           # 공통 유틸리티 함수 (날짜 포맷 등)