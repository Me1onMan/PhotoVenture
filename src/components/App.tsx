import IsAuthProvider from '@/providers/IsAuthProvider';
import ThemeProvider from '@/providers/ThemeProvider';

import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <IsAuthProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </IsAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
