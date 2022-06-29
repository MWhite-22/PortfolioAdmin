import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary<T> extends Component<Props, State> {
	constructor(props: T) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}

	override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Use your own error logging service here
		console.error(`Caught an error at the error boundary: ${error.message}`);
		console.log({ error, errorInfo });
	}

	override render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Oops, there was an error!</h2>
					<button type='button' onClick={() => this.setState({ hasError: false })}>
						Try again?
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
