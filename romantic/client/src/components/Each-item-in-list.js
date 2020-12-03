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
  spaceMobile: {
    margin:'1px',
    boxShadow: 'none',
    borderRadius: '2px',
    padding: '1px',
    width : '100%',
    border:'none',
    background: '#eee'
  },
  spacePC: {
    background: '#efefef',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    border: 'solid 1px #fff',
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

  return (FilteredSortedList.slice((currentPage-1)*itemsMaxPage,itemsMaxPage*currentPage).map(x => 
    <div md="6" style={isMobile?{ padding: '7px',width: '50%'}:{ padding: '10px',width:'33%',}}  key={x._id}> 
       <Link to={`/item/${x._id}/${x.title.split(' ').join('-')}`} className="text-white">
         <Card style={isMobile?styles.spaceMobile:styles.spacePC}>       
          <CardImg loading="lazy" top width="100%" src={x.images[0] || '/images/vlogo.jpg'} alt={x.title} />
          <div className="px-2 py-1" >
          
            <span style={{fontSize: '16', color:'#000'}}>{x.title}</span>
             

              <div style={{margin:'2px 6px' ,display:'flex', flexFlow:'row wrap', top: '0px', textAlign: 'center', width: '100%'}}>
                
                {x.color.map(x=><div key={x} style={{width:'20px', height:'20px', backgroundColor:color(x), marginLeft:'-7px', border:x=='black'?`solid 1px #fff`:'none', borderRadius: '20px'}}>

                  {/*   {isColor(x)?"color":'not color'} */}
                 </div> 
                  )}
                
                </div>
           
              
            <p className="text-big" style={{fontSize: '16px',padding:'3px', width: 'fit-content', margin:'10px 0px',  color: '#000', fontWeight:"bold", textDecoration:'none'}}>₹ {x.price}</p>            
          </div>
      </Card>
      </Link>
    </div>
  ));
};

EachItemInList.propTypes = propTypes;

export default EachItemInList;



