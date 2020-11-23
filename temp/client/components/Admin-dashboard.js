import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile , getUA, deviceDetect} from "react-device-detect";
import { Row , Col, Button, Container} from 'reactstrap';
import CountUp from 'react-countup';
import {Doughnut, Bar} from 'react-chartjs-2'
import moment from 'moment'
export default class AdminDashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/orders')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    const totalAmount = (apiList.reduce((acc, x) => (acc + (x.totalAmount)), 0))
    const totalGST = (apiList.reduce((acc, x) => (acc + (x.totalAmount>100?x.totalAmount*0.12:x.totalAmount*0.05)), 0))
    const totalDelivered =   (apiList.reduce((acc, x) => (acc + (x.approved=="delivered"?1:0)), 0))
    const totalApproved =   (apiList.reduce((acc, x) => (acc + (x.approved=="approved"?1:0)), 0))
    const totalCancelled =   (apiList.reduce((acc, x) => (acc + (x.approved=="cancelled"?1:0)), 0))
    const totalPending =   (apiList.reduce((acc, x) => (acc + (x.approved==undefined?1:0)), 0))
    const feb =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="01"?1:0)), 0))
    const jan =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="02"?1:0)), 0))
    const mar =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="03"?1:0)), 0))
    const apr =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="04"?1:0)), 0))
    const may =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="05"?1:0)), 0))
    const jun =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="06"?1:0)), 0))
    const jul =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="07"?1:0)), 0))
    const aug =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="08"?1:0)), 0))
    const sep =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="09"?1:0)), 0))
    const oct =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="10"?1:0)), 0))
    const nov =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="11"?1:0)), 0))
    const dec =   (apiList.reduce((acc, x) => (acc + (moment.utc(x.createdAt).local().format("MM")=="12"?1:0)), 0))

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }

    const card = {
        background:'#fff',
        borderRadius:'5px',
        boxShadow:'1px 1px 20px lightgray',
        width:'auto',
        color:'#7b0b9c' ,
        padding:'10px', margin:'10px',
        borderBottom:'solid 2px #2a1f83'
    }
    const big={
        fontSize:'32px',
        fontFamily:'montserrat',
        textAlign:'right',
        fontWeight:'400'
    }
    const data = {
      labels: ['Approved', 'Cancelled', 'Delivered', 'Pending'],
      datasets: [
        {
          label: 'total Orders',
          data: [totalApproved, totalCancelled, totalDelivered, totalPending],
          backgroundColor: [
            '#FF6633', '#FFB399', '#FF33FF', '#FFFF99',
          ]
        },
      ],
    }

    const monthsData = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: 'total Orders',
          data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
          backgroundColor: [
            '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
          ]
        },
      ],
    }

    return (
     <div style={{paddingTop: '50px', paddingBottom:'50px', background: "#fff", fontSize:"12px"}}>
       <h1>Vastram Dashboard</h1>      
    <Container> <Row> <Col md="6" className="my-4"> <Doughnut data={data} /></Col>
           <Col md="6" className="my-4"> <Bar data={monthsData} /></Col>
     </Row> </Container>
       {apiList.length == 0?<h1> No orders yet</h1> : <Row className='container'>
      <Col sm="4"  className="container" style={card}><p style={{width:'100%'}}>Total Orders:
            <CountUp delay={1} end={apiList.length} style={big}> {apiList.length}</CountUp></p>
            <Button  className="black-btn" size="sm" outline={false} style={{margin:'10px'}} onClick={this.props.changeTab}> Show all orders</Button>
            <Button className="black-btn"  size="sm" onClick={this.props.changexTab}  style={{margin:'10px'}} > Show Custom orders</Button>

      </Col>
      <Col sm="4" style={card} primary = "darkred">Total Amount:
            <CountUp delay={1} decimals={2} end={totalAmount} style={big}>Rs.{totalAmount}</CountUp></Col>
      <Col sm="3" style={card} primary = "purple" >Total GST:
            <CountUp delay={1} decimals={2} end={totalGST} style={big}> Rs.{totalGST}</CountUp></Col>

    </Row>}
   
    <Row className="container">
        <Col sm="2" style={card} primary = "dodgerblue" onClick={this.props.change5Tab}>
            Promotions & Trending
        </Col>  
        <Col sm="2" style={card} primary = "darkred" onClick={this.props.change7Tab}>
            User Reviews
        </Col> 
        <Col sm="2" style={card} primary = "coral" onClick={this.props.change6Tab}>
            Categories and sub - categories
        </Col>  
        
    </Row>
      </div>
    )
  }
};
