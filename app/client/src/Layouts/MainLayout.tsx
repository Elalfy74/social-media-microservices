import { MainHeader } from './MainHeader';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};
