import { gql } from '@apollo/client'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'

import { getApolloClient, SSR } from '~/common'
import { Albums, Header, PageHeader, UserRequired } from '~/components'
import { AlbumsQuery, useAlbumsQuery } from '~/graphql'
import { PageProps } from '~/types'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { userState } from '~/state'

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
    const [user, setUser] = useRecoilState(userState)
    const router = useRouter()

    function signOut(): void {
        setUser(null)
    }

    function goToAlbum({ id }: AlbumsQuery['albums'][number]): void {
        void router.push(`/albums/${id}`)
    }

    return (
        <UserRequired>
            <Head>
                <title>Albums | Deepgram</title>
            </Head>
            <Header user={user} onSignOut={signOut} />
            <PageHeader title="Albums">
                <Fab color="secondary" size="small">
                    <Add />
                </Fab>
            </PageHeader>
            <Albums albums={data?.albums || []} onAlbumClick={goToAlbum} />
        </UserRequired>
    )
}
