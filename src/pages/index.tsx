import TodoItem from '@components/home/TodoItem';
import { trpc } from '@lib/trpc';
import { classNames } from '@utils';
import { AnimatePresence } from 'framer-motion';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Plus } from 'phosphor-react';
import { KeyboardEvent, useRef } from 'react';

const Home: NextPage = () => {
  const client = trpc.useContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: todos, isLoading } = trpc.useQuery(['todos.get-all']);
  const { mutate: createTodo, isLoading: isLoadingCreate } = trpc.useMutation(['todos.create'], {
    onSuccess: () => client.invalidateQueries(['todos.get-all']),
  });

  if (isLoading) return <div>Loading...</div>;

  const createTodoHandler = () => {
    if (inputRef.current?.value) {
      createTodo({ name: inputRef.current.value });
      inputRef.current.value = '';
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTodoHandler();
    }
  };

  return (
    <>
      <Head>
        <title>Home - Todolist</title>
      </Head>
      <div className="mb-4 flex justify-between gap-x-2 px-4">
        <input type="text" className="col-span-5 block w-full rounded-3xl border border-gray-200 py-3 px-4 focus:border-gray-300 focus:ring-0 sm:text-sm" placeholder="Todo" onKeyDown={onKeyDown} ref={inputRef} />
        <div className="flex items-center">
          <Plus size={32} className={classNames('transition duration-200 ', isLoadingCreate ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <AnimatePresence initial={false}>{todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</AnimatePresence>
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
