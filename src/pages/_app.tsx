import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import type { AppRouter } from '~/server/router/_app';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import superjson from 'superjson';
import ErrorBoundary from '~/components/ErrorBoundary';
import { RootLayout } from '~/layouts/rootLayout';
import '~/styles/globals.css';

// ============================================================
// 			EXTEND NEXT TYPES
// ============================================================
export type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactElement;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

// ============================================================
// 			NEXT APP COMPONENT
// ============================================================
const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps: { session, ...pageProps } }) => {
	const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);

	return (
		<SessionProvider session={session as Session}>
			{getLayout(
				<ErrorBoundary>
					<Component {...pageProps} />
				</ErrorBoundary>,
			)}
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</SessionProvider>
	);
};

// ============================================================
// 			ENABLE TRPC
// ============================================================
export default withTRPC<AppRouter>({
	config({ ctx }) {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					maxBatchSize: 10,
				}),
			],
			headers() {
				if (ctx?.req) {
					return {
						...ctx.req.headers,
					};
				} else {
					return {};
				}
			},
			// https://react-query.tanstack.com/reference/QueryClient
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: process.env.NODE_ENV === 'production' ? 100 : 2000,
					},
				},
			},
		};
	},
	ssr: false, // https://trpc.io/docs/ssr
	// responseMeta () {}
})(App);

// ============================================================
// 			UTILS
// ============================================================s
const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; //No window = server side
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
