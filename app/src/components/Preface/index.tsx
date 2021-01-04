import React, { memo, ReactElement } from 'react'

import { Root, Meta } from './styled'
import { PrefaceProps } from './types'

export * as PrefaceStyled from './styled'
export * from './types'

export const Preface = memo(
    ({ children, title }: PrefaceProps): ReactElement => {
        return (
            <Root maxWidth="xl">
                <h1>{title}</h1>
                {children && <Meta>{children}</Meta>}
            </Root>
        )
    },
)

Preface.displayName = 'Preface'
