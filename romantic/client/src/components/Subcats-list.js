import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isBrowser, isMobile } from "react-device-detect";
import {FiHome} from 'react-icons/fi'
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
 
    Col,
     Container,
    CardImg, 
    
  } from 'reactstrap';
import ShopByBrand from './shop-by-brand';
  
  const styles = {
    cardTitle: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '20px'
    },
    cardBtn: {
      textAlign:'center', 
      width:'100%',
    },
    card: {
      margin: isMobile?'20px':'30px',
      alignItems: 'center',
      justifyContent:'center',
      padding:'20px 10px',
      borderRadius:'10px'
    }
  };
  
  
class subcatsList extends Component {

    constructor(props){
      super(props);
      this.state = {
       dataload:[], 
       payload:[],  
       catname:'',
       image:'',
       gender:''
      };
      
    };
    componentDidMount() {
      this.setState({gender:this.props.match.params.gender})
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${this.props.match.params.gender}`)
    .then(response => {        
      return response.json();
    })
    .then((data) => {      
      this.setState({
        catname: data.catname,
        image:data.images,
        dataload: data.subcats.map(item=>({
          cardTitle: item,                     
        }))
      });
    return this.state.dataload
    })
    .then((dataload) => {  
dataload.map((item)=>{
  fetch(`/api/category/imgfromtag/${item.cardTitle}`)
  .then(response => {       
    return response.json()
  })
  .then((data) => {     
     data.tags.map((item , i)=>(
        cardTitle.push(item)  ,
        imgSrc.push(data.images[i])                  
      ))
      this.setState({
        payload: cardTitle.map((item, i)=>({
          cardTitle: item,      
          imgSrc: imgSrc[i]           
        }))
      });   
  
    })
  .catch((err)=> console.log("err", err))
})
    });

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.gender !==this.props.match.params.gender){
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${nextProps.match.params.gender}`)
    .then(response => {        
      return response.json();
    })
    .then((data) => {      
      this.setState({
        catname: data.catname,
        image:data.images,
        dataload: data.subcats.map(item=>({
          cardTitle: item,                     
        }))
      });
   
    return this.state.dataload
    })
    .then((dataload) => {  
        dataload.map((item)=>{
          fetch(`/api/category/imgfromtag/${item.cardTitle}`)
          .then(response => {        
            
            return response.json();
          })
          .then((data) => {     
            data.tags.map((item , i)=>(
                cardTitle.push(item)  ,
                imgSrc.push(data.images[i])                  
            ))          
              this.setState({
                payload: cardTitle.map((item, i)=>({
                  cardTitle: item,      
                  imgSrc: imgSrc[i]           
                }))
              });   
              
          })
          .catch((err)=> console.log("err", err))
        })
     });
    }
  } 

    render() {
    const color =()=> { return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')+"33" };
    const {dataload, payload} = this.state;
    const {gender} = this.state
    const cards = payload.map(x => {
    return(
      <Link to={`/productslist/${x.cardTitle}/`}key={x._id} className="animated wow fadeIn" 
      style={{backgroundImage:' url('+x.imgSrc+') , linear-gradient(49deg, '+color()+', '+color()+') ',
      backgroundRepeat: 'round', height:isMobile?'150px':'300px', backgroundSize:'cover',
      width:isMobile?'150px':'300px', borderRadius:'10px',
      margin:isMobile?'30px 0px':'60px 0px',
        padding:'0px', position:'relative'}}>
            <Link to={`/productslist/${x.cardTitle}/`} style={{color:'#000', textDecoration:'none', bottom:'30px'}} className={isMobile?"justify-content-center d-flex":"d-flex justify-content-left"}>  
                <h3 style={{color:'#000',borderRadius:'0px',width: 'fit-content', padding: '5px 0px',   position:'absolute', bottom:isMobile?'-30px':'-55px', fontSize:isMobile?'small':'', fontWeight:'bolder'}}>    {x.cardTitle}
                </h3>
             </Link>                                
     </Link>
        
        
        
   )
    })
    return(
    <div className="pt-3" style={{background: '#fff',backgroundSize: 'contain',position:'relative', minHeight:'100vh'}}>
      <h5 className="mx-4 mx-md-5 my-3" style={{ fontFamily:'Jost'}}>
      <Link to="/" style={{color:'#000',}}><FiHome/></Link> › {this.state.catname} Collections</h5>
      <Container><div style={{display:"flex", flexFlow:'row wrap'}} className="m-md-5 justify-content-around"> {cards}</div>
      <ShopByBrand/> </Container>
    </div>
    )
  }
} 
const mapDispatchToProps = dispatch => ({oneKeywordForFilter: x => dispatch(oneKeywordForFilter(x))});
const mapStateToProps = state => ({oneKeywordForFilter: state.oneKeywordForFilter});

export default connect(mapStateToProps, mapDispatchToProps)(subcatsList);;