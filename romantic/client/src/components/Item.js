import PropTypes from "prop-types";
import React, { Component , useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { isBrowser , isMobile} from "react-device-detect";
import Breadcrumbs from "./Breadcrumbs";
import Review from "./review";
import { Col, Row, Container, Button, Modal, Collapse } from "reactstrap";
import StarRatings from "react-star-ratings";
import ButtonSizeSelect from "./Button-size-select";
import ButtonAddToCart from "./Button-add-to-cart";
import CheckoutModal from "./Checkout-modal";
import ButtonsColorSelect from "./Buttons-color-select";
import CarouselItemPage from "./Carousel-item";
import QuantityPicker from "./Quantity-picker";
 import { Helmet } from 'react-helmet';
 import Image, { Shimmer } from 'react-shimmer'
 import {MdLocalOffer} from 'react-icons/md'
 import {FiShare2} from 'react-icons/fi'
 import ReactImageMagnify from 'react-image-magnify';

import '../style/ticket.css';
import '../style/shimmer.css';

  

const propTypes = {
  infoItem: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  selectedSize: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  errorFetching: PropTypes.bool,
  handleSizeSelection: PropTypes.func.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
  totalItemsSelectorStats: PropTypes.number.isRequired
};

const styles = {
  marginTop: "20px"
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      openModal: false,
      reviewopen:false,
      rated: 0,
      sctoggle:false
    };
  }
  async componentDidMount() {
    try {
      const response = await axios.get(`/api/review/${this.props.match.params.id}`)
      const apiList = await response.data;
      apiList && this.setState({ apiList })
      this.setState({rated :((this.state.apiList.map((item)=>item.rating).reduce((a, b) =>  a+b , 0))/this.state.apiList.length)})
    } catch (error) {
      console.log(error);
    }
  }
  
