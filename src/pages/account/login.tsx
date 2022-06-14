import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Button from '@components/common/Button';
import Title from '@components/common/Title';

const Login: NextPage = () => {
  return (
    <>
      <Title>Login</Title>
      <div className="w-full divide-y divide-gray-200 rounded-xl bg-white">
        <div className="flex justify-center p-5">
          <div className="max-w-xs flex-1">
            <Button color="info" onClick={() => signIn('github')}>
              Github
            </Button>
          </div>
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
