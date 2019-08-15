import React from 'react';
import { graphql } from 'gatsby';

import './blog-post.scss';
import Layout from '../components/layout/layout';

export const query = graphql`
    query ($slug: String) {
        markdownRemark (fields: { slug: { eq: $slug }}) {
            frontmatter {
                title
                date
                summary
            }
            html
        }
    }
`

const Blog = (props) => {
    return (
        <Layout>
            <section class="blog-post-title">
                <h1>{ props.data.markdownRemark.frontmatter.title }</h1>
                <p class="publication-date">{ props.data.markdownRemark.frontmatter.date }</p>
                <p class="publication-summary">{ props.data.markdownRemark.frontmatter.summary }</p>
            </section>
            <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
        </Layout>
    );
}

export default Blog;