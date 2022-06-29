import { z } from 'zod';
import { createTrpcRouter } from '../createTrpcRouter';

export const exampleRouter = createTrpcRouter()
	.query('hello', {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`,
			};
		},
	})
	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.example.findMany();
		},
	});
