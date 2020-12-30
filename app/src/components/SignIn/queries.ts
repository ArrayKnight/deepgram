import { gql } from '@apollo/client'

gql`
    mutation SignUpIn($user: UserUpsertInput!) {
        user: upsertUser(user: $user) {
            id
        }
    }
`
