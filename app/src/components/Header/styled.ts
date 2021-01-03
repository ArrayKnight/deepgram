import { Button, IconButton, Theme, Toolbar } from '@material-ui/core'
import styled, { css, ThemeProps } from 'styled-components'

export const LogoButton = styled(Button)(
    ({ theme }: ThemeProps<Theme>) => css`
        margin-left: -${theme.spacing(1)}px;
    `,
)

export const AvatarButton = styled(IconButton)`
    padding: 0;
`

export const NavBar = styled(Toolbar)`
    justify-content: space-between;
`
