import { authedProcedure, t } from '../utils/trpc'

export const authRouter = t.router({
	getSession: t.procedure.query(({ ctx }) => {
		return ctx.session
	}),
	getUserInfo: authedProcedure.query(async ({ ctx }) => {
		return await prisma?.user.findUnique({
			where: {
				id: ctx.session.user.id
			},
			select: {
				name: true,
				image: true
			}
		})
	})
})
