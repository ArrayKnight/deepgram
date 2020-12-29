import { gql } from '@apollo/client'
import React, { ReactElement } from 'react'

export const TodosGql = gql`
    query Todos {
        todos {
            id
            title
        }
    }
`

export default function TodosPage(): ReactElement | null {
    return <>Hello World!</>
}
