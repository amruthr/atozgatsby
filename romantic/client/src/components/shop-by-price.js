import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import { connect } from 'react-redux';
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

class  shopByPrice extends Component {

    constructor(props){
      super(props);
      this.state = {
       categories :[]
      };
    };
  

  componentDidMount() {
    fetch('/api/shopbyprice')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
data && 
        this.setState({
          categories: data.map(item=>({
            catname: item._id,
            price: item.price, 
            img:item.catimg,           
          }))
        });
      })
.catch((err)=>console.log(err))
  }   


  render() {
const shimmerstyle = {
  height:isMobile?'30vh':'50vh',
   width:isMobile?'40vw':'20vw'
}
    
const ShimmerCards = () =>{
  return(
    <div className="d-flex p-2">
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
</div>
  )
}
    const {categories} = this.state;
    const cards = categories.length>0 && categories.map(x => { 
    return( x.catname &&
      <Link to={`/productslist/${encodeURI(x.catname)}`}>
        <div className=" wow animated slideInRight shadow-sm mx-md-3 mx-3 mb-5 px-md-1 px-3 py-1 text-center" 
            style = {{width: isMobile?'250px':'250px',
            color:'#c6a45b',
            backgroundImage:`url(${x.img})`,
            backgroundSize:'contain',
            borderRadius:' 0px',
            height:isMobile?'250px':'250px', position:'relative',
            alignItems: 'center',}}>
          <div className="text-uppercase text-center " style={{background:'#000', color:'#fff', position:'absolute', top:'100px', width:'100%', left:'0px' }}>
              <h6 className="mt-2" >{x.catname} - ₹{x.price}</h6>                             
          </div>
          </div>
      </Link>
    )
    })
    return(
      <marquee style={{ background:'#fff'}}>
        <div style = {{display:'flex',
                     flexFlow:'row nowrap', 
                      background:'#fff',
                      justifyContent: 'left'}} className="my-4">{categories.length>1  ? cards:<ShimmerCards/>}
        </div>
      </marquee>
    )
  }
} 

export default shopByPrice;