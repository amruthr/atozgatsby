import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import {
  isBrowser,  isMobile, BrowserView
} from "react-device-detect";
import {FaHeart, FaShoppingBag} from 'react-icons/fa'
import { connect } from 'react-redux'
import { oneKeywordForFilter, resetKeywords} from '../actions/DataFetchingActions';
import { selectorTotalItemsCart } from '../selectors/selector_list_statistics';
import CheckoutMiniSummaryPreview from '../components/Checkout-mini-summary-preview'; 
import Submenu from '../components/Submenu';
import {TiThMenu, TiTimes} from 'react-icons/ti'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Badge,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { FiSearch } from 'react-icons/fi';

const styles = {
  
  itemMen: {
    color: '#000!important',
    fontFamily:'Jost',
    padding: isMobile?'0px': '0px',
    listStyleType: 'none'
  },
  arrowDown: {
    display: 'block',
  },

  textNone:{
    display:'block',
    background: '#000',
    textShadow: "0px",
    textAlign: 'center',
    margin: '1px 0px',
    width:'30vw',
    borderRadius:'15px',
    padding:'0px !important'
  },
}

const arrowStyleSubmenu = (subMenuCategorySelected, gender, arrowDown) => subMenuCategorySelected === gender && <div style={arrowDown}></div>

class NavbarContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subMenuOpen: false,
      subMenuCategorySelected: '',
      openCartPreview: false,
      navitems : [],      
      logo:"/images/rom-logo.png",
      navcolor:'#000'
    };
  }
  componentDidMount() {
    fetch('/api/navcategory')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
        this.setState({
          navitems: data.map(item=>({
            catname: item.catname,   
            catid :item._id,   
            image: item.images[0],
            subcats: item.subcats,
          }))
        });
      });
  }
 
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubMenuEnter = (x) => {
    this.setState({
      subMenuOpen: true,
      subMenuCategorySelected: x
    })
    
  }

  handleSubMenuExit = () => {
    this.setState({
      subMenuOpen: false,
      subMenuCategorySelected: ''
    })
  }

  

  render() {  
    const { sendOneKeyword, getCart, resetKeywords, totalItemsSelectorStats } = this.props
    const { isOpen, subMenuCategorySelected, subMenuOpen, openCartPreview } = this.state
    const { men, women, children, partyWear, casuals, vastram_specials, } = this.props.categoriesProducts
    const { itemMen, arrowDown, } = styles
    const {navitems} = this.state
    const itemMenu = {
      color: '#b29660!important',
      padding: isMobile?'20px 10px': '5px 10px',
      listStyleType: 'none',
      background:isMobile?this.state.navcolor:"#000",
      margin:'0px 10px'
    }
    const navbarBackground ={
      backgroundColor: this.state.navcolor,
      boxShadow: '0px 4px 10px #0003',
      zIndex: 1, 
    }
    const textBanner ={
      textShadow: "0px",
      textAlign: 'center',
      color:'black',
      fontFamily:'Jost',
      fontSize:'42px',
      marginRight: '200px',
      background: this.state.navcolor,
      width:'7vw',
      borderRadius:'15px',
      padding: '0px',
    }
    const categoriesNavItems = gender =>
  
    isBrowser ?            
      (
        
      <NavItem style={itemMenu} key={gender.catid} onMouseEnter={()=>this.handleSubMenuEnter(gender.catname)} >
        <NavLink to={`/category/${gender.catid}`} style={{color:'#fff'}} onClick={()=>resetKeywords()}>{gender.catname}</NavLink> {arrowStyleSubmenu(subMenuCategorySelected, gender, arrowDown)}
      </NavItem>)
      :
      (<NavItem style={itemMenu}>
      <NavLink to={`/category/${gender.catid}`} key={gender.catid} style={{color:'#fff', textTransform:'uppercase', background:this.state.navcolor}} onClick={()=>{return (resetKeywords(), this.toggle())}}>{gender.catname}</NavLink>
    </NavItem>)

const mobilecart = <div style={{position:'relative'}} className="mr-3">
 <Link to="/cart" style={{textDecoration:'none', color:'#fff'}}> <FaShoppingBag size={25}  />
<small style={{position:'absolute', left:'20px', bottom:'0px'}}>    <Badge color="danger" pill style = {totalItemsSelectorStats==0?{display: 'none'}:{display: 'block'}}>
      {totalItemsSelectorStats}
    </Badge></small></Link>
  </div>

    const cartNavItem = 
    isBrowser ?  
      (
      <Nav className="ml-auto" navbar style={{cursor: 'pointer'}}>
        <NavItem>
         <div style={{position:'relative', color:'#000', background:'#fff', width:'40px', height:'40px', borderRadius:'30px', padding:'7px'}}>
           <FaShoppingBag size={24}  onClick={()=>this.setState(totalItemsSelectorStats==0?{ openCartPreview: openCartPreview }:{ openCartPreview:!openCartPreview })} />
           <small style={{position:'absolute', left:'20px', bottom:'0px'}}>
             <Badge color="danger" pill style = {totalItemsSelectorStats==0?{display: 'none'}:{display: 'block'}}>
                {totalItemsSelectorStats}
             </Badge>
           </small>
        </div>
      </NavItem>
      <NavItem>
         <div style={{position:'relative', color:'#000', background:'#fff', width:'40px', height:'40px', borderRadius:'30px', padding:'7px', marginLeft:'20px'}}>
           <FaHeart size={24}  onClick={()=>this.setState(totalItemsSelectorStats==0?{ openCartPreview: openCartPreview }:{ openCartPreview:!openCartPreview })} />           
        </div>
      </NavItem>
      {
      openCartPreview && <div style={{position: 'fixed', width:'200px', right:'0', top: '6.3%'}} onClick={()=>this.setState({openCartPreview:!this.state.openCartPreview})} >
      <CheckoutMiniSummaryPreview empty={getCart.length === 0 && true} getCart={getCart}/>
      </div>
      }
    </Nav>
    ) : 
    
    <NavItem style={itemMenu}>
      <NavLink to='/cart' style={{color:'#fff', background:this.state.navcolor}} onClick={this.toggle}>Cart</NavLink></NavItem>

     const subMenuHoverBrowser =""
    //  subMenuOpen && isBrowser && 
      /*   <Submenu 
          style={{top:'100px'}}
          gender={subMenuCategorySelected} 
          itemsListByGender={subMenuCategorySelected === 'men' ? men : women} 
          sendOneKeyword={sendOneKeyword} 
          handleSubMenuExit={this.handleSubMenuExit}
          navitems = {navitems}
        /> */
const search =  <InputGroup style={{width:isMobile?'100%':'30%', margin:isMobile &&'20px 2px', marginRight:isBrowser &&'100px'}}>
<Input style={{ backgroundColor: 'white', color:'Black', border:'0px',borderRadius:'20px 0px 0px 20px', width:'50%'}} placeholder="Search for brand, Category or Product"></Input>
<InputGroupAddon addonType="append">
   <InputGroupText style={{borderRadius:'0px 20px 20px 0px',background:'#fff',border:'none'}}>
     <FiSearch/>            
   </InputGroupText>
</InputGroupAddon>
</InputGroup>

    return (
      <div className="sticky-top">
        <Navbar expand="md" style={navbarBackground}> {isMobile && mobilecart}
          <Link to="/" style={itemMen} className="text-white">
            <div style={isMobile?styles.textNone:textBanner}>
              <img src= {this.state.logo} style= {{width: "100%", verticalAlign:'initial'}}/>
            </div>
          </Link> 
      <NavbarToggler  onClick={this.toggle} style={{outline:'none', color:'#fff'}}>
        {this.state.isOpen?<TiTimes/>:<TiThMenu/>} 
      </NavbarToggler>
           {!isMobile && search}
          <Collapse isOpen={isOpen} navbar style={{background:this.state.navcolor, color:'#000', fontWeight:'bolder', fontFamily:'Jost'}} >
          {isMobile && search}
             <NavItem style={itemMenu}  >
               <NavLink to={`/contact`} style={{color:'#fff'}}>CONTACT </NavLink>
             </NavItem>
             <NavItem style={itemMenu}  >
               <NavLink to={`/track-order`} style={{color:'#fff'}}> TRACK ORDER </NavLink>
             </NavItem>
             <NavItem style={itemMenu}  >
               <NavLink to={`/locator`} style={{color:'#fff'}}> STORE LOCATOR </NavLink>
             </NavItem>           
            { isMobile && navitems.map(x=>
                    categoriesNavItems(x)
            )}            
            {cartNavItem}
           {isMobile && <img  loading="lazy"  src= "/images/india.jpg" style= {{textAlign:'center', width: "5vw", borderRadius:'0px', margin:'20px 0vw 5px 80vw'}}/>}
        </Collapse>
       <BrowserView> <div style={{width:'10vw',display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
         <img  loading="lazy" src= "/images/india.jpg" style= {{width: "30%", borderRadius:'1px', marginLeft:'60px'}}/>      
      </div></BrowserView>
        </Navbar>

        {subMenuHoverBrowser}
      </div>
    );
  }
};


const mapStateToProps = state => ({
  categoriesProducts: state.categoriesProducts,
  getCart: state.cartReducer,
  totalItemsSelectorStats: selectorTotalItemsCart(state)
});

const mapDispatchToProps = dispatch => ({
  sendOneKeyword: x => dispatch(oneKeywordForFilter(x)),
  resetKeywords: () => dispatch(resetKeywords())
});


export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
