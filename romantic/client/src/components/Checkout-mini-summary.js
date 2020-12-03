import PropTypes from 'prop-types';
import React from 'react'
import { ListGroup, ListGroupItem, Col, Row } from 'reactstrap';

const propTypes = { getCart: PropTypes.array.isRequired };
let specialAmount = 0;

/* const offerTotal = this.props.getCart.reduce((p, x)=>x.special?p:p+x.price ,0)
const nonOfferTotal = this.props.getCart.reduce((p, x)=>x.special?p+x.price:p ,0) */

const CheckoutMiniSummary = ({ getCart, selectorTotalAmountCart, totalDelivery, gst, gstperc, discount, nonOfferTotal, offerTotal }) => (
  <ListGroup>
    <ListGroupItem>Order Summary</ListGroupItem>
    <small><ListGroupItem>
    {
      getCart.map(x=> 
     x.special ?"":  <Row key={x._id}>
          <Col xs='8'><p>x{x.quantity} {x.title}</p></Col>
          <Col  className="text-right" xs='4'><p>Rs.{x.price}</p></Col>
        </Row>
      )
    }

    {
      getCart.map(x=> 
     x.special ?  <Row key={x._id}>
          <Col xs='8'><p>x{x.quantity} {x.title}</p></Col>
          <Col className="text-right" xs='4'><p>Rs.{x.price}</p></Col>
        </Row> : ""
      )
    }
    </ListGroupItem>
   
   {/*  {nonOfferTotal> 0 && 
     <ListGroupItem> 
      <Row>
        <Col xs='8'><p>Non offer total:</p></Col>
        <Col xs='4'><p>Rs. {nonOfferTotal.toFixed(2)} </p></Col>
      </Row>
      </ListGroupItem>}
     
      
     {offerTotal>0 && 
     <ListGroupItem>
       <Row>
        <Col xs='8'><p>Offer total:</p></Col>
        <Col xs='4'><p>Rs. {offerTotal.toFixed(2)} </p></Col>
      </Row>
      </ListGroupItem>}  */}
    
    <ListGroupItem>
      <Row>
        <Col xs='7'><p>Offer Subtotal</p></Col>
        <Col className="text-right" xs='5'><p>Rs. {selectorTotalAmountCart.toFixed(2)}</p></Col>
      </Row>

       Tax Break-up
      <Row>
  <Col xs='8'><p>GST {gstperc}%</p></Col>
  <Col xs='4'  className="text-right"><p>Rs. {gst.toFixed(2)}</p></Col>  
      </Row>
     
      <Row>
        <Col xs='8'><p>Shipping</p></Col>
        <Col xs='4' className="text-right"><p>Rs. {totalDelivery}</p></Col>
      </Row>
          
    </ListGroupItem>
    </small>
    <ListGroupItem>
      <Row>
        <Col xs='4'><p>Total</p></Col>
        <Col className="text-right" xs='8'><b style={{fontSize: '25px'}}>Rs.{(selectorTotalAmountCart+specialAmount+totalDelivery-(nonOfferTotal*(discount/100))).toFixed(2)}</b></Col>
      </Row>      
    </ListGroupItem>
   
  </ListGroup>
);

CheckoutMiniSummary.propTypes = propTypes;

export default CheckoutMiniSummary;
