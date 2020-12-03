import PropTypes from 'prop-types';
import React, { Component }  from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';


const propTypes = {
  colors: PropTypes.array.isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
  validateColorSelection: PropTypes.func.isRequired,
};

const styles = (x, selectedColor) => ({
  backgroundColor: x, 
  margin:'3px', 
  width: '40px', 
  height: '40px',
  borderRadius:'20px', 
  display: 'inline-block',
  position:'relative',
  cursor: 'pointer',
  border: 'solid 1px white',
  boxShadow: x === selectedColor ? '0px 0px 6px 1px rgba(0,0,0,1)' : '' 
});


class ButtonsColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  };
  componentDidMount(){
    this.props.colors.length>0?'':this.props.handleColorSelection('not specified') && this.props.validateColorSelection('valid')
    this.props.colors.length == 1 ?  this.props.handleColorSelection(this.colorname(this.props.colors[0])):""
  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  color = (x) =>{
    return x.includes("#")? x.substr(x.indexOf('#'), x.length- 1): x 
   }
  colorname = (x)=>{
   return x.includes("#")? x.substr(0, x.indexOf('#')) : x
   }
   
render(){ 
  const {colors, 
  handleColorSelection, 
  selectedColor, 
  validateColorSelection } = this.props   
 const dropDownList = 
    colors.length>0?
  colors.map(x =>
 <div className="d-flex flex-column justify-content-left align-items-center p-1 my-1"
   onClick={()=>{return (handleColorSelection(this.colorname(x)),
  validateColorSelection('valid'), this.toggle())}} style={{background:selectedColor==x?"#000":'#fff', borderRadius:'10px', margin:'0px 10px', color:selectedColor==x?"#fff":'#000'}}>
    <div key={x}    
     style={styles(this.color(x), selectedColor)} />
     <small className="my-1"> {this.colorname(x)}</small> 
     </div>
 )
     :
     <div style={styles('MultiColor', selectedColor)} />

     
return (
 
  <div >
        <h4>Select Color:{selectedColor && this.colorname(selectedColor) }</h4><br/>
        <div className="d-flex flex-row">
      {dropDownList}
      </div>
  </div>
);
     };

     };

ButtonsColorSelect.propTypes = propTypes;

export default ButtonsColorSelect;
