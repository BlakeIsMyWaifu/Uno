import { Box, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {useEffect} from 'react'
import { trpc } from 'utils/trpc'

const Lobby: NextPage = () => {

	const { query } = useRouter()
	const test = trpc.proxy.lobby.createRoom.useQuery()

	useEffect(() => {
		console.log(test)
	}, [test])

	return (
		<Box>
			<Text>{query.id}</Text>
			<Text>{test.data ?? 'ERROR!'}</Text>
		</Box>
	)
}

export default Lobby