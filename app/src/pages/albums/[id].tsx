import Head from 'next/head'
import React, { ReactElement } from 'react'

import { UserRequired } from '~/components'

export default function AlbumPage(): ReactElement {
    return (
        <UserRequired>
            <Head>
                <title>Album | Deepgram</title>
            </Head>
            Album Detail
        </UserRequired>
    )
}
