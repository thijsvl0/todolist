import Card from '@components/common/Card';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid';
import { CheckCircleIcon as CheckCircleIconOutline, TrashIcon } from '@heroicons/react/outline';
import { trpc } from '@lib/trpc';
import { Todo } from '@prisma/client';
import type { FC } from 'react';
import { DateTime } from 'luxon';
import { classNames } from '@utils';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const client = trpc.useContext();

  const { mutate: deleteTodo, isLoading: isLoadingDelete } = trpc.useMutation(['todos.delete'], {
    onSuccess: () => client.invalidateQueries(['todos.get-all']),
  });

  const { mutate: updateDone, isLoading: isLoadingUpdate } = trpc.useMutation(['todos.set-done'], {
    onSuccess: () => client.invalidateQueries(['todos.get-all']),
  });

  return (
    <Card className="flex items-center justify-between bg-gray-100 py-2 px-4">
      <div>
        <div>{todo.name}</div>
        <div className="text-sm text-gray-500">Created - {DateTime.fromJSDate(todo.createdAt).toFormat('DDDD T')}</div>
        {todo.done && <div className="text-sm text-gray-500">Completed - {DateTime.fromJSDate(todo.updatedAt).toFormat('DDDD T')}</div>}
      </div>
      <div className="flex">
        {todo.done ? (
          <CheckCircleIconSolid onClick={() => updateDone({ id: todo.id, done: !todo.done })} className={classNames('w-8 stroke-[1.5]  transition duration-200 ', isLoadingUpdate ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
        ) : (
          <CheckCircleIconOutline onClick={() => updateDone({ id: todo.id, done: !todo.done })} className={classNames('w-8 stroke-[1.5]  transition duration-200 ', isLoadingUpdate ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
        )}

        <TrashIcon onClick={() => deleteTodo({ id: todo.id })} className={classNames('w-8 stroke-[1.5]  transition duration-200 ', isLoadingDelete ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
      </div>
    </Card>
  );
};
export default TodoItem;
