import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { Session, unstable_getServerSession as getServerSession } from 'next-auth'
import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'server/db/client'

type CreateContextOptions = {
	session: Session | null;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createContextInner = async (opts: CreateContextOptions) => {
	return {
		session: opts.session,
		prisma
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
	const session = await getServerSession(opts.req, opts.res, nextAuthOptions)

	return await createContextInner({
		session
	})
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
