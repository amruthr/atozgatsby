import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {
  isMobile, MobileOnlyView, isBrowser
} from "react-device-detect";
import { Link} from "react-router-dom";
import { FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';

const styles = {
    backgroundImage: 'linear-gradient(15deg, #fff, #fefefefe)',
    paddingTop: '50px',
    color: '#000',
    textAlign: 'left',
    zIndex:9999,
  }
 
const Footer = () => (
  <div style={styles}>
 <Container>
    <Row>
  <Col xs={6}  md={4} className="text-small">
    <div style={{paddingTop:'10px'}}>Contact </div>
        <div style={{paddingTop:'10px'}}><small><a href="tel:8095958811">8095958811</a> </small></div>
        <div className="mt-3" style={{paddingTop:'1px', textAlign: 'left',}}>
         <h4> <a href="https://instagram.com/vastramboutiquemangalore"><FaInstagram style={{color:"#000"}}/></a>          
          <a href="mailto:vastramboutiquemangalore@gmail.com"> <FaEnvelope style={{color:"#000"}}/></a>       </h4>
        <div style={{ paddingTop:'10px'}}><small>Pailands Building 2nd Floor,<br/>Opp. Hampanktta Post Office, PM Rao Road<br/>Mangalore 575001</small></div> </div>
  </Col>
  <Col xs={6} md={4} className="text-small border-left pl-4 mt-5">
  <div style={{ paddingTop:'50px'}}><small>Privacy Policy</small></div>
        <div ><small>Terms and Conditions</small></div>
        <div ><small>Developed with ♥ by <a href="https://tikanga.in">Tikanga.in</a></small></div>
        </Col>
        <Col xs={0} md={3} style={{ paddingTop:'50px'}} className="d-none d-md-block mt-5"><small>
     <div> <Link to={`/category/5e4aacf04ce4394540654b42`}> Women's Fashion </Link> </div>
     <div> <Link to={`/category/5e4aac0b4ce4394540654b41`}> Men's Fashion </Link> </div>
     <div> <Link to={`/cart`}> Cart</Link> </div> </small>
    </Col>
   </Row>
</Container>
  </div>    
)

export default Footer