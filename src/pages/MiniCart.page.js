import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.component';

import { showCart, hideCart, toggleCart, incrementAnItem, decrementAnItem, removeFromCart, editAttribute} from "./../actions/cart.action"

class MiniCart extends Component {
  constructor(){
    super();
    this.state={
      totalCost: 0
    }
  }
  componentWillMount(){
    this.calculateTotal(this.props.products);
  }

  componentWillReceiveProps(nextProps){
    this.calculateTotal(nextProps.products);
  }

  calculateTotal(products){
    let total = 0;
    products.length > 0 && products.forEach(product =>{
      product.prices.forEach(price =>{
        if(price.currency.symbol === this.props.activeCurrency.symbol){
         total += (price.amount * product.quantity);
        }
      });
    });
    this.setState({
      totalCost: total
    })
  }

  handleItemCalculate(){
    this.calculateTotal(this.props.products);
  }

  render() {
    return (
      <>
        <div className='void active' onClick={ () => this.props.hideCart()}/>
        <div className='cart-dropdown'>
            <div className='flex cart-header'>
              <h3>My Bag,</h3><span>{this.props.productCount} items</span>
            </div>
            {
              this.props.products.length <= 0 ? 
                <h1 className='empty'>No Items selected</h1>
              :
                <div></div>
            }
            
            {this.props.products.map((item,key) => <CartItem key={key} 
                                                              index={key} 
                                                              item={item} 
                                                              currency={this.props.activeCurrency} 
                                                              increment={this.props.incrementCartItem}
                                                              decrement ={this.props.decrementCartItem}
                                                              remove ={this.props.removeFromCart}
                                                              editAttributes={this.props.editAttribute}
                                                              calculate={this.handleItemCalculate.bind(this)}/>)
            }
 
            {this.props.products.length > 0 && <>
              <div className='cart-total'>
                  <h4>Total</h4>
                  <h4>{this.props.activeCurrency && this.props.activeCurrency.symbol} {this.state.totalCost.toFixed(2)}</h4>
              </div>

              <div className='cart-buttons'>
                  <Link to='/cart' style={{flex: 1}}>
                    <button 
                      className='button' 
                      style={{width: '100%'}}
                      onClick={ () => this.props.hideCart()}
                    >view bag</button>
                  </Link>
                  <Link to='/checkout'  style={{flex: 1}} className='button bg-primary'>check out</Link>
              </div>
            </>}
        </div>      
      </>

    )
  }
}


function mapStateToProps(state){
  const products = state.cart.products;
  const productCount = state.cart.productCount;
  const activeCurrency = state.currency.activeCurrency
  return {
    products,
    productCount,
    activeCurrency
  }
}
function mapDispatchToProps(dispatch){
  return{
    showCart: () => dispatch(showCart()),
    hideCart: () => dispatch(hideCart()),
    toggleCart: () => dispatch(toggleCart()),
    incrementCartItem: (id) => dispatch(incrementAnItem(id)),
    decrementCartItem: (id) => dispatch(decrementAnItem(id)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    editAttribute: (item, attribute) => dispatch(editAttribute(item, attribute))

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart)