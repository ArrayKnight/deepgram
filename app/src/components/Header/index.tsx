import {
    AppBar,
    Avatar,
    Button,
    Container,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { ContactSupport } from '@material-ui/icons'
import React, { memo, MouseEvent, ReactElement, useState } from 'react'

import { AvatarButton, Space } from './styled'
import { HeaderProps } from './types'
import { capitalCase } from 'change-case'

export * from './styled'
export * from './types'

export const Header = memo(
    ({ user, onSignOut }: HeaderProps): ReactElement => {
        const [
            userMenuAnchor,
            setUserMenuAnchor,
        ] = useState<HTMLButtonElement | null>(null)

        function openUserMenu(event: MouseEvent<HTMLButtonElement>): void {
            setUserMenuAnchor(event.currentTarget)
        }

        function closeUserMenu(): void {
            setUserMenuAnchor(null)
        }

        return (
            <AppBar color="default" elevation={0} position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Button href="/">
                            <ContactSupport fontSize="large" />
                            <Typography noWrap={true} variant="h5">
                                Deepgram
                            </Typography>
                        </Button>
                        <Space />
                        {user && (
                            <>
                                <AvatarButton onClick={openUserMenu}>
                                    <Avatar
                                        alt={user.name || user.email}
                                        src={user.image ?? undefined}
                                    >
                                        {capitalCase(
                                            user.name?.substr(0, 1) ||
                                                user.email?.substr(0, 1),
                                        )}
                                    </Avatar>
                                </AvatarButton>
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={!!userMenuAnchor}
                                    onClose={closeUserMenu}
                                >
                                    <MenuItem onClick={onSignOut}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        )
    },
)

Header.displayName = 'Header'