togglereview = () =>this.setState({reviewopen:!this.state.reviewopen});
  toggleModal = () => this.setState({ openModal: !this.state.openModal });

  render() {
    const {
      infoItem,
      loading,
      errorFetching,
      addToCart,
      handleSizeSelection,
      handleColorSelection,
      validateSizeSelection,
      validateColorSelection,
      selectedSize,
      selectedColor,
      totalItemsSelectorStats,
      colorSelectionMissingRemark,
      sizeSelectionMissingRemark,
      title
    } = this.props;


    

    const { selectedImage } = this.state;

    if (errorFetching) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    const { size, images, color, tags, qty, sizedetails, sizechart , id, rental} = infoItem;
    
    if (
      loading ||
      size === undefined ||
      images === undefined ||
      color === undefined ||
      tags === undefined ||
      qty === undefined
    ) {
      return (
        <div>
        <Helmet>    
      <title>{infoItem.title? "Vastram Fashions - "+infoItem.title :"Vastram Fashions" }</title>
      <meta name="Vastram Fashions" />
      <meta property="og:title" content={"Vastram Fashions - "+infoItem.title}/>
    <meta property="og:description" content={infoItem.title+" Buy now at Vastram Fashions E-Store"}/>
    <meta property="og:url" content={"http:// ariesfashion.herokuapp.com/"+infoItem._id+"/"+infoItem.title}/>
    <meta property="og:type" content="product"/>
    <meta property="og:image" content={infoItem}/>
    </Helmet>
      <div style={{ height: "95vh" }} className="d-flex justify-content-center p-3 flex-column" >

      <div className="comment br animate w100" style={{height:'60vh'}}/>
      <div className="d-flex "> 
      <div className="comment br animate w100 mx-2" style={{height:'10vh', width:'15vw'}}/>
      <div className="comment br animate w100 mx-2" style={{height:'10vh', width:'15vw'}}/>
      <div className="comment br animate w100 mx-2" style={{height:'10vh', width:'15vw'}}/>
      <div className="comment br animate w100 mx-2" style={{height:'10vh', width:'15vw'}}/>
      </div>
      <div className="comment br animate w100 my-4" style={{height:'5vh', width:'50vw'}}/>

      </div>
     </div> );
    }
    const thumbnailsBrowersView = infoItem.images.map((x, index) => (
      <div key={x} style={{ padding: "5px" }}>
        <img
          onMouseEnter={() => this.setState({ selectedImage: index })}
          onClick={() => this.setState({ selectedImage: index })}
          src={infoItem.images[index]}
          alt={infoItem.title}

          width="70px"
          height="70px"
          style={{cursor: 'pointer',borderRadius:'5px', border:this.state.selectedImage == index ? 'solid 2px dodgerblue': ''}}
        />
      </div>
    ));
    const MainImageBrowserView = (
      <ReactImageMagnify enlargedImageContainerStyle={{zIndex:'999999999', background:'#fff'}} {...{
        smallImage: {
            alt: infoItem.title,
            isFluidWidth: true,
            src: infoItem.images[selectedImage]
        },
        largeImage: {
            src: infoItem.images[selectedImage],
            width: 1200,
            height: 1200
        }
    }} />
   /*  <img  loading="lazy"  className="wow animated fadeIn"
        src={infoItem.images[selectedImage]}
        alt={infoItem.title}
        style={{width:'100%', transition:'all ease-in 2s'}}        
      /> */
    )
    const MainImageMobileView = (
      <CarouselItemPage imgsArray={infoItem.images} activeIndex={this.state.selectedImage} />
    )
    const {reviewopen} = this.state
   const sctoggle =() => this.setState({sctoggle:!this.state.sctoggle})
    return (
      <div>
        <Helmet>    
      <title>{"Vastram Fashions - "+infoItem.title}</title>
      <meta name="Vastram Fashions" />
      <meta property="og:title" content={"Vastram Fashions - "+infoItem.title}/>
    <meta property="og:description" content={infoItem.title+" only on the Vastram Fashions E-Store"}/>
    <meta property="og:url" content={"http:// ariesfashion.herokuapp.com/"+infoItem._id+"/"+infoItem.title}/>
    <meta property="og:type" content="product"/>
    <meta property="og:image" content={infoItem.images && infoItem.images[0]}/>
    </Helmet>
        <Breadcrumbs
          selectedCategory={infoItem.tags}
          backgroundColor={"white"}
          textColor={"black"}
          sortbutton={false}
        />
        <Container style={{paddingTop:'5px', paddingBottom:'30px',width:'100%', cursor: 'pointer'}}>
          <Row style ={isMobile?{background:'white', padding:'5px'}:{background:'white', margin:'10px 10px', paddingTop:'10px'}}>
            <Col md="1">{isBrowser && thumbnailsBrowersView}</Col>
            <Col md="6">
              {isBrowser ? MainImageBrowserView : MainImageMobileView}
            </Col>
            {isMobile &&<div className="p-3 d-flex"> {thumbnailsBrowersView} </div>}
            <Col md="5">
              <h4 >  {infoItem.tags[0]}</h4> 
              {isMobile &&
                <Button onClick ={()=>{navigator.share?        
              navigator.share({
              title:'Romantic Mangalore- '+infoItem.title ,
              text:"Check out "+infoItem.title+" from Romantic!",
              url: window.location.href,              
            })
            :"" } } size="md" 
            style={{marginLeft: '25px', float:'right', background:'#fff', color:'#000' ,border:'solid 0px #fff' }}> <FiShare2 size={25}/> </Button>
          
          }
              <h3 className="font-weight-bold">{infoItem.title}</h3>

              <h2 className="mt-1 mt-md-3 mb-1 font-weight-bold" style={{color:'#000'}}>Rs.{infoItem.price}</h2>
              {this.state.rated>0 &&<div style={{float:'right'}}><StarRatings
                rating={this.state.rated}
                starDimension="15px"
                starSpacing="1px"
                starRatedColor="#072a48"
                numberOfStars={5}
                name="rating"
              /> </div>}
              <small> MRP (Inclusive of all taxes.) </small><br/>
    <small> <Link to={`/brand/`+infoItem.brands[0]}>More by <u>{infoItem.brands[0]}</u> </Link></small>             
              
              <Row style={styles} className="mt-1 mb-2">
              <Col md="12" style={{marginBottom:'50px'}}> 
              
               <ButtonSizeSelect
                  style={styles}
                  sizesArray={infoItem.size}
                  sizedetailsArray = {infoItem.sizedetails}
                  infoItem={infoItem}
                  handleSizeSelection={handleSizeSelection}
                  selectedSize={selectedSize}
                  validateSizeSelection={validateSizeSelection}
                />
                {sizeSelectionMissingRemark.length > 0 ? (
                  <b style={{ color: "red" }}>*{sizeSelectionMissingRemark}</b>
                ) : (
                  ""
                )} </Col>
                <Col md="12"> 
                <ButtonsColorSelect
                        colors={infoItem.color}
                        handleColorSelection={handleColorSelection}
                        selectedColor={selectedColor}
                        validateColorSelection={validateColorSelection}
                      />
                      {colorSelectionMissingRemark.length > 0 ? (
                        <b style={{ color: "red" }}>*{colorSelectionMissingRemark}</b>
                      ) : (
                        ""
                      )}
                </Col>
                </Row>
                      {infoItem.sizechart && <small onClick={sctoggle}><u>Size Chart </u></small> }
                <Collapse isOpen={this.state.sctoggle}>
                  <img  loading="lazy" style={{width:'100%' }} className="my-3" src={infoItem.sizechart}/>
                </Collapse>
              
           {infoItem.qty> 0?
                       <div style={isMobile ?{position:'fixed', background:'#FFF', bottom:'0px',left:'0', zIndex:'200000', width:'100%', boxShadow:'0px -3px 10px 0px #0002', display:'flex', justifyContent:'space-evenly', alignItems:'center'}:{marginTop:'10px'}} className="p-1">
             {infoItem.qty<5 && infoItem.qty>0    &&<div style={isMobile?{display:'none'}:{display:'block'}} class=" mb-4"> <small className="text-danger "> Hurry only {infoItem.qty} left!</small> </div> }
            {isMobile&& <p className="d-inline font-weight-bold mx-2 mt-3">Rs. {infoItem.price}</p> }
                <ButtonAddToCart
                  sizeBtn="md"
                  quickBuy={false}
                  addToCart={addToCart}
                  infoItem={infoItem}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  toggleModal={this.toggleModal}
                  validateSizeSelection={validateSizeSelection}
                  validateColorSelection={validateColorSelection}
                  colorSelectionMissingRemark={colorSelectionMissingRemark}
                  sizeSelectionMissingRemark={sizeSelectionMissingRemark}
                />
                 <ButtonAddToCart
                  sizeBtn="md"        
                  toggleModal = {this.toggleModal}      
                  quickBuy={true}
                  addToCart={addToCart}
                  infoItem={infoItem}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  /* toggleModal={this.toggleModal} */
                  validateSizeSelection={validateSizeSelection}
                  validateColorSelection={validateColorSelection}
                  colorSelectionMissingRemark={colorSelectionMissingRemark}
                  sizeSelectionMissingRemark={sizeSelectionMissingRemark}
                />

            </div>: <p>This Product is not available at the moment.</p> } 
             {infoItem.qty<5  && infoItem.qty>0   &&<div style={!isMobile?{display:'none'}:{display:'block'}} class="d-block mb-4 d-sm-none"> <small className="text-danger "> Hurry only {infoItem.qty} left!</small> </div> }
                    
              <Button onClick = {this.togglereview} size="md" 
              style={{marginTop: '25px', background:'#fff', color:'#000' ,border:'solid 0px #000' }}><u> Review this Product </u> </Button>

         
              <CheckoutModal
                openModal={this.state.openModal}
                toggleModal={this.toggleModal}
                infoItem={infoItem}
                totalItemsSelectorStats={totalItemsSelectorStats}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
              <p style={{ paddingTop: "30px" , fontSize:'smaller'}}>Description:</p>
              <p style={{fontSize:'small'}}>{infoItem.description}</p>
              <Modal isOpen={reviewopen} backdrop={true} toggle={this.togglereview}>
                <Review admin={false} product={infoItem}/>
                </Modal>
            </Col>         
          </Row>
        </Container>
  
      </div>
    )
  }
}

Item.propTypes = propTypes;

export default Item;
