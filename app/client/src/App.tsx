import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/layouts';
import { ThemeProvider } from './ThemeProvider';
import { NewPost, PostList } from '@/components/Posts';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout>
          <NewPost />
          <PostList />
        </MainLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
