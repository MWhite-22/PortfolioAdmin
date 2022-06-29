import { router } from '@trpc/server';
import { Context } from './createTrpcContext';

export const createTrpcRouter = () => router<Context>();
