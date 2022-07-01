import { SunIcon, MoonIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDarkMode } from '~/hooks/useDarkMode';

interface Props {
	children: React.ReactNode;
}

export const RootLayout: React.FC<Props> = ({ children }) => {
	const [darkMode, toggleDarkMode] = useDarkMode();

	return (
		<>
			<Head>
				<title>MW - Portfolio</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex min-h-screen flex-col'>
				<header className='flex items-center justify-between border-b-2 p-4 print:hidden'>
					<h1>Root Layout Header</h1>
					<button
						title='DarkModeToggle'
						className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-400 hover:cursor-pointer hover:bg-slate-500 dark:bg-yellow-300 dark:text-slate-800 dark:hover:bg-yellow-100'
						onClick={toggleDarkMode}
					>
						{darkMode ? <SunIcon className='p-1' /> : <MoonIcon className='p-1' />}
					</button>
				</header>

				<main className='flex-grow p-4'>{children}</main>

				<footer className='flex  flex-col border-t-2 bg-slate-200 p-4 text-center dark:bg-slate-700'>
					<div className='mb-2 flex-grow print:hidden'>
						<h5>OTHER CONTENT TO GO DOWN HERE...</h5>
					</div>
					<p className='text-center text-xxs uppercase'>
						Copyright &copy; Michael J White 2020 - {new Date().getFullYear()}{' '}
					</p>
				</footer>
			</div>

			{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />}
		</>
	);
};
