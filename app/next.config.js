const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    env: {
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/tracks',
                permanent: false,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/static/:asset',
                destination: `${process.env.STATIC_ASSETS_BASE_URL}/:asset`,
            },
            {
                source: '/api/download/:asset',
                destination: `${process.env.DOWNLOAD_ENDPOINT}/:asset`,
            },
            {
                source: '/api/graphql',
                destination: process.env.GRAPHQL_ENDPOINT,
            },
        ]
    },
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
})
