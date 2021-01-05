import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'

import { getApolloClient, SSR } from '~/common'
import { UserRequired } from '~/components'
import { AlbumDocument, AlbumQuery, useAlbumQuery } from '~/graphql'
import { PageProps } from '~/types'
import { Container } from '@material-ui/core'

gql`
    query Album($id: String!) {
        album(id: $id) {
            id
            name
            createdAt
            createdBy {
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

    await client.query<AlbumQuery>({
        query: AlbumDocument,
        variables: { id },
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
            id,
        },
    }
}

export default function AlbumPage({
    id,
}: PageProps<{ id: string }>): ReactElement {
    const { data } = useAlbumQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
        nextFetchPolicy: 'network-only',
        variables: { id },
    })

    return (
        <UserRequired>
            <Head>
                <title>Album | Deepgram</title>
            </Head>
            <Container maxWidth="xl">
                <h1>Album Detail</h1>
                <pre>
                    <code>{JSON.stringify(data ?? null)}</code>
                </pre>
            </Container>
        </UserRequired>
    )
}
