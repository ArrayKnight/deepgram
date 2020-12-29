import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import './databases'
import { TodoResolver } from './resolvers'

void (async () => {
    const schema = await buildSchema({
        resolvers: [TodoResolver],
    })
    const server = new ApolloServer({
        schema,
    })
    const app = Express()

    server.applyMiddleware({ app })

    app.listen(process.env.SERVER_PORT, () =>
        console.log(`Server is running on ${process.env.GRAPHQL_ENDPOINT}`),
    )
})()
