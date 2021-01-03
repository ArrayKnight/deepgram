import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

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

    query Tracks {
        albums {
            id
            name
        }
        tracks {
            ...Track
        }
    }

    mutation CreateTrack($track: TrackInsertInput!) {
        insertTrack(track: $track) {
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
    const { data, refetch } = useTracksQuery({
        fetchPolicy: SSR ? 'cache-only' : 'cache-and-network',
    })
    const [createTrack] = useCreateTrackMutation({
        onCompleted: () => refetch(),
    })
    const router = useRouter()

    function onTrackClick({ id }: TracksQuery['tracks'][number]): void {
        void router.push(`/tracks/${id}`)
    }

    function onCreateTrack(track: TrackInsertInput): void {
        void createTrack({ variables: { track } })
    }

    return (
        <UserRequired>
            <Head>
                <title>Tracks | Deepgram</title>
            </Head>
            <Tracks
                albums={data?.albums || []}
                tracks={data?.tracks || []}
                onTrackClick={onTrackClick}
                onCreateTrack={onCreateTrack}
            />
        </UserRequired>
    )
}
