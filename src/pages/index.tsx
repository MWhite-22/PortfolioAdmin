import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '~/utils/trpcHooks';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);
	const { data: sessionData } = useSession();
	const secretMessage = trpc.useQuery(['auth.getSecretMessage']);

	const handleAuthButton = () => {
		sessionData ? void signOut() : void signIn();
	};

	return (
		<div className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
			<h1 className='text-center text-7xl font-extrabold'>INIT APP</h1>
			<div className='py-6 text-2xl'>{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div>
			<div>
				<p>Session Data: {sessionData ? `Logged in as ${sessionData.user?.name ?? ''}` : 'Not Logged In'}</p>
				<p>
					Secret Message:{' '}
					{secretMessage.status === 'loading'
						? 'Loading...'
						: secretMessage.status === 'error'
						? secretMessage.error.message
						: secretMessage.data}
				</p>
				<button className='rounded-md border-2 border-blue-500 px-4 py-2' onClick={handleAuthButton}>
					{sessionData ? 'Sign out' : 'Sign in'}
				</button>
			</div>
		</div>
	);
};

export default Home;
