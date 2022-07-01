import type { Except } from 'type-fest';

type Props = Except<React.HTMLProps<HTMLInputElement>, 'id' | 'placeholder'> & {
	name: string;
	label: string;
	type?: 'text' | 'password' | 'email';
	status?: HelperStatus;
};

type HelperStatus = 'error' | 'success' | 'info';

export const TextInput: React.FC<Props> = ({
	name,
	label,
	required,
	type = 'text',
	className = '',
	status = 'info',
	...rest
}) => {
	const statusColors: Record<HelperStatus, string> = {
		error: 'text-rose-500',
		success: 'text-emerald-500',
		info: 'text-gray-500',
	};

	return (
		<div className={`relative mt-6 w-full ${className}`}>
			<input
				id={name}
				type={type}
				name={name}
				placeholder={label}
				required={required}
				className='peer h-10 w-full rounded-t-lg rounded-b border border-b-2 bg-transparent px-2 placeholder-transparent 
				focus:outline-none 
				enabled:border-gray-300 
				hover:enabled:border-b-primary/50 
				focus:enabled:border-b-primary 
				disabled:cursor-not-allowed 
				disabled:border-stone-400
				disabled:text-stone-400
				dark:border-gray-700 
				dark:disabled:text-stone-600'
				{...rest}
			/>
			<label
				htmlFor={name}
				className='pointer-events-none absolute left-4 -top-2 select-none text-xs
				peer-disabled:[&>*]:text-stone-400 
				dark:peer-disabled:[&>*]:text-stone-600 
				peer-placeholder-shown:[&_.floatingLabelBg]:left-1/2
				peer-placeholder-shown:[&_.floatingLabelBg]:right-1/2 
				peer-focus:[&_.floatingLabelBg]:-left-1
				peer-focus:[&_.floatingLabelBg]:-right-1 
				peer-focus:[&_.floatingLabelBg]:delay-[0ms] 
				peer-placeholder-shown:[&_.floatingLabelText]:top-4
				peer-placeholder-shown:[&_.floatingLabelText]:text-sm
				peer-focus:[&_.floatingLabelText]:top-0
				peer-focus:[&_.floatingLabelText]:text-xs
				peer-focus:[&_.floatingLabelText]:delay-200
				'
			>
				<span
					className='floatingLabelBg absolute -left-1 -right-1 h-full bg-body-light transition-[left,_right] delay-200 dark:bg-body-dark'
					aria-hidden='true'
				/>
				<span className='floatingLabelText relative transition-all'>{label}</span>
			</label>
			<span className='absolute -top-2 right-3 bg-body-light px-1 text-xs text-red-500 peer-optional:hidden dark:bg-body-dark'>
				*Req
			</span>
			<div className={`invisible px-1 text-sm ${statusColors[status]}`}>
				<p>Helper text for success and for error</p>
			</div>
		</div>
	);
};

//REVIEW: Make input transitions into custom animation? Might prevent bg-color glitch on dark mode switch?

// absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-400 transition-all
// before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-slate-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-slate-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500' />
