import { ApolloProvider } from '@apollo/client'
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
import type { AppProps } from 'next/app'
import React, { ReactElement, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { GlobalStyles, theme, useApollo } from '~/common'
import { SignUpIn } from '~/components'
import { useSignUpInMutation } from '~/graphql'
import { userState } from '~/state'
import type { PageProps } from '~/types'

function App({ Component, pageProps }: AppProps): ReactElement {
    const { initialApolloState, ...rest } = pageProps as PageProps
    const [loggedInUser, setUserState] = useRecoilState(userState)
    const client = useApollo(initialApolloState, loggedInUser?.id)
    const [signUpIn, { data }] = useSignUpInMutation()

    useEffect(() => {
        setUserState(data?.user ?? null)
    }, [setUserState, data])

    return (
        <ApolloProvider client={client}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <StyledThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalStyles />
                        <Component {...rest} />
                        <SignUpIn
                            user={loggedInUser}
                            onSubmit={(user) =>
                                signUpIn({ variables: { user } })
                            }
                        />
                    </StyledThemeProvider>
                </ThemeProvider>
            </StylesProvider>
        </ApolloProvider>
    )
}

export default function WrappedApp(props: AppProps): ReactElement {
    return (
        <RecoilRoot>
            <App {...props} />
        </RecoilRoot>
    )
}
