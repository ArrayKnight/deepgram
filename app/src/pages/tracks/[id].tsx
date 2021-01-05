import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'

import { getApolloClient, SSR } from '~/common'
import { UserRequired } from '~/components'
import { TrackDocument, TrackQuery, useTrackQuery } from '~/graphql'
import { PageProps } from '~/types'
import { Container } from '@material-ui/core'

gql`
    query Track($id: String!) {
        track(id: $id) {
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<
    PageProps<{ id: string }>,
    { id: string }
> = async (context) => {
    const client = getApolloClient(undefined)
    const id = context.params?.id || ''

    await client.query<TrackQuery>({
        query: TrackDocument,
        variables: { id },
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
            id,
        },
    }
}

export default function TrackPage({
    id,
}: PageProps<{ id: string }>): ReactElement {
    const { data } = useTrackQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
        nextFetchPolicy: 'network-only',
        variables: { id },
    })

    return (
        <UserRequired>
            <Head>
                <title>Track | Deepgram</title>
            </Head>
            <Container maxWidth="xl">
                <h1>Track Detail</h1>
                <pre>
                    <code>{JSON.stringify(data ?? null)}</code>
                </pre>
            </Container>
        </UserRequired>
    )
}
