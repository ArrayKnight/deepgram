import { gql } from '@apollo/client'

gql`
    mutation UpsertUser($user: UserUpsertInput!) {
        user: upsertUser(user: $user) {
            id
            name
            email
            image
        }
    }
`
