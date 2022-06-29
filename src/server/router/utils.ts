import { createTrpcRouter } from '../createTrpcRouter';

export const utilsRouter = createTrpcRouter().query('health', {
	resolve: () => {
		return 'HEALTH CHECK: OK!';
	},
});
