import { action, withActions } from '@storybook/addon-actions'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { capitalCase, paramCase } from 'change-case'
import { loremIpsum } from 'lorem-ipsum'
import React, { ReactElement } from 'react'
import { v4 as uuid } from 'uuid'

import { Albums, AlbumsProps } from '.'
import { randomInt } from '~/common'

export default {
    title: 'Sections',
    decorators: [withActions, withKnobs],
}

function createAlbums(): AlbumsProps['albums'] {
    return new Array(randomInt({ min: 3, max: 20 })).fill(null).map(() => ({
        __typename: 'Album',
        id: uuid(),
        name: capitalCase(loremIpsum({ units: 'words', count: 2 })),
        createdAt: new Date().toISOString(),
        createdBy: {
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
        tracks: new Array(randomInt())
            .fill(null)
            .map(() => ({ __typename: 'Track', id: uuid() })),
    }))
}

export const albums = (): ReactElement => (
    <Albums
        loading={boolean('loading', false)}
        albums={createAlbums()}
        onAlbumClick={action('onAlbumClick')}
        onCreateAlbum={action('onCreateAlbum')}
    />
)
