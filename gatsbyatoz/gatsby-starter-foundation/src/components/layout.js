import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";

const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteLogo: image
    }
  }
}
`

const Layout = ({children, className}) => {

  const { site } = useStaticQuery(query)
  const { siteLogo } = site.siteMetadata

  return (
    <div className="primary-container">
      <Header>
        <Logo title={siteLogo} />
        <Navigation/>
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout

