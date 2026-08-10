import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/space-grotesk/index.css';
import './styles/globals.css';
import { Hire } from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Hire />
    </MotionConfig>
  </StrictMode>
);
