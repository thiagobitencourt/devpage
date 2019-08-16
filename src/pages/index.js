import React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import blogStyles from './index.module.scss';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title,
              summary,
              post
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.sort((edgeA, edgeB) => {
    return edgeB.node.frontmatter.post - edgeA.node.frontmatter.post
  });

  return (
    <Layout>
      <SEO title="Blog" />
      <ol className={ blogStyles.posts }>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li key={edge.node.frontmatter.post.toString()} className={ blogStyles.post }>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.summary}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default IndexPage
