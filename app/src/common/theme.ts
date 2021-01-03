import { createGlobalStyle } from 'styled-components'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

export const theme = responsiveFontSizes(
    createMuiTheme({
        shape: {
            borderRadius: 0,
        },
    }),
)

export const GlobalStyles = createGlobalStyle`
    .MuiButton-root {
        text-transform: none;
    }
`
