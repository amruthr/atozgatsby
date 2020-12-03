import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment';
import {FiHome, FiPrinter, FiTruck} from 'react-icons/fi'
import {GoVerified, GoPackage} from 'react-icons/go'

import StarRatings from "react-star-ratings";
import LoadingGif from './Loading-gif'
import {
  BrowserView,
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import {Container, Row, Col, Button} from 'reactstrap';
import Particles from 'react-particles-js';
class order extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/api/orders/${this.props.match.params.pid}`)
      const apiList = await response.data;
      !apiList ?  window.location.href = "/notfound":'';
      this.setState({ apiList })          
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    return (
     <div style={{paddingTop: '20px', paddingBottom:'20px', minHeight:'100vh',  background: "#fff",}}>
      <div className="d-flex flex-row p-1  my-3 justify-content-center align-items-center"> 
     
     <GoVerified  className="display-4" style={{color:this.state.apiList.approved==undefined || this.state.apiList.approved=="approved" || this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} /><hr  style={{width:'20vw',margin: '1rem 2rem'}}  />
     <FiTruck className="display-4" style={{color:this.state.apiList.approved=="approved"|| this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} /><hr  style={{width:'20vw',margin: '1rem 2rem'}}  />
     <GoPackage className="display-4" style={{color:this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} />
   </div>
    <div id="printableForm" className="d-flex flex-column px-5" style={{textAlign:'center', alignItems:'center', justifyContent:'center', }}>
         
         <p>   Thank you for shopping with us.<br/> Your order has been {this.state.apiList.approved==undefined?"placed": this.state.apiList.approved}. </p>           
      </div>
      
      <div className=" d-none d-md-block d-print-block">
       {apiList.length == 0?<h1> <LoadingGif/></h1> : 
      <div className="container my-2 px-md-5 ">
         <Row className="px-5"><Col md="10">
        <p className="font-weight-bold">Vastram boutique</p>
                <p className="my-1">Pailands Building, 2nd Floor</p>
                <p className="my-1">Opp. Hampankatta Post Office, PM Rao Road</p>
                <p className="my-1">Hampankatta Mangaluru - 575001</p>
                <p className="my-1">Ph: 0824 4258811</p>
                </Col>
              <Col md="2"> 
              <img src="/images/vlogo.jpg" width="100" />
              </Col> </Row>
          <Row className="px-5 my-4"><Col md="6" className="text-left" >            
                <p className="font-weight-bold">Recipient:</p>
                <p className="my-1">{this.state.apiList.customerinfo.firstName+" "+this.state.apiList.customerinfo.lastName}  </p>
                <p className="my-1">{this.state.apiList.customerinfo.address1 + ' ' +this.state.apiList.customerinfo.address2}  </p>
                <p className="my-1">{this.state.apiList.customerinfo.city}  </p>
                <p className="my-1">{this.state.apiList.customerinfo.postalCode}  </p>
              </Col>
              <Col md="6" className="text-right" >
                <p className="font-weight-bold mb-1">{this.state.apiList.ref} </p>
                <p className="my-1">Ph.:{this.state.apiList.customerinfo.phoneNumber}  </p>
                <p className="my-1">Email:{this.state.apiList.customerinfo.email}  </p>
                <p className="my-1">{moment.utc(this.state.apiList.createdAt).local().format("DD-MM-YYYY, h:mm:ss a")}</p>
                <p className="my-1">{this.state.apiList.payment == undefined? "Payment: Not Processed": "Payment: successful"}</p>
                <h4 className="my-2 font-weight-bold">Order Status:{this.state.apiList.approved==undefined?"placed": this.state.apiList.approved}  </h4>
               
              </Col></Row>
              <hr/>
              
              <table className="table table-bordered my-5">
              <tr>
                       <th className="w-35">Item Name</th>
                       <th style={{width:'15%'}}>Item ID</th>
                       <th style={{width:'10%'}}>Quantity</th>
                       <th style={{width:'10%'}}>Size</th>
                       <th style={{width:'10%'}}>Color</th>
                       <th style={{width:'10%'}}>Price</th></tr>
             {this.state.apiList.order.map(item=>
                
                   <tr>
                       <td className="w-35">{item.titleItem}</td>
                       <td style={{width:'15%'}}><small>{item.idItem}</small></td>
                       <td style={{width:'10%'}}>x{item.quantity}</td>
                       <td style={{width:'10%'}}>{item.selectedSize}</td>
                       <td style={{width:'10%'}}>{item.selectedColor}</td>
                       <td style={{width:'10%'}}>₹{item.price}</td></tr>
                )}
                </table>
              <table className="offset-6 mt-5" style={{width:'50%'}}>
              <tr><td  align="left">Amount:</td><td align="right" colspan="2">{'Rs.'+(parseInt(this.state.apiList.totalAmount)/100).toFixed(2)}</td></tr>
              <tr><td  align="left">Delivery Amount:</td><td align="right" colspan="2">{'Rs.'+parseInt(this.state.apiList.totalDelivery)}</td></tr>
              <tr><td  align="left">Net Total: </td><td align="right" colspan="2" className="font-weight-bold">{'Rs.'+(parseInt((this.state.apiList.totalAmount)/100+this.state.apiList.totalDelivery)).toFixed(2)}</td></tr>
              </table>
               </div>
  }</div>
  <Container> 
  <Row className="d-flex text-center justify-content-around  mt-5">
  <Col md="6" className="mb-5"><Button onClick={()=>window.location.href="/"} className="black-o-btn d-print-none"><FiHome className="mx-2"/> Go to Homepage </Button> </Col>
  <Col md="6"><Button onClick={()=>window.print()} className="black-o-btn d-print-none"><FiPrinter  className="mx-2"/> Print Order form</Button> </Col>
</Row> </Container>
      </div>
    )
  }
};
export default order;