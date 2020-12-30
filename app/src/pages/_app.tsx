import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import React, { FunctionComponent, ReactElement } from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme, useApollo } from '~/common'
import { SignIn } from '~/components'
import { userIdState } from '~/state'
import type { PageProps } from '~/types'

function withRecoil(Component: FunctionComponent) {
    return function RecoilWrappedComponent(props) {
        return (
            <RecoilRoot>
                <Component {...props} />
            </RecoilRoot>
        )
    }
}

function App({ Component, pageProps }: AppProps): ReactElement {
    const { initialApolloState, ...rest } = pageProps as PageProps
    const userId = useRecoilValue(userIdState)
    const client = useApollo(initialApolloState, userId)

    return (
        <ApolloProvider client={client}>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <Component {...rest} />
                {!userId && <SignIn />}
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default withRecoil(App)
