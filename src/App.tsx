import { MotionConfig } from 'framer-motion';
import { Portfolio } from './pages';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Portfolio />
    </MotionConfig>
  );
}

export default App;
