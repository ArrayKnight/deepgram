import { Maybe, User } from '~/graphql'

export interface HeaderProps {
    user: Maybe<Omit<User, '__typename'>>
    onSignOut: () => void
}
