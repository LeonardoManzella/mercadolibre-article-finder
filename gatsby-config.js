module.exports = {
  siteMetadata: {
    title: `BuscaPrecios`,
    author: {
      name: `Leonardo Manzella`,
      summary: ``,
    },
    description: `Buscador de precios de mercadolibre`,
    siteUrl: `https://busca-precios.netlify.app/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      // === PWA Manifest options ===
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Busca Precios`,
        short_name: `Busca Precios`,
        start_url: `/`,
        icon: `src/images/icon.png`,
        background_color: `#ecebeb`,
        theme_color: `#ecebeb`,
        display: `standalone`,
      },
    },
    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // KEEP AT THE END OF THE FILE
    `gatsby-plugin-offline`,
  ],
}
