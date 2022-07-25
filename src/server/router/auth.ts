import { TRPCError } from '@trpc/server';
import { createTrpcRouter } from '~/server/createTrpcRouter';

export const authRouter = createTrpcRouter()
	.query('getSession', {
		resolve({ ctx }) {
			return ctx.session;
		},
	})
	.middleware(async ({ ctx, next }) => {
		// Any queries or mutations after this middleware will
		// raise an error unless there is a current session
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.query('getSecretMessage', {
		resolve() {
			return 'You are logged in and can see this secret message!';
		},
	});
