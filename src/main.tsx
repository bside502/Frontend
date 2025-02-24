import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import GlobalStyle from './style/GlobalStyle.tsx';

async function init() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser.ts');

    return worker.start();
  }
}
await init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
