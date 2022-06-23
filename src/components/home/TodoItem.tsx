import { trpc } from '@lib/trpc';
import { Todo } from '@prisma/client';
import type { FC } from 'react';
import { DateTime } from 'luxon';
import { classNames } from '@utils';
import { CheckCircle, Trash } from 'phosphor-react';
import { AnimatePresence, motion } from 'framer-motion';

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
    <motion.div className="overflow-visible" initial={{ y: -20, height: 0, opacity: 0 }} animate={{ y: 0, height: 'auto', opacity: 1 }} exit={{ x: 100, height: 0, opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.2 }}>
      <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-md">
        <div>
          <div>{todo.name}</div>
          <div className="text-sm text-gray-500">Created - {DateTime.fromJSDate(todo.createdAt).toFormat('DDDD T')}</div>
          <AnimatePresence initial={false}>
            {todo.done && (
              <motion.div className="text-sm text-gray-500" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                Completed - {DateTime.fromJSDate(todo.updatedAt).toFormat('DDDD T')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex">
          <CheckCircle
            onClick={(e) => (isLoadingUpdate ? e.preventDefault() : updateDone({ id: todo.id, done: !todo.done }))}
            size={32}
            weight={todo.done ? 'fill' : 'light'}
            className={classNames('transition duration-200 ', isLoadingUpdate ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')}
          />
          <Trash onClick={(e) => (isLoadingDelete ? e.preventDefault() : deleteTodo({ id: todo.id }))} weight={'light'} size={32} className={classNames('transition duration-200 ', isLoadingDelete ? 'text-gray-400' : 'text-gray-500 hover:cursor-pointer hover:text-gray-900')} />
        </div>
      </div>
    </motion.div>
  );
};
export default TodoItem;
