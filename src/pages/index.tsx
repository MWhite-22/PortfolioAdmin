import type { NextPage } from 'next';
import { trpc } from '~/utils/trpcHooks';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	return (
		<div className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
			<h1 className='text-center text-7xl font-extrabold'>INIT APP</h1>
			<div className='py-6 text-2xl'>{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div>
		</div>
	);
};

export default Home;
