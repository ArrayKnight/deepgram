import Head from 'next/head'
import React, { ReactElement } from 'react'

import { UserRequired } from '~/components'

export default function TrackPage(): ReactElement {
    return (
        <UserRequired>
            <Head>
                <title>Track | Deepgram</title>
            </Head>
            Track Detail
        </UserRequired>
    )
}
