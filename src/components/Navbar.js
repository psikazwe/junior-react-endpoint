import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { currenyToggle, hideCurrency } from '../actions/currency.action';
import { hideCart, showCart, toggleCart} from './../actions/cart.action';
import {  route, setCategories } from './../actions/navbar.action';
import brand from "./../assets/brand.svg";
import cart from "./../assets/cart.svg";
import chevronD from "./../assets/chevron-down.svg";


export class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className='nav'>
          <div className='links'>
              <ul>
                  {
                    this.props.categories.map( (category, key) => (
                      <Link to="/" key={key}>
                        <li className={this.props.activeCategory.index === key ? "active" : ""} 
                          onClick={ () => { 
                            this.props.hideCart(); 
                            this.props.hideCurrency();
                            this.props.route({
                              index: key,
                              details: category
                            });
                          }}>{category.name}</li>
                      </Link>
                    ) )
                  }
              </ul>                
          </div>


          <div className='site'>
              <img src={brand}/>
          </div>

          <div className='buttons'>
              <div className='currency' onClick={() => {
                this.props.toggleCurrency();
                this.props.hideCart();
              }} >
                  <div className='button-block'>{this.props.activeCurrency && this.props.activeCurrency.symbol}</div>
                  <div className='button-block'><img src={chevronD}/></div>
              </div>

              <div className={this.props.cart ? 'cart active' : "cart"}>
                  <div className='button-block' onClick={ () =>{ 
                    this.props.toggleCart(); 
                    this.props.hideCurrency();
                  }}><img src={cart}/> <span className='meta'>{this.props.productCount}</span></div>
              </div>

          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  const cart = state.cart.show;
  const categories = state.link.categories
  const products = state.cart.products;
  const productCount = state.cart.productCount;
  const activeCategory = state.link.activeCategory;
  const showCurrency= state.currency.show;
  const activeCurrency = state.currency.activeCurrency
  return {
    showCurrency,
    activeCurrency,
    cart,
    products,
    productCount,
    activeCategory,
    categories
  }
}
function mapDispatchToProps(dispatch){
  return{
    showCart: () => dispatch(showCart()),
    hideCart: () => dispatch(hideCart()),
    hideCurrency: () => dispatch(hideCurrency()),
    toggleCart: () => dispatch(toggleCart()),
    toggleCurrency: () => dispatch(currenyToggle()),
    route: (data) => dispatch(route(data)),
    setCategories: (data) => dispatch(setCategories(data)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);