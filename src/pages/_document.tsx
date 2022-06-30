import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { darkModeScript } from '~/hooks/useDarkMode';

export default class MyDocument extends Document {
	static override async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		return await Document.getInitialProps(ctx);
	}

	override render(): JSX.Element {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<Main />
					<NextScript />
					<Script
						id='DarkModeScript'
						strategy='beforeInteractive'
						dangerouslySetInnerHTML={{ __html: darkModeScript }}
					/>
				</body>
			</Html>
		);
	}
}
