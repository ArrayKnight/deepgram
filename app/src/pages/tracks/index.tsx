import Head from 'next/head'
import React, { ReactElement } from 'react'

import { UserRequired } from '~/components'

export default function TracksPage(): ReactElement {
    return (
        <UserRequired>
            <Head>
                <title>Tracks | Deepgram</title>
            </Head>
            Tracks List
        </UserRequired>
    )
}
