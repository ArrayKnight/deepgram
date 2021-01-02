import { ApolloProvider } from '@apollo/client'
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
import type { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { GlobalStyles, theme, useApollo } from '~/common'
import { userState } from '~/state'
import type { PageProps } from '~/types'

function App({ Component, pageProps }: AppProps): ReactElement {
    const { initialApolloState, ...rest } = pageProps as PageProps
    const user = useRecoilValue(userState)
    const client = useApollo(initialApolloState, user?.id)

    return (
        <ApolloProvider client={client}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <StyledThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalStyles />
                        <Component {...rest} />
                    </StyledThemeProvider>
                </ThemeProvider>
            </StylesProvider>
        </ApolloProvider>
    )
}

export default function RecoilWrappedApp(props: AppProps): ReactElement {
    return (
        <RecoilRoot>
            <App {...props} />
        </RecoilRoot>
    )
}
