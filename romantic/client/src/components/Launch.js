import { Table, Container, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Confetti from 'react-dom-confetti';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';



const Launch = () => {

  const [isOpen, setIsOpen] = useState(false);

    const history = useHistory();
  
    function handleClick() {
      setIsOpen(true);
      setTimeout(function(){ history.push("/");}, 2000); 
    }
  
  
  const config = {
    angle: "90",
    spread: "560",
    startVelocity: "31",
    elementCount: "200",
    dragFriction: 0.13,
    duration: "4060",
    stagger: "3",
    width: "7px",
    height: "7px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  return (
    
    <div className="d-flex justify-content-center align-items-center flex-column" style={{minHeight:'90vh',  backgroundImage: 'linear-gradient(10deg, #000, #000c) ,url(/images/bg.jpg)', backgroundSize: 'contain',}}>
      <h4 className="golden">Vastram E - Store<br/></h4>
      <Confetti active={isOpen} config={ config } />
      <img width="500" src="/images/vlogo.jpg"></img>
      <Button size="lg" onClick={handleClick} className="mt-5 black-o-btn">Launch Now</Button>
      
      </div>
  )

}


export default Launch;
