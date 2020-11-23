import React from 'react';
import {Button} from 'reactstrap';
import {FiHome} from 'react-icons/fi';

const Empty = () =><div className=" mb-5 pt-5" style={{minHeight:'100vh',width:'100%',   backgroundImage: 'linear-gradient(10deg, #000c, #000) ,url(/images/bg.jpg)',
backgroundSize: 'contain',}}>
<div className="d-flex flex-column  text-center justify-content-center align-content-center text-white">
    <div className="col-md-6 offset-3">
        <span className="display-1 font-weight-bold  golden">404.</span>
     <p>The page you requested was not found.</p>
<Button onClick={()=>window.location.href="/"} className="black-o-btn mt-5"> <FiHome/>Go to Homepage </Button> 
 </div></div></div>;


export default Empty;
