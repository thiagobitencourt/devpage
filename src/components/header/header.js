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
  </header>
)

export default Header
