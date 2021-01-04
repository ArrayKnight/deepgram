import {
    AppBar,
    Avatar,
    Container,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core'
import { ContactSupport } from '@material-ui/icons'
import React, { memo, MouseEvent, ReactElement, useState } from 'react'

import {
    NavBar,
    NavItems,
    LogoButton,
    Divider,
    NavItem,
    AvatarButton,
} from './styled'
import { HeaderProps } from './types'
import { capitalCase } from 'change-case'

export * as HeaderStyled from './styled'
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

        function signOut(): void {
            closeUserMenu()
            onSignOut()
        }

        return (
            <AppBar color="default" elevation={0} position="static">
                <Container maxWidth="xl">
                    <NavBar disableGutters={true}>
                        <NavItems>
                            <LogoButton href="/">
                                <ContactSupport fontSize="large" />
                                <Typography noWrap={true} variant="h5">
                                    Deepgram
                                </Typography>
                            </LogoButton>
                            <Divider orientation="vertical" flexItem />
                            <NavItem href="/albums">Albums</NavItem>
                            <NavItem href="/tracks">Tracks</NavItem>
                        </NavItems>
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
                                    <MenuItem onClick={signOut}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </NavBar>
                </Container>
            </AppBar>
        )
    },
)

Header.displayName = 'Header'
