import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from './pages/Category.page';
import Product from './pages/Product.page';
import Cart from './pages/Cart.page';
import Splash from './pages/Splash.screen';
import { connect } from 'react-redux';
import { loadingApp, loadingCategories, loadingProducts } from './actions/app.action';
import { route, setCategories } from './actions/navbar.action';
import { client } from "./config";
import { gql } from "@apollo/client";
import Error from './pages/Error.page';
import Navbar from './components/Navbar';
import MiniCart from './pages/MiniCart.page';
import { filterProducts, getProducts } from './actions/products.action';
import Currency from './components/Currency.component';
import { setCurrencies, setCurrency } from './actions/currency.action';
import CheckoutPage from './pages/Checkout.page';

export class App extends Component {

  constructor(){
    super();
  }

  componentWillMount(){
    //fetch shop categories
    client.query({
      query: gql`
          query{
              categories{
                  name
              }
          }
          `
      }).then(results => {
            this.props.setCategories(results.data.categories);
            this.props.route({
              index: 0,
              details: results.data.categories[0]
            });
            this.props.loadingCategories(false);
      }).catch( error =>{
        console.log(error)
        this.props.loadingApp(false);
    });

    //fetch shop products
    client.query({
      query: gql`
        {categories{
          name
          products{
            id,
            name,
            brand,
            inStock,
            gallery,
            prices{
              currency{
                symbol,
                label
              },
              amount
            }
          }
        }}
        `
      }).then(results => {
        this.props.loadingProducts(false);
        this.props.getProducts(results.data.categories);
        this.props.filterProducts(this.props.activeCategory.details.name);
      }).catch( error =>{
        console.log(error)
    });

    //fecth currencies
    client.query({
      query: gql`
        {
          currencies{
            label,
            symbol
          }
        }
      `
    }).then(results =>{
      this.props.setCurrencies(results.data.currencies)
      this.props.setCurrency(results.data.currencies[0])
    })


  }

  render() {
    if(this.props.app.appLoading && (this.props.app.categoriesLoading || this.props.app.productsLoading)) return (<Splash />);

    if(!this.props.app.appLoading && (this.props.app.categoriesLoading || this.props.app.productsLoading)) return (<Error />);

    if(this.props.app.appLoading && !this.props.app.categoriesLoading && !this.props.app.productsLoading) return (<>
      <Navbar />
      <Currency />
      {this.props.cart && <MiniCart/>}
      <Routes>
        <Route path='/' element={ <Category />}/>
        <Route path='/product/:id' element={ <Product />}/>
        <Route path='/cart' element={ <Cart />}/>
        <Route path='/checkout' element={ <CheckoutPage />}/>
      </Routes>
    </>);
  }
}

function mapStateToProps(state){
  return({
    cart: state.cart.show,
    app: state.app,
    activeCategory: state.link.activeCategory
  })
}

function mapDispatchToProps(dispatch){
  return{
    loadingApp : (state) => dispatch(loadingApp(state)),
    loadingCategories : (state) => dispatch(loadingCategories(state)),
    loadingProducts : (state) => dispatch(loadingProducts(state)),

    setCategories: (data) => dispatch(setCategories(data)),
    getProducts: (data) => dispatch(getProducts(data)),
    filterProducts: (category) => dispatch(filterProducts(category)),
    route: (data) => dispatch(route(data)),

    setCurrencies:  (data) => dispatch(setCurrencies(data)),
    setCurrency: (data) => dispatch(setCurrency(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);