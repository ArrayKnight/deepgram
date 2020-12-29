module.exports = {
    env: {
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    },
    redirects: async () => [
        { source: '/', destination: '/todos', permanent: false },
    ],
    rewrites: async () => [
        {
            source: '/:path*',
            destination: '/:path*',
        },
        {
            source: '/:path*',
            destination: '/api/proxy/:path*',
        },
    ],
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: [
                { loader: require.resolve('babel-loader') },
                { loader: require.resolve('react-svg-loader') },
            ],
        })

        return config
    },
}
