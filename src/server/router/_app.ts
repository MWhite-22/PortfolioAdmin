import superjson from 'superjson';
import { createTrpcRouter } from '../createTrpcRouter';
import { exampleRouter } from './example';
import { utilsRouter } from './utils';

export const appRouter = createTrpcRouter()
	.transformer(superjson)
	.merge('utils.', utilsRouter)
	.merge('example.', exampleRouter);

export type AppRouter = typeof appRouter;
