import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';

const propTypes = {
  dispatchSize: PropTypes.func.isRequired,
  sortSizeForFilter: PropTypes.string.isRequired
};

const availableSizes = ['All', 'XL', 'L', 'M', 'S', 'XS'];

const ItemsListFilterSize = ({dispatchSize, sortSizeForFilter}) => 
    availableSizes.map(x=>
      <Button outline={sortSizeForFilter !== x}  style={{color:sortSizeForFilter == x?"#fff":"#000", background:sortSizeForFilter !== x?"#fff":"#000",margin:'10px', height:'45px', width:'45px', borderRadius:'30px', border:'solid 2px #000'}}onClick={()=> dispatchSize(x)} key={x}>{x}</Button>);

ItemsListFilterSize.propTypes = propTypes;

export default ItemsListFilterSize;
