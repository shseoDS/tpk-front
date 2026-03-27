import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/queryClient';
import { initFlutterTokenBridge } from '@/store/authStore';
import { initFlutterConfigBridge } from '@/services/api';
import App from './App';
import './index.css';

// Flutter WebView 브릿지 초기화 (API URL + 토큰)
initFlutterConfigBridge();
initFlutterTokenBridge();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
