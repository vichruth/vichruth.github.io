import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {SmoothScrollProvider} from './lib/SmoothScroll.tsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
);
