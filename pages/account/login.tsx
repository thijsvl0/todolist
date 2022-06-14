import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';

const Login: NextPage = () => {
  return (
    <>
      <Title>Login</Title>
      <div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="p-5">
          <div className="grid grid-cols-3 gap-1">
            <Button color="secondary" onClick={() => signIn('github')}>
              Github
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
