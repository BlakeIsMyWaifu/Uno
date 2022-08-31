import { authedProcedure, t } from '../utils/trpc'

export const lobbyRouter = t.router({
	createRoom: authedProcedure
		.query(async ({ ctx }) => {
			const lobby = await ctx.prisma.lobby.create({
				data: {}
			})
			const host = await ctx.prisma.player.create({
				data: {
					userId: ctx.session.user.id,
					lobbyId: lobby.id,
					isHost: true
				}
			})
			await ctx.prisma.lobby.update({
				where: {
					id: lobby.id
				},
				data: {
					players: {
						set: [host]
					}
				}
			})

			console.log(lobby)
			console.log(host)

			return lobby.id
		})
})