import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import './databases'
import { AlbumResolver, TrackResolver, UserResolver } from './resolvers'

void (async () => {
    const schema = await buildSchema({
        resolvers: [AlbumResolver, TrackResolver, UserResolver],
        container: Container,
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
