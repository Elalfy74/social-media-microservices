import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/layouts';
import { ThemeProvider } from './ThemeProvider';
import { Home } from './pages';
import { useAuth } from './store';

const queryClient = new QueryClient();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const checkAuth = useAuth((state) => state.checkAuth);

  // useEffect(() => {
  //   checkAuth().then(() => setIsLoading(false));
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* {!isLoading && ( */}
          <MainLayout>
            <Home />
          </MainLayout>
        {/* )} */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
