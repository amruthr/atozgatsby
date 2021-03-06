import React from 'react';
import {
  isMobile, 
} from "react-device-detect";
import { Helmet } from 'react-helmet';
import { 
  Container,
  Row,
  Button,
  Col
} from 'reactstrap';
import SpecificGender from '../components/SpecificGender'
import HeroBanner from '../components/Hero-banner';
import CarouselHomepage from '../components/Carousel-homepage';
import ShowCategory from '../components/ShowCategory';
import ShopByBrand from '../components/shop-by-brand';
import SortByPrice from '../components/SortByPrice';
import ShopByNew from '../components/shop-by-new';
import HeadingStyle from '../components/headstyle';
import ButtonLinkGenderPage from '../components/Button-link-gender-page';
import Footer from '../components/Footer';
import Bannertext from '../components/Bannertext'
import Category from '../components/vastramhome'
import Axios from 'axios';
import MainImage from '../components/mainimage';
const styles = {height: '600px',width:'100%', marginTop: '2px',margin:'auto', display: 'flex',overflow: 'hidden',justifyContent: 'center'};
const mstyles = {height: '300px',width:'100%', marginTop: '2px',margin:'auto', display: 'flex',overflow: 'hidden',justifyContent: 'center'};
const socialbuttons = {fontSize:"20px",margin:'10px 30px', padding:'10px', color:"#000", background: "#fff", }
const SBPContainerStyles = {
  width: '100%',
  overflowX:'scroll',
  background:'#fff',  
};
const colstyles={
  border: "solid 0.5px #fff",
  borderRadius: "10px",
  padding: "20px 3px",
  backgroundImage: "#fff",
  color: "#000",
  textAlign: "center",
    margin:"10px"
}
const centerButtons = {
  backdropFilter:isMobile?'0': 'blur(15px)',
  textAlign:'center',
  backgroundRepeat: 'no-repeat',
}
var Snow = require('react-snow-effect');

const Homepage = () => (
  <div >
    <Snow/>
    <Helmet>
      <title>Romantic Mangalore</title>
      <meta name="Vastram Fashions" content="Best offers on the Best Products. Shop Now" />     
    </Helmet>
    <div className="animated wow fadeIn" style={{background:'#fff'}} >
   {/*  <p className="text-center mb-0 py-1" style={{wordSpacing:'1px',background:'#ffbf00', color:"#000", width:'100%'}}><small>{isBrowser && "#StayHomeStaySafe"} 10% off on all orders. Get Gift voucher worth 5% off on order above ₹5000. Extra 5% off on orders above ₹10000 {isBrowser && "Shop Now"}</small></p> */}

 <MainImage/>
 <SortByPrice/>
<Category/>
<ShopByBrand/>
<HeadingStyle color="#000" headtext="Just In"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata'/></div>
 <HeadingStyle color="#000" headtext="Saree"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata/Saree'/></div>
 <HeadingStyle color="#000" headtext="Vastram Specials"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata/Vastram%20special'/></div>
  <Footer/>
</div> </div>
);

export default Homepage;