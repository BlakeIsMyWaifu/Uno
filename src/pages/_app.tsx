import { MantineProvider } from '@mantine/core'
import Header from 'components/Header'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { trpc } from 'utils/trpc'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>UNO</title>
				<link rel='icon' href='/favicon.ico' />
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<SessionProvider session={pageProps.session}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'dark',
						primaryColor: 'violet'
					}}
				>
					<Header />
					<Component {...pageProps} />
				</MantineProvider>
			</SessionProvider>
		</>
	)
}

export default trpc.withTRPC(MyApp)