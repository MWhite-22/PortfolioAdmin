import superjson from 'superjson';
import { createTrpcRouter } from '../createTrpcRouter';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { utilsRouter } from './utils';

export const appRouter = createTrpcRouter()
	.transformer(superjson)
	.merge('utils.', utilsRouter)
	.merge('example.', exampleRouter)
	.merge('auth.', authRouter);

export type AppRouter = typeof appRouter;
