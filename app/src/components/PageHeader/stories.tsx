import { text, withKnobs } from '@storybook/addon-knobs'
import React, { ReactElement } from 'react'

import { PageHeader } from '.'

export default {
    title: 'Components',
    decorators: [withKnobs],
}

export const pageHeader = (): ReactElement => (
    <PageHeader title={text('title', 'Hello World')}>
        {text('children', 'Optional content')}
    </PageHeader>
)
