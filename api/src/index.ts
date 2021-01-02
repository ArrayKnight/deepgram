import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { v4 as uuid } from 'uuid'

import './databases'
import { AlbumResolver, TrackResolver, UserResolver } from './resolvers'

void (async () => {
    const schema = await buildSchema({
        resolvers: [AlbumResolver, TrackResolver, UserResolver],
        container: Container,
    })
    const server = new ApolloServer({
        schema,
        context: (ctx) => {
            const requestId = uuid()
            const container = Container.of(requestId)
            const context = {
                requestId,
                container,
                userId: ctx.req.headers.authorization,
            }

            container.set('context', context)

            return context
        },
    })
    const app = Express()

    server.applyMiddleware({ app })

    app.listen(process.env.SERVER_PORT, () =>
        console.log(`Server is running on ${process.env.GRAPHQL_ENDPOINT}`),
    )
})()
