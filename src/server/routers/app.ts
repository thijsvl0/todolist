import { createRouter } from '../createRouter';
import { todoRouter } from './todo';
import superjson from 'superjson';

export const appRouter = createRouter().transformer(superjson).merge('todos.', todoRouter);

export type AppRouter = typeof appRouter;
