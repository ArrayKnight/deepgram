import { atom } from 'recoil'

import { Maybe } from '~/graphql'

export const userIdState = atom<Maybe<string>>({
    key: 'userId',
    default: null,
})
