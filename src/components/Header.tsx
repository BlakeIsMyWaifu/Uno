import { Avatar, Button, Group, Menu, Text, Title, UnstyledButton, createStyles } from '@mantine/core'
import { IconChevronDown, IconLogin, IconLogout } from '@tabler/icons'
import { signIn, signOut } from 'next-auth/react'
import { FC, useState } from 'react'
import { trpc } from 'utils/trpc'

interface StyleProps {
	opened: boolean;
}

const useStyles = createStyles((theme, { opened }: StyleProps) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
		borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
		marginBottom: 120,
		paddingBottom: theme.spacing.sm
	},

	user: {
		color: theme.white,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',
		marginRight: theme.spacing.xl,

		'&:hover': {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
				0.1
			)
		}
	},

	userActive: {
		backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1)
	},

	chevron: {
		transition: 'transform 150ms ease',
		transform: opened ? 'rotate(180deg)' : 'rotate(0deg)'
	}
}))

const Header: FC = () => {

	const { data, isLoading } = trpc.proxy.auth.getSession.useQuery()

	const { classes } = useStyles({ opened: false })

	if (isLoading) return null

	return (
		<div className={classes.header}>
			<Group position='apart'>
				<Title ml='xl'>UNO!</Title>

				{
					data
						? <Account />
						: <Button
							mr='xl'
							leftIcon={<IconLogin stroke={1.5} />}
							onClick={() => signIn()}
						>Login</Button>
				}
			</Group>
		</div>
	)
}

const Account: FC = () => {

	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { classes, theme, cx } = useStyles({ opened: userMenuOpened })

	const { data } = trpc.proxy.auth.getUserInfo.useQuery()

	return (
		<Menu
			width={260}
			position='bottom-end'
			transition='pop-top-right'
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
		>
			<Menu.Target>
				<UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })} >
					<Group spacing={7}>
						<Avatar
							src={data?.image}
							alt={data?.name ?? ''}
							radius='xl'
							size={20}
						/>
						<Text
							weight={500}
							size='sm'
							sx={{ lineHeight: 1, color: theme.white }}
							mr={3}
						>{data?.name ?? ''}</Text>
						<IconChevronDown
							size={12}
							stroke={1.5}
							className={classes.chevron}
						/>
					</Group>
				</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => signOut()}>Logout</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}

export default Header