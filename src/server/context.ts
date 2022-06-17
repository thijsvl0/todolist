import prisma from '@lib/prisma';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import { getSession } from 'next-auth/react';

export async function createContext(ctxOptions?: CreateNextContextOptions) {
  const req = ctxOptions?.req;
  const res = ctxOptions?.res;

  const session = await getSession({ req });
  const user = session?.user?.email ? await prisma.user.findFirst({ where: { email: session.user.email } }) : null;

  return {
    req,
    res,
    prisma,
    user,
  };
}

export type MyContextType = inferAsyncReturnType<typeof createContext>;
