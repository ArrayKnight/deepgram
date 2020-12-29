import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { TodoResolver } from './resolvers'

async function main(): Promise<void> {
    const schema = await buildSchema({
        resolvers: [TodoResolver],
    })
    const server = new ApolloServer({
        schema,
    })
    const app = Express()

    server.applyMiddleware({ app })

    app.listen(process.env.SERVER_PORT, () =>
        console.log(
            `Server is running on http://localhost:${process.env.SERVER_PORT}/graphql`,
        ),
    )
}

void main()
