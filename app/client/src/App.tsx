import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { ThemeProvider } from './ThemeProvider';
import { Home } from './pages';
import { useAuth } from './store';

const queryClient = new QueryClient();

export default function App() {
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout>
          <Home />
        </MainLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
