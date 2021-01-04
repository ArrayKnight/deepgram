import { action, withActions } from '@storybook/addon-actions'
import { capitalCase, paramCase } from 'change-case'
import { loremIpsum } from 'lorem-ipsum'
import React, { ReactElement } from 'react'
import { v4 as uuid } from 'uuid'

import { randomInt } from '~/common'
import { Tracks, TracksProps } from '.'

export default {
    title: 'Sections',
    decorators: [withActions],
}

function createAlbums(): TracksProps['albums'] {
    return new Array(randomInt({ min: 3, max: 20 })).fill(null).map(() => ({
        __typename: 'Album',
        id: uuid(),
        name: capitalCase(loremIpsum({ units: 'words', count: 2 })),
    }))
}

function createTracks(): TracksProps['tracks'] {
    return new Array(randomInt({ min: 3, max: 20 })).fill(null).map(() => ({
        __typename: 'Track',
        id: uuid(),
        createdAt: new Date().toISOString(),
        assetName: `${paramCase(
            loremIpsum({
                units: 'words',
                count: randomInt({ min: 1, max: 3 }),
            }),
        )}.${loremIpsum({ units: 'words', count: 1 })}`,
        fileName: `${paramCase(
            loremIpsum({
                units: 'words',
                count: randomInt({ min: 1, max: 3 }),
            }),
        )}.${loremIpsum({ units: 'words', count: 1 })}`,
        fileSize: randomInt({ min: 1000, max: Number.MAX_SAFE_INTEGER }),
        duration: randomInt({ min: 10, max: 60 }),
        album: {
            __typename: 'Album',
            id: uuid(),
            name: capitalCase(
                loremIpsum({
                    units: 'words',
                    count: randomInt({ min: 1, max: 4 }),
                }),
            ),
        },
        uploadedBy: {
            __typename: 'User',
            id: uuid(),
            name: capitalCase(loremIpsum({ units: 'words', count: 2 })),
            email: `${paramCase(
                loremIpsum({
                    units: 'words',
                    count: randomInt({ min: 1, max: 3 }),
                }),
            )}@deepgram.com`,
        },
    }))
}

export const tracks = (): ReactElement => (
    <Tracks
        albums={createAlbums()}
        tracks={createTracks()}
        onTrackClick={action('onTrackClick')}
        onCreateTrack={action('onCreateTrack')}
        onDownloadTrack={action('onDownloadTrack')}
    />
)
