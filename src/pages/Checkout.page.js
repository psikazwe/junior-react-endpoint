import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, hideCart } from '../actions/cart.action';

export class Checkout extends Component {
    constructor(){
        super();
        this.state={
          totalCost: 0
        }
      }

    componentWillMount(){
        this.props.hide();
        this.calculateTotal(this.props.cartProducts);
    }

    componentWillReceiveProps(nextProps){
    this.calculateTotal(nextProps.cartProducts);
    }

  
  calculateTotal(products){
    let total = 0;
    products.length > 0 && products.forEach(product =>{
      product.prices.forEach(price =>{
        if(price.currency.symbol === this.props.currency.symbol){
         total += (price.amount * product.quantity);
        }
      });
    });
    this.setState({
      totalCost: total
    })
  }

  render() {
    return (
      <div className='page center'>
          <div align="center">

            {
            this.props.cartProducts.length > 0 ? <><p>Checkout</p>
                <h3>{this.props.cartProducts.length} {this.props.cartProducts.length > 1 ? "Items": "Item"}</h3>
                <br/>
                <p>costing</p>
                <h3>{this.props.currency.symbol} {this.state.totalCost}</h3>
                <br/>
                <button className='button bg-primary' style={{paddingLeft: 20, paddingRight: 20}} onClick={() => this.props.clear()}>checkout</button>
                <br/>
                <Link to="/cart">View items</Link></> 
                :
                <>
                    <h2>Nothing to Checkout</h2>
                    <br/>
                    <Link to="/">Back to shop</Link>
                </>
                
            }
          </div>
      </div>
    )
  }
}
function MapStateToProps(state){
  const currency = state.currency.activeCurrency;
  const cartProducts = state.cart.products;
  return{
      cartProducts,
      currency
  }
}

function MapDispatchToProps(dispatch){
  return{
      hide: () => dispatch(hideCart()),
      clear: () => dispatch(clearCart())
   }
}
export default connect(MapStateToProps, MapDispatchToProps)(Checkout)