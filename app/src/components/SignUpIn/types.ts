import { Maybe, User, UserUpsertInput } from '~/graphql'

export interface SignUpInProps {
    user: Maybe<User>
    onSubmit: (user: UserUpsertInput) => void
}
