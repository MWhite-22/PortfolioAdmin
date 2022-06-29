import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';

interface Props {
	children: React.ReactNode;
}

export const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Head>
				<title>MW - Portfolio</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex min-h-screen flex-col'>
				<header className='flex border-b-2 p-4'>
					<h1>Root Layout Header</h1>
				</header>

				<main className='flex-grow p-4'>{children}</main>

				<footer className='border-t-2 p-4 text-center'>
					<h4>Root Layout Footer</h4>
				</footer>
			</div>

			{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />}
		</>
	);
};
