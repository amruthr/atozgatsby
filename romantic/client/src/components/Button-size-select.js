import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const propTypes = {
  handleSizeSelection: PropTypes.func.isRequired,
  sizesArray: PropTypes.array.isRequired,
  selectedSize: PropTypes.string.isRequired,
  validateSizeSelection: PropTypes.func.isRequired
};

class ButtonSizeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
componentDidMount(){
  this.props.sizesArray.length>=1 && this.props.sizesArray[0]!=''?'': this.props.handleSizeSelection('free size') && this.props.validateSizeSelection('valid')
  this.props.sizesArray.length==1 && this.props.handleSizeSelection(this.props.sizesArray[0]) && this.props.validateSizeSelection('valid')
}
  render() {
    const { handleSizeSelection, sizesArray, sizedetailsArray ,selectedSize, validateSizeSelection} = this.props;
    const dropDownList =    sizesArray.length>=1 && sizesArray[0]!=''? sizesArray.map((x, i)=>
      <Button style={{height:'55px', margin:'0px 10px', width:'55px', borderRadius:'50px',background:selectedSize==x?'#000':'#fff', color:selectedSize==x?'#fff':'#000', border:'solid 2px #000'}}
      onClick={()=>{return (handleSizeSelection(x), validateSizeSelection('valid'))}}>
     { sizesArray.length>=1 && x }{ sizesArray.length>=1 && sizedetailsArray[i]}
      </Button>
    ) : " "

    return (    
      <div>
        <h4>Select Size:{selectedSize && selectedSize }</h4><br/>
          {dropDownList}
      </div>
    );
  };
};

ButtonSizeSelect.propTypes = propTypes;

export default ButtonSizeSelect;