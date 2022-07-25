import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from '~/utils/nextAuthOptions';
import { prisma } from './prismaClient';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
	const session = await getServerSession(req, res);

	return {
		req,
		res,
		prisma,
		session,
	};
};
export type Context = inferAsyncReturnType<typeof createContext>;
