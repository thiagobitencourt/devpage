import React from "react";

import FooterStyle from './footer.module.scss';

const Footer = () => (
  <footer className={ FooterStyle.footer }>
    <i>
      Feito com &#x2764; por &nbsp;
      <a href="https://github.com/thiagobitencourt" target="_blank">Thiago Bitencourt</a>
      &copy; 2019
    </i>
  </footer>
)

export default Footer;