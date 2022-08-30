import { Button, Container, Stack } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { trpc } from 'utils/trpc'

const Home: NextPage = () => {

	const { data, isLoading } = trpc.proxy.auth.getSession.useQuery()

	if (isLoading) return null

	return (
		<Container>
			<Stack>
				{
					data
						? <>
							<Link href={'/lobby/1'} passHref>
								<Button component='a'>Create Room</Button>
							</Link>
							<Button>Join Room</Button>
						</>
						: <>
							<Button disabled>Create Room</Button>
							<Button disabled>Join Room</Button>
						</>
				}
			</Stack>
		</Container>
	)
}

export default Home