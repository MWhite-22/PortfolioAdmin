import type { NextPage } from 'next';
import { TextInput } from '~/components/forms/input';
import { trpc } from '~/utils/trpcHooks';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

	return (
		<div className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
			<h1 className='text-center text-7xl font-extrabold'>INIT APP</h1>
			<div className='py-6 text-2xl'>{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div>
			<form className='w-full'>
				<TextInput name='test' label='Test Label' required />
				<TextInput name='test2' label='Longer Test Label' required />
				<TextInput name='test3' label='Longer Test Label' />
				<TextInput name='test4' label='Disabled Label' disabled />
				<TextInput name='test5' label='Disabled With Value' disabled value='Input Value' />
			</form>
		</div>
	);
};

export default Home;
