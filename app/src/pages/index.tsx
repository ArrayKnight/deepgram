import Head from 'next/head'
import React, { ReactElement } from 'react'

import { UserRequired } from '~/components'

export default function HomePage(): ReactElement {
    return (
        <UserRequired>
            <Head>
                <title>Dashboard | Deepgram</title>
            </Head>
            Hello World!
        </UserRequired>
    )
}
