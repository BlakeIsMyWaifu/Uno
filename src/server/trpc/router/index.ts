import { t } from '../trpc'
import { authRouter } from './auth'
import { exampleRouter } from './example'

export const appRouter = t.router({
	example: exampleRouter,
	auth: authRouter
})

export type AppRouter = typeof appRouter;
