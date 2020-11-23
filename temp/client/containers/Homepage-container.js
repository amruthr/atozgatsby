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
import ShopByPrice from '../components/shop-by-price';
import ShopByNew from '../components/shop-by-new';
import ShopByBrand from '../components/shop-by-brand';
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
  backgroundImage: 'linear-gradient(0deg, #000e, #000) ,url(/images/bg.jpg)',
  backgroundSize: 'contain',
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
    <Helmet>
      <title>Vastram Fashions</title>
      <meta name="Vastram Fashions" content="Best offers on the Best Products. Shop Now" />     
    </Helmet>
    <div className="animated wow fadeIn" style={{background:'#000'}} >
   {/*  <p className="text-center mb-0 py-1" style={{wordSpacing:'1px',background:'#ffbf00', color:"#000", width:'100%'}}><small>{isBrowser && "#StayHomeStaySafe"} 10% off on all orders. Get Gift voucher worth 5% off on order above ₹5000. Extra 5% off on orders above ₹10000 {isBrowser && "Shop Now"}</small></p> */}

 <MainImage/>
<Category/>
<HeadingStyle color="#c6a45b" headtext="Just In"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata'/></div>
 <HeadingStyle color="#c6a45b" headtext="Saree"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata/Saree'/></div>
 <HeadingStyle color="#c6a45b" headtext="Bring your designs to Life"/>
 <Container><Row><Col sm="5"><Button style={{backgroundColor:'#000', border:'solid 1px #c6a45b'}}className=" m-3 text-white btn-lg" onClick={()=>window.location.href="https://api.whatsapp.com/send?phone=918095958811&text=Hello%2C%20I%20Want%20a%20customized%20Design.%20Please%20Help"}>Get started</Button> </Col><Col sm="7" style={{backgroundImage:'url(/images/tailor.jpg)', backgroundSize:'contain', height:'300px', backgroundRepeat:'no-repeat'}}></Col></Row></Container>
 <HeadingStyle color="#c6a45b" headtext="Vastram Specials"/>
 <div style={SBPContainerStyles}><ShopByNew url='/api/productsdata/Vastram%20special'/></div>
  <Footer/>
</div> </div>
);

export default Homepage;