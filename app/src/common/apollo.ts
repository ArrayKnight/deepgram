import { ApolloClient as Client, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import fetch from 'isomorphic-unfetch'
import { useMemo } from 'react'

import introspectionResults, { Maybe } from '~/graphql'
import type { ApolloCache, ApolloClient } from '~/types'
import { GRAPHQL_ENDPOINT, SSR } from './constants'
import { isUndefined } from '~/common/utilities'

let client: ApolloClient
let authId: Maybe<string>

const httpLink = createUploadLink({
    uri: SSR ? GRAPHQL_ENDPOINT : `${window.location.origin}/api/graphql`,
    fetch,
    headers: {
        'keep-alive': 'true',
    },
})
const authLink = setContext((_, { headers }) => ({
    headers: {
        ...((headers || {}) as Record<string, string>),
        authorization: `Bearer ${authId}`,
    },
}))

function createApolloClient(): ApolloClient {
    return new Client({
        ssrMode: SSR,
        ssrForceFetchDelay: 100,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            possibleTypes: introspectionResults.possibleTypes,
        }),
    })
}

export function getApolloClient(
    initialState?: ApolloCache,
    userId?: Maybe<string>,
): ApolloClient {
    if (!isUndefined(userId)) {
        authId = userId
    }

    const _client = !client ? createApolloClient() : client

    if (initialState) {
        _client.cache.restore(merge(initialState, _client.extract()))
    }

    if (SSR) {
        return _client
    }

    if (!client) {
        client = _client
    }

    return _client
}

export function useApollo(
    initialState?: ApolloCache,
    userId?: Maybe<string>,
): ApolloClient {
    return useMemo(() => getApolloClient(initialState, userId), [
        initialState,
        userId,
    ])
}
