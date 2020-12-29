import { createGlobalStyle } from 'styled-components'

import { BreakpointKey } from '~/types'

export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT

export const SSR = typeof window === 'undefined'

export const SSR_BREAKPOINT: BreakpointKey = 'xl'

export const theme = {}

export const GlobalStyles = createGlobalStyle``
