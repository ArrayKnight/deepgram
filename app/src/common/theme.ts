import { createGlobalStyle } from 'styled-components'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

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
    
    .MuiFab-root {
        box-shadow: none;
    }
    
    .MuiTableCell-head {
        font-weight: bold;
    }
`
