import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '~/server/createTrpcContext';
import { appRouter } from '~/server/router/_app';

export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
	// https://trpc.io/docs/error-handling
	onError({ error, path, type }) {
		if (error.code === 'INTERNAL_SERVER_ERROR') {
			// send to bug reporting
			console.error('Something went wrong', error.message);
			console.error({
				path,
				type,
				error,
			});
		}
	},
	// batching: {
	// 	enabled: true,
	// },
});
