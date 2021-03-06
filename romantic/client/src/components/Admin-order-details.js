import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input , Col, Row} from 'reactstrap';
import moment from 'moment'
export default class AdminOrderDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      fromdate: '',
      todate: '',
      loading:false
    }
  }

  async componentDidMount() {
    /* try {
      const response = await axios.get('/api/orders')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    } */
  }
  onSubmit= (fromdate, todate)=>{
      this.setState({loading:true})
    const  from = new Date(fromdate);
    const  to = new Date(todate);
        axios.post('/api/ordersdate',
        {fromdate: from, todate: to})
        .then(response => {                    
            this.setState({apiList:response.data})
      this.setState({loading:false})

          })
              
  }


onChangeFromDate = (e)=>{this.setState({fromdate:e.target.value})}
onChangeToDate = (e)=>{this.setState({todate:e.target.value}) && alert(this.state.todate)}
onChangeFromDateX = (e)=>{this.setState({fromdate:e})}
onChangeToDateX = (e)=>{this.setState({todate:e})}
pastMonth = ()=>{this.setState({fromdate:moment.utc(Date.now()).local().subtract(1, 'months').format("YYYY-MM-DD")}) , this.setState({todate:moment.utc(Date.now()).local().format("YYYY-MM-DD")}), this.onSubmit(this.state.fromdate, this.state.todate) }
pastYear = ()=>{this.setState({fromdate:moment.utc(Date.now()).local().subtract(1, 'years').format("YYYY-MM-DD")}) , this.setState({todate:moment.utc(Date.now()).local().format("YYYY-MM-DD")}), this.onSubmit(this.state.fromdate, this.state.todate) }
pastDay = ()=>{this.setState({fromdate:moment.utc(Date.now()).local().subtract(1, 'days').format("YYYY-MM-DD")}) , this.setState({todate:moment.utc(Date.now()).local().format("YYYY-MM-DD")}), this.onSubmit(this.state.fromdate, this.state.todate) }
pastWeek = ()=>{this.setState({fromdate:moment.utc(Date.now()).local().subtract(1, 'weeks').format("YYYY-MM-DD")}) , this.setState({todate:moment.utc(Date.now()).local().format("YYYY-MM-DD")}), this.onSubmit(this.state.fromdate, this.state.todate) }


render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    return (        
     <div style={{paddingTop: '50px', paddingBottom:'50px', background: "#fff", fontSize:"12px"}}>
      <div className="container">
            <form>
        <Row form>
        <Col md={5}>
                <label>Enter start date:</label><Input type="date" value={this.state.fromdate} onChange={this.onChangeFromDate}></Input>
        </Col>
        <Col md={5}>
         <label>Enter End date:</label><Input type="date" value={this.state.todate} onChange={this.onChangeToDate}></Input>
        </Col> 
        <Col md={1}>
         <Button className="mt-4" onClick={()=>this.onSubmit(this.state.fromdate, this.state.todate)}>Get Orders</Button>
        </Col> 
        <Col md={1}>
        {this.state.loading && <span className="fa fa-spinner fa-spin"/>}
        </Col>
        </Row>
        <Row className="my-4">
          <Col md="3">
            <Button className="black-btn" onClick={()=>this.pastDay()}>Past Day</Button>
          </Col>
          <Col md="3">
            <Button className="black-btn" onClick={()=>this.pastWeek()}>Past Week</Button>
          </Col>
          <Col md="3">
            <Button className="black-btn" onClick={()=>this.pastMonth()}>Past Month</Button>
          </Col>
          <Col md="3">
            <Button className="black-btn" onClick={()=>this.pastYear()}>Past Year</Button>
          </Col>
          
          
        </Row>
            </form>
        </div>
       <h1>Customer orders - {apiList.length} </h1>
       {apiList.length == 0?<h1> No orders yet</h1> : 
      <Table responsive striped hover size="sm" style={{fontFamily:'Roboto' , size:'12'}}>
        <thead style={stylesTab1}>
          <tr >
            <th>#</th>
            <th>Ref</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Order</th>
            <th>Order Amount</th>
            <th>Delivery Amount</th>
            <th>Email</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Province</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {
          apiList.map((x, index)=>
            <tr key={x._id}>
              <th scope="row">{index+1}</th>         
              <td>{x.ref}</td>
              <td>{x.payment==undefined?"Not paid":"Paid"}</td>
              <td>{moment.utc(x.createdAt).local().format("DD-MM-YYYY, h:mm:ss a")}</td>
              <td>{x.order.map(item=> <div>{`x${item.quantity} ${item.idItem}(${item.titleItem}[${item.selectedSize}, ${item.selectedColor}] Rs.${item.price}) `}</div>)}</td>
              <td>{'Rs.'+x.totalAmount}</td>
              <td>{'Rs.'+x.totalDelivery}</td>
              <td>{x.customerinfo.email}</td>
              <td>{x.customerinfo.lastName}</td>
              <td>{x.customerinfo.firstName}</td>
              <td>{x.customerinfo.country}</td>
              <td>{x.customerinfo.city}</td>
              <td>{x.customerinfo.province}</td>
              <td>{x.customerinfo.postalCode}</td>
              <td>{x.customerinfo.phoneNumber}</td>
              <td>{x.customerinfo.address1 + ' ' +x.customerinfo.address2}</td>
            </tr>
            )
          }
        </tbody>
      </Table>
  }
      </div>
    )
  }
};
