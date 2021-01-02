import { action, withActions } from '@storybook/addon-actions'
import React, { ReactElement } from 'react'

import { SignUpIn } from '.'

export default {
    title: 'Components',
    decorators: [withActions],
}

export const signUpIn = (): ReactElement => (
    <SignUpIn user={null} onSubmit={action('onSubmit')} />
)
