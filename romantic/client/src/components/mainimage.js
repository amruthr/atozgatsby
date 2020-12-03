import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isBrowser, isMobile, MobileOnlyView } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import Image, { Shimmer } from 'react-shimmer';
import HeadingStyle from './headstyle'
import {Animated} from "react-animated-css";
import CarouselHomepage from './Carousel-homepage'
import {Col, Row} from 'reactstrap'

class MainImage extends Component {

    constructor(props){
      super(props);
      this.state = {     
    };
   
    };

    render() {
      
       const bannerCoverPc = {
        background:'#fff',
         backgroundSize: 'contain',
         height: '67vh',
        }
      const bannerCoverMobile = {
        background:'#fff',
          backgroundSize: 'contain',
          
        }
      
 return(  
    <Animated className="row mx-0" style={isMobile? bannerCoverMobile : bannerCoverPc}  animationIn={"fadeIn"} animationOut="fadeOut" isVisible={true} >            
        <Col md={7} className="mt-5 mt-md-2 ">
          <div style={{height:isMobile?'35vh':'35vh', }}>    
            <CarouselHomepage/>
          </div>
        </Col>
         <Col md={5} className={`d-flex ${isMobile?'flex-row':'flex-column'} align-items-center justify-content-around`} style={{height:isMobile?'10vh':'50vh', }} >
              <ButtonLinkGenderPage gender={'men'} content='Shop Menswear' className="" /> 
              <ButtonLinkGenderPage gender={'women'} content='Shop Womenswear' className="" />
        </Col>
    </Animated>
   )
 }

}
export  default MainImage
