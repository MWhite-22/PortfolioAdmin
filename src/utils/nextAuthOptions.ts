import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { unstable_getServerSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '~/server/prismaClient';

export const nextAuthOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
};

export const getServerSession = (req: NextApiRequest, res: NextApiResponse) =>
	unstable_getServerSession(req, res, nextAuthOptions);
