import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'

import { getApolloClient, SSR } from '~/common'
import { UserRequired } from '~/components'
import { TracksQuery, useTracksQuery } from '~/graphql'
import { PageProps } from '~/types'

const TracksGql = gql`
    query Tracks {
        tracks {
            id
            createdAt
            fileName
            fileSize
            duration
            album {
                id
                name
            }
            uploadedBy {
                id
                name
                email
            }
        }
    }
`

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const client = getApolloClient(undefined)

    await client.query<TracksQuery>({
        query: TracksGql,
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
        },
    }
}

export default function TracksPage(): ReactElement {
    const { data } = useTracksQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
    })

    return (
        <UserRequired>
            <Head>
                <title>Tracks | Deepgram</title>
            </Head>
            Tracks List
            {JSON.stringify(data ?? null)}
        </UserRequired>
    )
}
