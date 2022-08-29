import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { trpc } from '../utils/trpc'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<SessionProvider session={pageProps.session}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark'
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
