import React, { Component } from 'react';
import axios from 'axios';
import { Table, ModalHeader, Modal, ModalBody, Button , Badge} from 'reactstrap';
import{Link} from 'react-router-dom';
import moment from 'moment'

export default class AdminTableOrders extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      current:1,
      modal:false,
      sending:false
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/orders')
      const apiList = await response.data;
      this.setState({ apiList:apiList.reverse() })
    } catch (error) {
      console.log(error);
    }
  }

  getAPI = ()=>{
    this.setState({apiList:[]})
    axios.get('/api/orders')
    .then(data=>{

      this.setState({ apiList:data.data.reverse() })
    })
  }


 approveOrder = (id)=>{
  this.setState({sending:true})
    
  axios.post('/api/approveorder/'+id, {
    status:'approved'
  })
    axios.post('/mail/mail',{
      user:this.state.apiList[this.state.current].customerinfo.email,
      subject : "Vastram Fashions - Order has been Approved",
      html:"<h4 align=center>Your order ("+this.state.apiList[this.state.current].ref+") has been approved.</h4><br><p> You will get your order delivered within "+this.state.expdelivery==undefined?"3-4":this.state.expdelivery+ " business days.</p><br><br><a href='https://vastramfashions.com/order/"+this.state.apiList[this.state.current].ref+"'> Check your order status</a>"
    })
    .then((data)=>{
      this.setState({sending:false})
      this.setState({modal:false})
      this.getAPI();
    })
  }

  cancelOrder = (id)=>{
    var r = window.confirm("Are you sure you want to cancel this order?");
if (r == true) {
  this.setState({sending:true})
      
    axios.post('/api/approveorder/'+id, {
      status:'cancelled'
    })
      axios.post('/mail/mail',{
        user:this.state.apiList[this.state.current].customerinfo.email,
        subject : "Vastram Fashions - Order has been Cancelled",
        html:"<h4 align=center> We regret to inform yout that your order ("+this.state.apiList[this.state.current].ref+") has been cancelled.</h4><br><p> This was not intentional and has arised from either a lack of availability or technical error from our side. Your amount will be refunded shortly. </p><br><br><a href='tel:8095958811'> Call us for assistance</a>"
      })
      .then((data)=>{
        this.setState({sending:false})
        this.setState({modal:false})
        this.getAPI();
      })
    } 
    }

  deliverOrder = (id)=>{
    this.setState({sending:true})
    axios.post('/api/approveorder/'+id, {
      status:'delivered'
    })
    this.setState({sending:false})
    axios.post('/mail/mail',{
        user:this.state.apiList[this.state.current].customerinfo.email,
        subject : "Vastram Fashions - Order was delivered",
        html:"<h2 align=center>Your order ("+this.state.apiList[this.state.current].ref+") was delivered. We hope you had a great experience shopping with us. For feedback or complaints contact <a href='tel:0820-2528724'>0820-2528724</a>. Drop in a review so we can serve you better  ."
      })
      .then((data)=>{
        this.setState({sending:false})
        this.setState({modal:false})
        this.getAPI();
    })
  }
  current = (index)=>{
    this.setState({current:index})
    this.setState({modal:!this.state.modal})
  }
  
  changeExpDelivery = (e)=>{this.setState({expdelivery:e.target.value})}
  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state

    
    return (
     <div style={{paddingTop: '50px', marginBottom:'150px', background: "#fff", fontSize:"12px"}}>
       <h1 className="d-inline mr-3 pb-5">Total Orders - {apiList.length} Orders</h1> 
       <Button className="mb-4 black-o-btn" onClick={()=>this.getAPI()}>
         <span className={this.state.apiList<1 ?"fa fa-spinner fa-spin":"fa fa-refresh "} />
         {apiList.length == 0?" Loading ":" Refresh "}</Button>
       {apiList.length == 0?<h1> No orders yet</h1> : 
      <Table responsive striped hover size="sm">
        <thead style={stylesTab1}>
          <tr >
            <th>#</th>            
            <th>Ref</th>
            <th>Payment Status</th>
            <th>Date</th>
            <th>Order Amount</th>
            <th>Name</th>
            <th>Status</th>
 
          </tr>
        </thead>
        <tbody>
        {
          apiList.map(
            (x, index)=>          
              <tr style={{cursor:'pointer'}} key={x._id} onClick={()=>this.current(index)}>
              <th scope="row">{index+1}</th>              
              <td>{x.ref}</td>
              <td>{x.payment==undefined?"not Paid": "Paid"}</td>
              <td>{moment.utc(x.createdAt).local().format("DD-MM-YYYY, h:mm:ss a")}</td>            
              <td>{'Rs.'+(x.totalAmount).toFixed(2)}</td>
          <td>{x.customerinfo.firstName + " "+ x.customerinfo.lastName}</td>
              <td>{x.approved===undefined?<Badge color="warning">Pending</Badge>:x.approved==="approved"?<Badge color="warning">Approved</Badge>:x.approved==="delivered"?<Badge color="success">Delivered</Badge>:<Badge color="danger" className="fa fa-warning">Error</Badge> }</td>       
            </tr>
            )
          }
        </tbody>
      </Table>
  }
  {this.state.apiList.length == 0?"":
  <Modal isOpen={this.state.modal} backdrop={true} toggle={()=>this.current(0)}>
    <ModalHeader>
      <small>id:{apiList[this.state.current].ref}</small><small>{apiList[this.state.current].approved===undefined?<Badge color="warning">Pending</Badge>:apiList[this.state.current].approved==="approved"?<Badge color="warning">Approved</Badge>:apiList[this.state.current].approved==="delivered"?<Badge color="success">Delivered</Badge>:apiList[this.state.current].approved==="cancelled"?<Badge color="danger">Cancelled</Badge>:<Badge color="danger" className="fa fa-warning"> Error</Badge>  }</small>
    </ModalHeader>
    <ModalBody>
      <div className="row my-1">
    {apiList[this.state.current].order.map((item)=>{
      return(
        <div className="col-md-10 offset-1 shadow-sm rounded border my-2 px-2">x {item.quantity} - 
        <b><Link to={`/item/${item.itemId}/${item.titleItem.split(' ').join('-')}`}>{item.titleItem}</Link></b>
       <small><p>Size: {item.selectedSize+" | Color: "+item.selectedColor}</p>
     </small>
        </div>
    )
    })}  
    <div className="col-md-10 py-3 px-2 my-2">
    <p><small>Ordered on:</small>{moment.utc(apiList[this.state.current].createdAt).local().format("DD-MM-YYYY, h:mm:ss a")}</p>       
    <p><small>Total Amount:</small><b>{apiList[this.state.current].totalAmount}</b></p> 
    {apiList[this.state.current].approved ===undefined ? <div><Badge color="warning" className="rounded ">Pending</Badge> <br/>
    expected delivery (in days):<input type="text" value={this.state.expdelivery} onChange={this.changeExpDelivery}/>


    <Button className="mt-5" color="success" onClick={()=>this.approveOrder(apiList[this.state.current]._id)}>
        Approve Order
    </Button>

    <Button color="danger" className="mt-5 ml-4" onClick={()=>this.cancelOrder(apiList[this.state.current]._id)}>
       Cancel Order
    </Button>  
    <span className={this.state.sending?"fa fa-spinner fa-spin mt-5 ml-4":""}/></div> :

    apiList[this.state.current].approved ==="approved"? <div><Badge color="primary" className="rounded ">Approved</Badge><Button onClick={()=>this.deliverOrder(apiList[this.state.current]._id)}>
      <span className={this.state.sending?"fa-gear fa-spin":''}/>Delivery Completed</Button>    </div>:
    apiList[this.state.current].approved ==="delivered"? <Badge color="success" className="rounded ">Delivered</Badge>:
    apiList[this.state.current].approved ==="cancelled"? <Badge color="danger" className="rounded ">Cancelled</Badge>: <small className="text-danger fa fa-warning">Error</small>
     }

    </div>
    </div>
    <div className="row my-1 px-2">
    
        <Table  style={{fontFamily:'Open Sans , sans-serif', fontSize:'1rem'}}> 
          <tbody>
           <tr><td>Email: </td><td>{apiList[this.state.current].customerinfo.email}</td></tr>
           <tr><td>Name: </td><td>{apiList[this.state.current].customerinfo.firstName +' '+ apiList[this.state.current].customerinfo.lastName}</td> </tr>        
           <tr><td>Address: </td><td>{apiList[this.state.current].customerinfo.address1 + ' ' +apiList[this.state.current].customerinfo.address2 +' '+apiList[this.state.current].customerinfo.city +' '+ apiList[this.state.current].customerinfo.province  +' '+ apiList[this.state.current].customerinfo.postalCode }</td></tr>            
             <tr><td>Phone No.: </td><td>{apiList[this.state.current].customerinfo.phoneNumber}</td></tr>
          </tbody>
        </Table>             
    </div>
    </ModalBody>
  </Modal>
  }
      </div>
    )
  }
};
