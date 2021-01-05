import { gql } from '@apollo/client'
import { saveAs } from 'file-saver'
import fetch from 'isomorphic-unfetch'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ReactElement, useEffect } from 'react'

import { getApolloClient, SSR } from '~/common'
import { Tracks, UserRequired } from '~/components'
import {
    TrackInsertInput,
    TracksDocument,
    TracksQuery,
    useCreateTrackMutation,
    useTracksQuery,
} from '~/graphql'
import { PageProps } from '~/types'

gql`
    fragment Track on Track {
        id
        createdAt
        assetName
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

    mutation CreateTrack($track: TrackInsertInput!) {
        insertTrack(track: $track) {
            ...Track
        }
    }

    query Tracks {
        albums {
            id
            name
        }
        tracks {
            ...Track
        }
    }
`

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const client = getApolloClient(undefined)

    await client.query<TracksQuery>({
        query: TracksDocument,
    })

    return {
        props: {
            initialApolloState: client.cache.extract(),
        },
    }
}

export default function TracksPage(): ReactElement {
    const { enqueueSnackbar } = useSnackbar()
    const {
        data,
        error: queryError,
        loading: queryLoading,
        refetch,
    } = useTracksQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
        nextFetchPolicy: 'network-only',
    })
    const [
        createTrack,
        { error: createError, loading: createLoading },
    ] = useCreateTrackMutation({
        onCompleted: () => refetch(),
    })
    const router = useRouter()

    function onTrackClick({ id }: TracksQuery['tracks'][number]): void {
        void router.push(`/tracks/${id}`)
    }

    function onCreateTrack(track: TrackInsertInput): void {
        void createTrack({ variables: { track } })
    }

    async function onDownloadTrack({
        assetName,
        fileName,
    }: TracksQuery['tracks'][number]): Promise<void> {
        enqueueSnackbar('Downloading...')

        try {
            const response = await fetch(`api/download/${assetName}`)

            saveAs(await response.blob(), fileName)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
                persist: true,
            })
        }
    }

    useEffect(() => {
        if (queryError || createError) {
            enqueueSnackbar(queryError || createError, {
                variant: 'error',
                persist: true,
            })
        }

        if (createLoading) {
            enqueueSnackbar('Creating...')
        }
    }, [enqueueSnackbar, queryError, createError, createLoading])

    return (
        <UserRequired>
            <Head>
                <title>Tracks | Deepgram</title>
            </Head>
            <Tracks
                loading={queryLoading}
                albums={data?.albums || []}
                tracks={data?.tracks || []}
                onTrackClick={onTrackClick}
                onCreateTrack={onCreateTrack}
                onDownloadTrack={onDownloadTrack}
            />
        </UserRequired>
    )
}
