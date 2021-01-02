import Head from 'next/head'
import React, { ReactElement } from 'react'

import { UserRequired } from '~/components'

export default function AlbumsPage(): ReactElement {
    return (
        <UserRequired>
            <Head>
                <title>Albums | Deepgram</title>
            </Head>
            Albums List
        </UserRequired>
    )
}
