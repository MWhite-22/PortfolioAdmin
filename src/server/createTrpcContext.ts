import type { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from './prismaClient';

export const createContext = ({ req, res }: CreateNextContextOptions) => {
	return {
		req,
		res,
		prisma,
	};
};
export type Context = inferAsyncReturnType<typeof createContext>;
