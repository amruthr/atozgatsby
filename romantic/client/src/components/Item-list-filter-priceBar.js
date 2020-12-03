import PropTypes from 'prop-types';
import React , { useState, useEffect }from 'react';
import { FaSigma } from 'react-icons/fa';
import Slider from 'react-rangeslider';
import '../style/rangeslider.min.css';
 
const propTypes = {
  actionPriceRangeFilter: PropTypes.func.isRequired,
  reducerPriceRangeFilter: PropTypes.number.isRequired,
};

const styles = {
  display: 'flex',
  justifyContent: 'space-around'
};

const ProductListFilterPriceBar = ({
  actionPriceRangeFilter, 
  reducerPriceRangeFilter,
}) => {
  
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const z = query.get('pricecap')
    actionPriceRangeFilter(parseInt(z))
  },[]);
    return(<div>
      <Slider      
        max={6000}
        step={1}
        value={reducerPriceRangeFilter}
        onChange={actionPriceRangeFilter}
  
      />
      <div style={styles}>
        <span>
          min 
        </span>
        <span>
          max
        </span>
      </div>
    </div>
  )};

ProductListFilterPriceBar.propTypes = propTypes;

export default ProductListFilterPriceBar;