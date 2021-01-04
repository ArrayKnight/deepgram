import { gql } from '@apollo/client'

gql`
    fragment User on User {
        id
        name
        email
        image
    }

    mutation CreateUser($user: UserInsertInput!) {
        user: insertUser(user: $user) {
            ...User
        }
    }

    query User($email: String!) {
        user(email: $email) {
            ...User
        }
    }
`
