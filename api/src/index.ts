import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import path from 'path'
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
        schema,
        uploads: false, // Out of date version of graphql-upload fails
    })
    const app = Express()

    app.use('/assets', Express.static(path.join(__dirname, 'assets')))

    app.get('/download/:asset', (req, res) => {
        res.download(path.join(__dirname, `assets/${req.params.asset}`))
    })

    app.use(
        graphqlUploadExpress({
            maxFileSize: 5e6, // 5MB
            maxFiles: 1,
        }),
    )

    server.applyMiddleware({ app })

    app.listen(process.env.SERVER_PORT, () =>
        console.log(`Server is running on ${process.env.GRAPHQL_ENDPOINT}`),
    )
})()
