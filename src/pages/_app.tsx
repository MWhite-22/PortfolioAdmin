import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { AppRouter } from '~/server/router/_app';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import ErrorBoundary from '~/components/ErrorBoundary';
import { RootLayout } from '~/layouts/rootLayout';
import '~/styles/globals.css';

// import { SessionProvider } from 'next-auth/react'; //DEV: add back nextAuth

// FUTURE: https://nextjs.org/docs/advanced-features/measuring-performance

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
// const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps: { session, ...pageProps } }) => { //DEV: add back nextAuth
const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);

	return getLayout(
		<ErrorBoundary>
			{/* <SessionProvider session={session}> */}
			<Component {...pageProps} />
			{/* </SessionProvider> */}
		</ErrorBoundary>,
	);
};

// ============================================================
// 			ENABLE TRPC
// ============================================================
export default withTRPC<AppRouter>({
	config() {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			// https://react-query.tanstack.com/reference/QueryClient
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: 60,
					},
				},
			},
		};
	},
	ssr: false, // https://trpc.io/docs/ssr
})(MyApp);

// ============================================================
// 			UTILS
// ============================================================s
const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; //No window = server side
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
