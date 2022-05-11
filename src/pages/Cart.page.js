import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementAnItem, editAttribute, incrementAnItem, removeFromCart } from '../actions/cart.action';
import CartItem from '../components/CartItem.component';
import {PageHeader} from "./../components/PageHeader.component"

export class Cart extends Component {

  constructor(){
    super();

    this.state = {
      products: {}
    }
  }

  componentWillMount(){
    this.setState({
      products : this.props.products,
      totalCost: 0
    })
    this.calculateTotal(this.props.products);
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      products : nextProps.products
    })
    this.calculateTotal(this.props.products);
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
      <div className='page'>
        <div className='cart'>
        <PageHeader category="CART"/>

          { 
            this.state.products &&  this.state.products.map((item,key) => <CartItem key={key} 
                                                                index={key} 
                                                                item={item} 
                                                                currency={this.props.activeCurrency} 
                                                                increment={this.props.incrementCartItem}
                                                                decrement ={this.props.decrementCartItem}
                                                                remove ={this.props.removeFromCart}
                                                                editAttributes={this.props.editAttribute}
                                                                calculate={this.handleItemCalculate.bind(this)}/>)
          }

          {this.state.products.length > 0 && <div className='cart-total' style={{borderTop: "solid 1px #ccc"}}>
                <h4>Total</h4>
                <h4>{this.props.activeCurrency && this.props.activeCurrency.symbol} {this.state.totalCost.toFixed(2)}</h4>
          </div>}

          {this.state.products.length > 0 && <Link to='/checkout'  className='button bg-primary'>check out</Link>}
          {
            this.state.products.length <= 0 &&  <h1>Cart is Empty</h1>
          }
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ 
  return({
    products: state.cart.products,
    activeCurrency: state.currency.activeCurrency,
    effect: state.cart.effect
  })
}

function mapDispatchToProps(dispatch){
  return{
    incrementCartItem: (id) => dispatch(incrementAnItem(id)),
    decrementCartItem: (id) => dispatch(decrementAnItem(id)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    editAttribute: (item, attribute) => dispatch(editAttribute(item, attribute))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);