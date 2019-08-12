import { Link } from "gatsby"
import React from "react"

import HeaderStyle from './header.module.scss';

const Header = ({ siteTitle }) => (
  <header className={ HeaderStyle.container }>
    <section>
      <h1 className={ HeaderStyle.title }>
        <Link to="/">{ siteTitle }</Link>
      </h1>
    </section>
    <section className={ HeaderStyle.menu }>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Blog</Link></li>
          <li><Link to="/">Portifolio</Link></li>
          <li><Link to="/">About me</Link></li>
        </ul>
      </nav>
    </section>
  </header>
)

export default Header
