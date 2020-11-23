import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { 
  Col,
  Card, 
  CardImg
} from 'reactstrap';
import {
  isMobile
} from "react-device-detect";
const propTypes = {
  FilteredSortedList: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsMaxPage: PropTypes.number.isRequired
};

const styles = {
  flexmob : {
    width:'50%',
    padding: '10px',
  },
  spaceColumn: {
    margin:'1px',
    boxShadow: 'none',
    borderRadius: '2px',
    padding: '1px',
    width : '100%',
    height:'340px',
    border:'solid 1px #181818',
    background: '#000'
  },
  spaceColumnPC: {
    background: '#000',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    border: 'solid 1px #000',
    borderRadius: '4px',
    height:'360px',
    boxShadow: 'none',
    padding: '2px 2px 2px 2px',
  }, 
  fontSize: {
    fontSize: '15px'
  },
  marginLeftBtn: {
    marginLeft: '30px'
  },
  containerPaddingTop: {
    paddingTop: '35px'
  }
};

const EachItemInList = ({
  touchme,
  FilteredSortedList,
  currentPage,
  itemsMaxPage
}) => {  

 const color = (x) =>{
    return x.includes("#")? x.substr(x.indexOf('#'), x.length- 1): x 
   }
/*   colorname = (x)=>{
   return x.includes("#")? x.substr(0, x.indexOf('#')) : x
   } */

  return (FilteredSortedList.slice((currentPage-1)*itemsMaxPage,itemsMaxPage*currentPage).map(x => 
    <div md="6" style={isMobile?{ padding: '7px',width: '50%'}:{ padding: '10px',width:'33%',}}  key={x._id}> 
       <Link to={`/item/${x._id}/${x.title.split(' ').join('-')}`} className="text-white">
         <Card style={isMobile?styles.spaceColumn:styles.spaceColumnPC} onMouseOver={touchme}>       
          <CardImg loading="lazy" top width="100%" src={x.images[0] || '/images/vlogo.jpg'} alt={x.title} />
          <div className="px-2 py-1" >
          
            <p style={{fontSize: '18px', color:'#aaa'}}>{x.title}</p>
             

              <div style={{margin:'2px 6px' ,display:'flex', flexFlow:'row wrap', top: '0px', textAlign: 'center', width: '100%'}}>
                
                {x.color.map(x=><div key={x} style={{width:'20px', height:'20px', backgroundColor:color(x), marginLeft:'-7px', border:x=='black'?`solid 1px #fff`:'none', borderRadius: '20px'}}>

                  {/*   {isColor(x)?"color":'not color'} */}
                 </div> 
                  )}
                
                </div>

            {/*   {x.color.map(item=>{ isColor(item) ? 
                  <div key={item} style={{width:'20px', height:'20px', backgroundColor:item, marginLeft:'-7px', border:`solid 1px white`, borderRadius: '20px'}}/> 
                  :
                  <div key={item} style={{width:'20px', height:'20px', backgroundColor:item.substring(item.indexOf('#'), item.indexOf('#')+6), marginLeft:'-7px', fontSize:'10px', border:`solid 1px white`, borderRadius: '20px'}}>
                    {item.substring(0, item.indexOf('#'))} </div> })} */}
              
            <p className="text-big" style={{fontSize: '16px',padding:'3px', width: 'fit-content', margin:'10px 0px', background:'#c6a45b',  color: '#000', fontWeight:"bold", textDecoration:'none'}}>&#8377; {x.price}</p>
            <small className="text-white">{x.rental ==0 ?"":"Rental Available"}</small>
          </div>
      </Card>
      </Link>
    </div>
  ));
};

EachItemInList.propTypes = propTypes;

export default EachItemInList;



