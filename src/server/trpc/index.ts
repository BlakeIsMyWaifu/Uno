import { authRouter } from './router/auth'
import { exampleRouter } from './router/example'
import { lobbyRouter } from './router/lobby'
import { t } from './utils/trpc'

export const appRouter = t.router({
	example: exampleRouter,
	auth: authRouter,
	lobby: lobbyRouter
})

export type AppRouter = typeof appRouter;
