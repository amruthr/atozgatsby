import React,  { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavbarContainer from './containers/Navbar-container';
import BasicFooter from './components/BasicFooter';
/* import Empty from './components/Empty'; */
import './style/transition.css';
import './style/shimmer.css';

const Loading = () =>
 <div className="animate dark" style={{display:'flex', flexFlow:'column wrap', justifyContent:'center', alignItems:'center', height:'100vh'}}><p>Loading...</p></div>;

const ItemsListContainer =  lazy(() => import('./containers/Items-list-container'));
const ItemContainer =  lazy(() => import('./containers/Item-container'));
const CheckoutContainer =  lazy(() => import('./containers/Checkout-container'));
const CartContainer =  lazy(() => import('./containers/Cart-container'));
const HomepageContainer =  lazy(() => import('./containers/Homepage-container'));
const SubcatsList =  lazy(() => import('./components/Subcats-list'));
const AdminContainer =  lazy(() => import('./containers/Admin-container'));
const Secret =  lazy(() => import('./components/Secret'));
const review =  lazy(() => import('./components/review'));
const order =  lazy(() => import('./components/order'));
const Empty =  lazy(() => import('./components/Empty'));
const Launch =  lazy(() => import('./components/Launch'));

const Router = () => (
  <div>
    <NavbarContainer />
      
      
      <Suspense fallback={Loading()}>
      <Switch>
        <Route exact path='/' component={HomepageContainer} />
        <Route exact path='/productslist' component={ItemsListContainer} />       
        <Route exact path='/item/:id/:item' component={ItemContainer} />
        <Route exact path='/checkout' component={CheckoutContainer} />
        <Route exact path='/cart' component={CartContainer} />
        <Route exact path='/launch' component={Launch} />
        <Route exact path='/productslist/:gender' component={ItemsListContainer} />
        <Route exact path='/brand/:brand' component={ItemsListContainer} />
        <Route exact path='/category/:gender' component={SubcatsList} />
        <Route exact path='/admin' component={AdminContainer} />
        <Route exact path='/dashboard' component={Secret} />
        <Route exact path='/dashboard/:id' component={Secret} />
        <Route exact path='/review/' component={review} />
        <Route exact path='/review/:id' component={review} />
        <Route exact path='/order/:pid' component={order} />
        <Route  component={Empty}/>
      </Switch>
      </Suspense>     
    <BasicFooter />
  </div>
);

export default Router;
