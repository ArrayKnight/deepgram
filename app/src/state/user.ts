import { atom, selector } from 'recoil'

import { SSR } from '~/common'
import { Maybe, User } from '~/graphql'

const _userState = atom<Maybe<User>>({
    key: '_user',
    default: null,
})

export const userState = selector<Maybe<User>>({
    key: 'user',
    get: ({ get }) => {
        const internal = get(_userState)

        if (SSR) {
            return internal
        }

        const stored = localStorage.getItem('deepgram-user')

        if (!stored) {
            return internal
        }

        return JSON.parse(stored)
    },
    set: ({ get, set }, value) => {
        if (get(_userState) === value) {
            return
        }

        set(_userState, value)

        if (!SSR) {
            localStorage.setItem('deepgram-user', JSON.stringify(value))
        }
    },
})
