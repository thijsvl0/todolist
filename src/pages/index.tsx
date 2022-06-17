import Button from '@components/common/Button';
import { PlusIcon } from '@heroicons/react/outline';
import { trpc } from '@lib/trpc';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['todos.get-all']);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <div className="flex justify-between gap-x-2">
        <input type="text" className="col-span-5 block w-full rounded-xl border-2 border-gray-100 focus:border-primary-200 focus:ring-primary-200 sm:text-sm" placeholder="Todo" />
        <div>
          <Button>
            <PlusIcon className="w-8 stroke-[1.5] text-gray-500 transition duration-200 group-hover:text-gray-900" />
          </Button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: '/account/login' },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Home;
