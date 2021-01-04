import { Maybe, User, UserInsertInput } from '~/graphql'

export interface SignUpInProps {
    user: Maybe<User>
    onSignIn: (email: string) => void
    onSignUp: (user: UserInsertInput) => void
}
