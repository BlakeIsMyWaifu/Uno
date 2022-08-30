import { Box, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'

const Lobby: NextPage = () => {

	const { query } = useRouter()
	const test = trpc.proxy.lobby.createRoom.useQuery()

	return (
		<Box>
			<Text>{query.id}</Text>
			<Text>{test.data}</Text>
		</Box>
	)
}

export default Lobby