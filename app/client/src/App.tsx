import { MainLayout } from '@/Layouts';
import { ThemeProvider } from './ThemeProvider';
import { NewPost, PostList } from '@/components/Posts';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <NewPost />
        <PostList />
      </MainLayout>
    </ThemeProvider>
  );
}
