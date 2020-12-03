import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Container , Col} from 'reactstrap';
import EditCategory from './EditCategory';
import AdminFormDeleteItem from './Admin-form-delete-item';
import ShopByPrice from './shop-by-price'
import HeadingStyle from './headstyle'

export default class Category extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      categoryImages:[]
    }
  }

  componentDidMount() {
    
      fetch('/api/category')
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        this.setState({apiList:data})
      })
    }


  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })

    const { stylesTab2 } = this.props
    const { apiList } = this.state
   const color =()=> { return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')+"33" };
    return (
      <div style={{paddingTop: '0px', paddingBottom:'20px', background:'#fff', minHeight:'100vh'}}>      
        <div style = {{ width: '100%', position:'relative', overflowX:'scroll', scrollbarWidth:'none',background:'#fff', paddingTop:'20px' }}>
          <ShopByPrice/>
        </div>
        <HeadingStyle color="#000" headtext="Mens Fashion"/>
      <div style={{display:"flex", flexFlow:'row wrap'}} className="m-md-5 justify-content-around">        
          {apiList.map((x, index)=>       
        !x.hide && x.gender=="male" &&
               <Link to={`/category/${x._id}`}key={x._id} className="animated wow fadeIn" 
               style={{backgroundImage:' url('+x.images[0]+') , linear-gradient(49deg, '+color()+', '+color()+') ',
               backgroundRepeat: 'round', height:isMobile?'46vw':'22vw', backgroundSize:'cover',
               width:isMobile?'46%':'22%', borderRadius:'10px',
               margin:isMobile?'30px 0px':'60px 0px',
                 padding:'0px', position:'relative'}}>
                     <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none', bottom:'30px'}} className={isMobile?"justify-content-center d-flex":"d-flex justify-content-left"}>  
                         <h3 style={{color:'#000',borderRadius:'0px',width: 'fit-content', padding: '5px 0px',   position:'absolute', bottom:isMobile?'-30px':'-55px', fontSize:isMobile?'small':'', fontWeight:'bolder'}}>    {x.catname}{x.imagedata}
                         </h3>
                      </Link>
                      { !isMobile && <div style={{ bottom: '-70px', position:'absolute'}}>    
                     {x.subcats.map((item, ind)=> ind<3 ?
                      <Link to={`/productslist/${item}`}><small  style={{ width: 'fit-content', margin :'0px', color:'#000', position:'relative'}}> {ind>0 &&"|"} {item}</small> </Link> 
                      :
                      ind == x.subcats.length - 1?   <small className="mt-4" style={{marginTop :'25px',  margin :'5px', color:'#000',}}>+ {x.subcats.length - 3}</small> 
                     : ""
                     )}  
                   </div>   }                       
              </Link>
          )}
      </div>
      <HeadingStyle color="#000" headtext="Womens Fashion"/>
      <div style={{display:"flex", flexFlow:'row wrap'}} className="mx-md-5 justify-content-around">        
          {apiList.map((x, index)=>       
        !x.hide && x.gender=="female" &&
        <Link to={`/category/${x._id}`}key={x._id} className="animated wow fadeIn" 
        style={{backgroundImage:'url('+x.images[0]+') , linear-gradient(49deg, '+color()+', '+color()+')',
        backgroundRepeat: 'round', height:isMobile?'46vw':'22vw', backgroundSize:'cover',
        width:isMobile?'46%':'22%', borderRadius:'10px',
        margin:isMobile?'30px 0px':'60px 0px',
          padding:'0px', position:'relative'}}>
              <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none', bottom:'30px'}} className={isMobile?"justify-content-center d-flex":"d-flex justify-content-left"}>  
                  <h3 style={{color:'#000',borderRadius:'0px',width: 'fit-content', padding: '5px 0px',   position:'absolute', bottom:isMobile?'-30px':'-45px', fontSize:isMobile?'small':'', fontWeight:'bolder'}}>    {x.catname}{x.imagedata}
                  </h3>
               </Link>
                  { !isMobile && <div style={{ bottom: '-70px', position:'absolute'}}>    
                     {x.subcats.map((item, ind)=> ind<3 ?
                      <Link to={`/productslist/${item}`}><small  style={{ width: 'fit-content', margin :'0px', color:'#000', position:'relative'}}> {ind>0 &&"|"} {item}</small> </Link> 
                      :
                      ind == x.subcats.length - 1?   <small className="mt-4" style={{marginTop :'25px',  margin :'5px', color:'#000',}}>+ {x.subcats.length - 3}</small> 
                     : ""
                     )}  
                   </div>   }                        
       </Link>
          )}
      </div>
      </div>
    )
  }
};
