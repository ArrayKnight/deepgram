import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ReactElement, useEffect } from 'react'

import { getApolloClient, SSR } from '~/common'
import { Albums, UserRequired } from '~/components'
import {
    AlbumInsertInput,
    AlbumsDocument,
    AlbumsQuery,
    useAlbumsQuery,
    useCreateAlbumMutation,
} from '~/graphql'
import { PageProps } from '~/types'

gql`
    fragment Album on Album {
        id
        name
        createdAt
        createdBy {
            id
            name
            email
        }
        tracks {
            id
        }
    }

    mutation CreateAlbum($album: AlbumInsertInput!) {
        insertAlbum(album: $album) {
            ...Album
        }
    }

    query Albums {
        albums {
            ...Album
        }
    }
`

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const client = getApolloClient(undefined)

    await client.query<AlbumsQuery>({
        query: AlbumsDocument,
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
        },
    }
}

export default function AlbumsPage(): ReactElement {
    const { enqueueSnackbar } = useSnackbar()
    const {
        data,
        error: queryError,
        loading: queryLoading,
        refetch,
    } = useAlbumsQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
        nextFetchPolicy: 'network-only',
    })
    const [
        createAlbum,
        { error: createError, loading: createLoading },
    ] = useCreateAlbumMutation({
        onCompleted: () => refetch(),
    })
    const router = useRouter()

    function onAlbumClick({ id }: AlbumsQuery['albums'][number]): void {
        void router.push(`/albums/${id}`)
    }

    function onCreateAlbum(album: AlbumInsertInput): void {
        void createAlbum({ variables: { album } })
    }

    useEffect(() => {
        if (queryError || createError) {
            enqueueSnackbar(queryError || createError, { variant: 'error' })
        }

        if (queryLoading || createLoading) {
            enqueueSnackbar('Loading...')
        }
    }, [enqueueSnackbar, queryError, queryLoading, createError, createLoading])

    return (
        <UserRequired>
            <Head>
                <title>Albums | Deepgram</title>
            </Head>
            <Albums
                loading={queryLoading}
                albums={data?.albums || []}
                onAlbumClick={onAlbumClick}
                onCreateAlbum={onCreateAlbum}
            />
        </UserRequired>
    )
}
