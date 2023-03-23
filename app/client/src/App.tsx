import { MainLayout } from '@/Layouts';
import { ThemeProvider } from './ThemeProvider';
import { Welcome } from './Welcome/Welcome';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Welcome />
      </MainLayout>
    </ThemeProvider>
  );
}
