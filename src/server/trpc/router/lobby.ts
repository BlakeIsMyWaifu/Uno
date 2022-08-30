import { t } from '../utils/trpc'

export const lobbyRouter = t.router({
	createRoom: t.procedure
		.query(async () => {
			return await prisma?.user.count()
		})
})