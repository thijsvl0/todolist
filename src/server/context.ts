import prisma from '@lib/prisma';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import { getSession } from 'next-auth/react';

export async function createContext(ctxOptions?: CreateNextContextOptions) {
  const req = ctxOptions?.req;
  const res = ctxOptions?.res;

  const session = await getSession({ req });

  return {
    req,
    res,
    prisma,
    session,
  };
}

export type MyContextType = inferAsyncReturnType<typeof createContext>;
