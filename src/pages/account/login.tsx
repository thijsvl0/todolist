import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Button from '@components/common/Button';
import Title from '@components/common/Title';

const Login: NextPage = () => {
  return (
    <>
      <Title>Login</Title>
      <div className="flex justify-center">
        <div className="col-start-2">
          <Button onClick={() => signIn('github')}>sign in with Github</Button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: '/' },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Login;
