import { action, withActions } from '@storybook/addon-actions'
import React, { ReactElement } from 'react'

import { CreateAlbum } from '.'

export default {
    title: 'Components',
    decorators: [withActions],
}

export const createAlbum = (): ReactElement => (
    <CreateAlbum onCreateAlbum={action('onCreateAlbum')} />
)
