import {
    Button,
    Divider as DividerBase,
    IconButton,
    Theme,
    Toolbar,
} from '@material-ui/core'
import styled, { css, ThemeProps } from 'styled-components'

export const NavBar = styled(Toolbar)`
    justify-content: space-between;
`

export const NavItems = styled.div`
    display: flex;
    flex-direction: row;
`

export const LogoButton = styled(Button)(
    ({ theme }: ThemeProps<Theme>) => css`
        margin-left: -${theme.spacing(1)}px;
    `,
)

export const Divider = styled(DividerBase)(
    ({ theme }: ThemeProps<Theme>) => css`
        margin-left: ${theme.spacing(2)}px;
    `,
)

export const NavItem = styled(Button)(
    ({ theme }: ThemeProps<Theme>) => css`
        margin: ${theme.spacing(1)}px 0 ${theme.spacing(1)}px
            ${theme.spacing(2)}px;
    `,
)

export const AvatarButton = styled(IconButton)`
    padding: 0;
`
