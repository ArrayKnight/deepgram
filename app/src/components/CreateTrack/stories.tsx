import { action, withActions } from '@storybook/addon-actions'
import { capitalCase } from 'change-case'
import { loremIpsum } from 'lorem-ipsum'
import React, { ReactElement } from 'react'
import { v4 as uuid } from 'uuid'

import { randomInt } from '~/common'
import { CreateTrack, CreateTracksProps } from '.'

export default {
    title: 'Components',
    decorators: [withActions],
}

function createAlbums(): CreateTracksProps['albums'] {
    return new Array(randomInt({ min: 3, max: 20 })).fill(null).map(() => ({
        __typename: 'Album',
        id: uuid(),
        name: capitalCase(loremIpsum({ units: 'words', count: 2 })),
    }))
}

export const createTrack = (): ReactElement => (
    <CreateTrack
        albums={createAlbums()}
        onCreateTrack={action('onCreateTrack')}
    />
)
