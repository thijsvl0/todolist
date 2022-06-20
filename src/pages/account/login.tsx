import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Button from '@components/common/Button';
import Title from '@components/common/Title';
import Head from 'next/head';
import { GithubLogo } from 'phosphor-react';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - Todolist</title>
      </Head>
      <Title>Login</Title>
      <div>Sign in with</div>
      <div className="flex justify-center">
        <div>
          <Button onClick={() => signIn('github')}>
            Github <GithubLogo size={32} className="inline-block text-gray-800 transition duration-200 group-hover:text-gray-900" />
          </Button>
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
