import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import {
    createGlobalStyle,
    ThemeProvider as StyledThemeProvider,
} from 'styled-components'

import { GlobalStyles, theme } from '~/common'

const Overrides = createGlobalStyle`
    body {
        padding: 0 !important;
    }
`

export const decorators = [
    withNextRouter,
    (Story) => (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StyledThemeProvider theme={theme}>
                    <CssBaseline />
                    <Overrides />
                    <GlobalStyles />
                    <Story />
                </StyledThemeProvider>
            </ThemeProvider>
        </StylesProvider>
    ),
]

export const parameters = {
    options: {
        storySort: {
            order: [
                'Global',
                [
                    'Colors',
                    'Fonts',
                    'Typography',
                    'Button',
                    'Link',
                    'Header',
                    'Footer',
                ],
                'Components',
                'Sections',
                'Pages',
            ],
        },
    },
}
