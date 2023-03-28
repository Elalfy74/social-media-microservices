import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/layouts';
import { ThemeProvider } from './ThemeProvider';
import { Home } from './pages';

const queryClient = new QueryClient();

export default function App() {
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
