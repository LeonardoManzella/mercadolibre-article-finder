import React from "react"
import { Link, graphql } from "gatsby"
import ContentLoader from 'react-content-loader'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  /* TODO 
  - Design layout to use tiny-slider and augmented-ui
    - Menu, search bar and icon (Top of App, but thic)
  */

  const MyLoader = () => (
    <div style={{overflowX: "hidden"}}>
      <ContentLoader 
        speed={2}
        width={"100%"}
        viewBox="0 0 300 230"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="11" y="14" rx="0" ry="0" width="212" height="11" /> 
        <rect x="12" y="31" rx="0" ry="0" width="18" height="58" /> 
        <rect x="39" y="51" rx="0" ry="0" width="103" height="17" /> 
        <rect x="39" y="74" rx="0" ry="0" width="84" height="9" /> 
        <rect x="39" y="35" rx="0" ry="0" width="84" height="9" /> 
        <rect x="77" y="99" rx="0" ry="0" width="60" height="55" /> 
        <rect x="138" y="3000" rx="0" ry="0" width="60" height="55" /> 
        <rect x="11" y="100" rx="0" ry="0" width="60" height="55" /> 
        <rect x="141" y="99" rx="0" ry="0" width="60" height="55" /> 
        <rect x="77" y="158" rx="0" ry="0" width="60" height="55" /> 
        <rect x="11" y="159" rx="0" ry="0" width="60" height="55" /> 
        <rect x="141" y="158" rx="0" ry="0" width="60" height="55" />
      </ContentLoader>
    </div>
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <button className="btn-purple">Message</button>
      <MyLoader />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
