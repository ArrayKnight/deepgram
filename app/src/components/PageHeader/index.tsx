import React, { memo, ReactElement } from 'react'

import { Root, Meta } from './styled'
import { PageHeaderProps } from './types'

export * as PageHeaderStyled from './styled'
export * from './types'

export const PageHeader = memo(
    ({ children, title }: PageHeaderProps): ReactElement => {
        return (
            <Root maxWidth="xl">
                <h1>{title}</h1>
                {children && <Meta>{children}</Meta>}
            </Root>
        )
    },
)

PageHeader.displayName = 'PageHeader'
