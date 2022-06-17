import Card from '@components/common/Card';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import Profile from './Profile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-xl p-3">
        {session && <Profile />}
        {children}
      </Card>
    </div>
  );
};
export default Layout;
