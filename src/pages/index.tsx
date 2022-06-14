import Button from '@components/common/Button';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      Hello {data?.user?.name} <Button onClick={() => signOut()}>Logout</Button>
    </>
  );
};

export default Home;
