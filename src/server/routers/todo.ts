import { getSession, useSession } from 'next-auth/react';
import { z } from 'zod';

import { createRouter } from '@server/createRouter';
import { getToken } from 'next-auth/jwt';

export const todoRouter = createRouter().query('get-all', {
  async resolve({ ctx }) {
    const session = await getSession(ctx);

    return await ctx.prisma.todo.findMany();
  },
});
