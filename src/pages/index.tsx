import Button from '@components/common/Button';
import TodoItem from '@components/home/TodoItem';
import { PlusIcon } from '@heroicons/react/outline';
import { trpc } from '@lib/trpc';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { KeyboardEvent, useRef } from 'react';

const Home: NextPage = () => {
  const client = trpc.useContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: todos, isLoading } = trpc.useQuery(['todos.get-all']);
  const { mutate: createTodo } = trpc.useMutation(['todos.create'], {
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
      <div className="mb-4 flex justify-between gap-x-2">
        <input type="text" className="col-span-5 block w-full rounded-xl border-2 border-gray-100 focus:border-primary-200 focus:ring-primary-200 sm:text-sm" placeholder="Todo" onKeyDown={onKeyDown} ref={inputRef} />
        <div>
          <Button onClick={() => createTodoHandler()}>
            <PlusIcon className="w-8 stroke-[1.5] text-gray-500 transition duration-200 group-hover:text-gray-900" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">{todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>
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
