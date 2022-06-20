import Card from '@components/common/Card';
import { trpc } from '@lib/trpc';
import { Todo } from '@prisma/client';
import type { FC } from 'react';
import { DateTime } from 'luxon';
import { classNames } from '@utils';
import { CheckCircle, Trash } from 'phosphor-react';

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
        <CheckCircle onClick={() => updateDone({ id: todo.id, done: !todo.done })} size={32} weight={todo.done ? 'fill' : 'regular'} className={classNames('transition duration-200 ', isLoadingUpdate ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
        <Trash onClick={() => deleteTodo({ id: todo.id })} size={32} className={classNames('transition duration-200 ', isLoadingDelete ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
      </div>
    </Card>
  );
};
export default TodoItem;
