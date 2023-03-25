import { Container } from '@mantine/core';
import { MainHeader } from './MainHeader';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <Container pt={80}>{children}</Container>
    </>
  );
};
