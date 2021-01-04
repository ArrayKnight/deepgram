import { text, withKnobs } from '@storybook/addon-knobs'
import React, { ReactElement } from 'react'

import { Preface } from '.'

export default {
    title: 'Components',
    decorators: [withKnobs],
}

export const pageHeader = (): ReactElement => (
    <Preface title={text('title', 'Hello World')}>
        {text('children', 'Optional content')}
    </Preface>
)
