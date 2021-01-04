import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import type { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { GlobalStyles, theme, useApollo } from '~/common'
import { Header } from '~/components'
import { userState } from '~/state'
import type { PageProps } from '~/types'

function App({ Component, pageProps }: AppProps): ReactElement {
    const { initialApolloState, ...rest } = pageProps as PageProps
    const [user, setUser] = useRecoilState(userState)
    const client = useApollo(initialApolloState, user?.id)

    function signOut(): void {
        setUser(null)
    }

    return (
        <ApolloProvider client={client}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <StyledThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalStyles />
                        <Header user={user} onSignOut={signOut} />
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
