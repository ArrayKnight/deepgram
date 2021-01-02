import { atom } from 'recoil'

import { Maybe, User } from '~/graphql'

export const userState = atom<Maybe<User>>({
    key: 'user',
    default: null,
})
