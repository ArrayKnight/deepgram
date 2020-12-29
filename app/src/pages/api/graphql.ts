import { createProxyMiddleware } from 'http-proxy-middleware'

import { GRAPHQL_ENDPOINT } from '~/common'

export default createProxyMiddleware({
    target: GRAPHQL_ENDPOINT,
    changeOrigin: true,
    pathRewrite: { '.*': '' },
    xfwd: true,
})

export const config = {
    api: {
        bodyParser: false, // enable POST requests
        externalResolver: true, // hide warning message
    },
}
