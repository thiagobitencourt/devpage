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
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Blog" />
      <ol className={ blogStyles.posts }>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={ blogStyles.post }>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default IndexPage
