import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme, useApollo } from '~/common'
import { SignIn } from '~/components'
import { userIdState } from '~/state'
import type { PageProps } from '~/types'

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

export default function Wrapped(props: AppProps): ReactElement {
    return (
        <RecoilRoot>
            <App {...props} />
        </RecoilRoot>
    )
}
