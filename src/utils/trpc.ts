import { httpBatchLink, loggerLink } from '@trpc/client'
import { setupTRPC } from '@trpc/next'
import type { AppRouter } from 'server/trpc'
import superjson from 'superjson'

const getBaseUrl = (): string => {
	if (typeof window !== 'undefined') return ''
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
	return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = setupTRPC<AppRouter>({
	config() {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: opts =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error)
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`
				})
			]
		}
	},
	ssr: false
})
