import type { NextApiHandler } from 'next';
import { prisma } from '~/server/prismaClient';

const apiRoute: NextApiHandler = async (_, res) => {
	const examples = await prisma.example.findMany();
	res.status(200).json(examples);
};

export default apiRoute;
