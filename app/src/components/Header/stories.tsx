import { action, withActions } from '@storybook/addon-actions'
import { boolean, object, withKnobs } from '@storybook/addon-knobs'
import { capitalCase } from 'change-case'
import { loremIpsum } from 'lorem-ipsum'
import React, { ReactElement } from 'react'
import { v4 as uuid } from 'uuid'

import { Header } from '.'

export default {
    title: 'Global',
    decorators: [withActions, withKnobs],
}

export const header = (): ReactElement => {
    const isSignedIn = boolean('isSignedIn', false)
    const user = object('user', {
        id: uuid(),
        name: capitalCase(loremIpsum({ units: 'words', count: 2 })),
        email: 'test@deepgram.com',
        image: 'https://picsum.photos/300/300',
    })

    return (
        <Header
            user={isSignedIn ? user : null}
            onSignOut={action('onSignOut')}
        />
    )
}
