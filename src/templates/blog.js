import React from 'react';
import { graphql, Link } from 'gatsby';

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
            <section className="blog-post">
                <Link to="/">&lArr; Voltar</Link>
                <section className="blog-post-title">
                    <h1>{ props.data.markdownRemark.frontmatter.title }</h1>
                    <p className="publication-date">Publicado em { props.data.markdownRemark.frontmatter.date }</p>
                    <p className="publication-summary">{ props.data.markdownRemark.frontmatter.summary }</p>
                </section>
                <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
            </section>
        </Layout>
    );
}

export default Blog;