import { createRouter } from '@server/createRouter';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const todoRouter = createRouter()
  .middleware(({ ctx, next }) => {
    if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next();
  })
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({ where: { user: { id: ctx.user?.id } } });
    },
  })
  .mutation('create', {
    input: z.object({ name: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.create({
        data: {
          name: input.name,
          user: { connect: { id: ctx.user?.id } },
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    },
  });
