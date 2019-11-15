module.exports = {
    pathPrefix: '/pubvendors-web',
    siteMetadata: {
        title: 'Pubvendors generator',
        description: 'Generate a pubvendors.json for IAB cookie consent solutions',
    },
    plugins: [
        'gatsby-plugin-top-layout',
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // 'gatsby-plugin-offline',
    ],
}
