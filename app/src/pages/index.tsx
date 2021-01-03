import { Container } from '@material-ui/core'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useRecoilState } from 'recoil'

import { Header, UserRequired } from '~/components'
import { userState } from '~/state'

export default function HomePage(): ReactElement {
    const [user, setUser] = useRecoilState(userState)

    function signOut(): void {
        setUser(null)
    }

    return (
        <UserRequired>
            <Head>
                <title>Dashboard | Deepgram</title>
            </Head>
            <Header user={user} onSignOut={signOut} />
            <Container maxWidth="xl">Hello World!</Container>
        </UserRequired>
    )
}
