import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import Profile from './Profile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-2xl rounded-2xl border bg-gray-50 p-6">
        {session && <Profile />}
        {children}
      </div>
    </div>
  );
};
export default Layout;
