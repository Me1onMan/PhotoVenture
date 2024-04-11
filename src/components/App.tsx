import IsAuthProvider from '@/providers/IsAuthProvider';

import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <IsAuthProvider>
        <AppRouter />
      </IsAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
