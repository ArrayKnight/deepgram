import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'

import { getApolloClient, SSR } from '~/common'
import { UserRequired } from '~/components'
import { AlbumsQuery, useAlbumsQuery } from '~/graphql'
import { PageProps } from '~/types'

const AlbumsGql = gql`
    query Albums {
        albums {
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const client = getApolloClient(undefined)

    await client.query<AlbumsQuery>({
        query: AlbumsGql,
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
        },
    }
}

export default function AlbumsPage(): ReactElement {
    const { data } = useAlbumsQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
    })

    return (
        <UserRequired>
            <Head>
                <title>Albums | Deepgram</title>
            </Head>
            Albums List
            {JSON.stringify(data ?? null)}
        </UserRequired>
    )
}
