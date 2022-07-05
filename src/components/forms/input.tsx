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
		<div className={`relative my-6 w-full ${className}`}>
			<input
				id={name}
				type={type}
				name={name}
				placeholder={label}
				required={required}
				className='peer h-10 w-full rounded-t-lg rounded-b border border-b-2 bg-transparent px-3 placeholder-transparent 
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
				className='pointer-events-none absolute left-3 -top-2 select-none text-xs
				peer-disabled:[&>*]:text-stone-400 
				dark:peer-disabled:[&>*]:text-stone-600 
				peer-placeholder-shown:[&_.floatingLabelBg]:left-1/2
				peer-placeholder-shown:[&_.floatingLabelBg]:right-1/2 
				peer-focus:[&_.floatingLabelBg]:-left-1
				peer-focus:[&_.floatingLabelBg]:-right-1 
				peer-focus:[&_.floatingLabelBg]:delay-[0ms] 
				peer-placeholder-shown:[&_.floatingLabelText]:top-4
				peer-placeholder-shown:[&_.floatingLabelText]:text-base
				peer-focus:[&_.floatingLabelText]:top-0
				peer-focus:[&_.floatingLabelText]:text-xs
				peer-focus:[&_.floatingLabelText]:delay-200
				'
			>
				<span
					className='floatingLabelBg absolute -left-1 -right-1 h-full bg-body-light 
					transition-[left,_right,_color,_background-color] 
					delay-[200ms,_200ms,_0ms,_0ms] 
					dark:bg-body-dark'
					aria-hidden='true'
				/>
				<span className='floatingLabelText relative transition-[top,_font-size,_line-height]'>{label}</span>
			</label>
			<span className='pointer-events-none absolute -top-2 right-3 select-none bg-body-light px-1 text-xs text-red-500 transition-colors peer-optional:hidden dark:bg-body-dark'>
				*Req
			</span>
			<div className={`invisible px-1 text-sm ${statusColors[status]}`}>
				<p>Helper text for success and for error</p>
			</div>
		</div>
	);
};
