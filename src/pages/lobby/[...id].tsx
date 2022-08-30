import { Box, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Lobby: NextPage = () => {

	const { query } = useRouter()

	return (
		<Box>
			<Text>{query.id}</Text>
		</Box>
	)
}

export default Lobby