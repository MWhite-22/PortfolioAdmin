import type { Context } from './createTrpcContext';
import { router } from '@trpc/server';

export const createTrpcRouter = () => router<Context>();
