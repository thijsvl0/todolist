import type { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl">{children}</div>
    </div>
  );
};
export default Layout;
