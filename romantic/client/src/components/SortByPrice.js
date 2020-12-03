import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import { connect } from 'react-redux';
import '../style/arrowstyle.css';
import { 
  sortArgsForFilter, 
  keywordsForFilter, 
  actionSizeForFilter,
  oneKeywordForFilter, 
  fetchDataApi,
  actionPriceRangeFilter,
  actionFillFilters
} from '../actions/DataFetchingActions';
import { 
  Container,
  Row,
  Col
} from 'reactstrap';
import '../style/shimmer.css';

class  SortByPrice extends Component {

    constructor(props){
      super(props);
      this.state = {
       categories :[]
      };
    };
  
  render() {
    const {categories} = this.state;
    const shimmerstyle = {
      height:isMobile?'40vw':'40vh',
       width:isMobile?'40vw':'20vw'
    }
    const ShimmerCards = () =>{
      return(
        <div className="d-flex p-2">
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
    
    </div>
      )
    }
    return(
     
         <div class="stepsWrapper wrapper mx-5">
                    <div class="arrow-steps clearfix">
                        <div class="step">
                            <h3>Fashion <br/>Steals</h3>
                            <p>Get the latest styles at unbelivable prices! </p>
                            <p class="m-0">&nbsp;</p>
                        </div>
                        <div class="step" style={{backgroundColor:'#D35D5D'}}>
                            <p>UNDER</p>
                            <h3>₹399</h3>
                        </div>
                        <div class="step" style={{background:'#D48282'}}>
                        <p>UNDER</p>
                            <h3>₹699</h3>
                        </div>
                        <div class="step" style={{background:'#DAB8B8'}}>
                        <p>UNDER</p>
                            <h3>₹999</h3>
                        </div>
                    </div>
                </div>
     )
  }
} 

export default SortByPrice;