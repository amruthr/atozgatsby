import React from "react"
import { Link } from "gatsby"

const Logo = (props) => {
 
  return (<div className="site-logo">
    <Link to="/">
      <img 
              width={`160`}
              src={props.title} 
              alt={'Featured image'}
              className="featured-image"
            /></Link>
  </div>
)
}

export default Logo