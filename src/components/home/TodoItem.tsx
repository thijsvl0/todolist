import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { trpc } from '@lib/trpc';
import { Todo } from '@prisma/client';
import type { FC } from 'react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const client = trpc.useContext();

  const { mutate: deleteTodo, isLoading } = trpc.useMutation(['todos.delete'], {
    onSuccess: () => client.invalidateQueries(['todos.get-all']),
  });

  return (
    <Card className="flex items-center justify-between bg-gray-100 py-2 px-4">
      <div className="col-span-5">{todo.name}</div>
      <div>
        <Button onClick={() => deleteTodo({ id: todo.id })}>
          <TrashIcon className="w-8 stroke-[1.5] text-gray-500 transition duration-200 group-hover:text-gray-900" />
        </Button>
      </div>
    </Card>
  );
};
export default TodoItem;
