module.exports = {
    env: {
        ASSETS_ENDPOINT: process.env.ASSETS_ENDPOINT,
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
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
}
