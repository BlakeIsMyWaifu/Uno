import { authRouter } from './router/auth'
import { exampleRouter } from './router/example'
import { t } from './utils/trpc'

export const appRouter = t.router({
	example: exampleRouter,
	auth: authRouter
})

export type AppRouter = typeof appRouter;
