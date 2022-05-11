import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader } from '../components/PageHeader.component';
import { getProducts, filterProducts } from '../actions/products.action';
import ProductItem from '../components/ProductItem.component';

export class Category extends Component {
  componentWillMount(){
    this.props.filterProducts(this.props.activeCategory.details.name);
  }
  componentWillReceiveProps(nextProps){
    this.props.filterProducts(nextProps.activeCategory.details.name);
  }

  render() {
    return (
      <div className='page'>

        <PageHeader category={this.props.activeCategory.details.name}/>

        <div className='products-container'>
          {
            this.props.products && this.props.products.products.map((product, index) => (
              <ProductItem key={index} item={product} products={this.props.cartProducts} currency={this.props.currency}/>
            ))
          }
        </div>

      </div>
    )
  }
}
function MapStateToProps(state){
  const activeCategory = state.link.activeCategory;
  const products = state.products.activeCategory;
  const currency = state.currency.activeCurrency;
  const cartProducts = state.cart.products;
  return{
      activeCategory,
      products,
      cartProducts,
      currency
  }
}

function MapDispatchToProps(dispatch){
  return{
      filterProducts : (category) => dispatch(filterProducts(category)),
      getProducts : (category) => dispatch(getProducts(category))
   }
}
export default connect(MapStateToProps, MapDispatchToProps)(Category)