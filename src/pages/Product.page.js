import { gql } from '@apollo/client';
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { addToCart, removeFromCart } from '../actions/cart.action';
import Attributes from '../components/Attributes';
import { client } from '../config';
import "./../style/productPage.css";

export class Product extends Component {
  constructor(){
    super();
    this.state =({
      product: null,
      incart: false,
      imageIndex: 0,
      price: null,
      attributes: {}
    });
  }

  componentWillMount(){
    client.query({
      query: gql`
        {
          product(id: "${this.props.params.id}"){
            id,
              name,
              brand,
              inStock,
              gallery,
            description,
            category,
            attributes{
              id,
              name,
              type,
              items{
                displayValue,
                value,
                id
              }
            },
              prices{
                currency{
                  symbol,
                  label
                },
                amount
              }
          }
        }
      `,
    }).then( response => {
      this.setState({
        product: response.data.product
      });
      this.inCart(response.data.product.id, this.props.products)
      this.getPrice(this.props.currency.symbol);
    }).catch(error =>{
      console.log(error)
    });

  }

  componentWillReceiveProps(nextProps){
    this.getPrice(nextProps.currency.symbol);
    this.inCart(nextProps.params.id, nextProps.products);
  }

  inCart(id, products) {
    let found = false;
    products.forEach( prod => {
      if(prod.id === id){
        this.setState({
          incart: true
        })
        found = true;
        return;
      }
    });

    !found && this.setState({
      incart: false
    })
  }
  

  getPrice(symbol){
    this.state.product && this.state.product.prices.forEach(price =>{
        if(price.currency.symbol === symbol){
            this.setState({
                price: price
            })
        }
    })
  }

  switchImage(index){
    this.setState({
      imageIndex: index
    })
  }

  selectAttribute(cat, attribute){
    let category = cat.replace(/ /g,"");

    let isSet = false;
    for( let [key, value] of Object.entries(this.state.attributes)){
      if(key === category ){
        isSet = true;
        //attribute already present. change the value
        let attributeCopy = this.state.attributes;
        attributeCopy = { ...attributeCopy, [key] : attribute}
        this.setState({
          attributes : attributeCopy
        });
      }
    }

    //if attribute is not set
    if(!isSet){
      let newAttribute = {
        [category] : attribute
      }
      let attributeSet = Object.assign(this.state.attributes, newAttribute);

      this.setState({
        attributes: attributeSet
      })
    }
  }


  isAttribute(cat,attribute){
    let category = cat.replace(/ /g,"");
    for( let [key, value] of Object.entries(this.state.attributes)){
      if(key === category && value == attribute ){
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <>
      {
        this.state.product ?
            <div  className='page'>
              <div className='product-container item'>
                <div className='product-image-list'>
                    {
                      this.state.product.gallery && this.state.product.gallery.map( (image, key) => <img src={image} className={this.state.imageIndex === key ? "active" : ''} loading="lazy" onClick={()=>this.switchImage(key)} key={key}/>)
                    }
                </div>
      
                <div className='product-image'>
                    <img src={this.state.product.gallery[this.state.imageIndex]} />
                </div>
      
                <div className='product-details'>
                  <div>
                    <h1>{this.state.product.brand}</h1>
                    <h2>{this.state.product.name}</h2> 
                  </div>
                  
                  <div>
                  {this.state.product.attributes.map( (attribute, key) => <Attributes attributes={attribute} setAttribute={this.selectAttribute.bind(this)}  isSet={this.isAttribute.bind(this)} key={key}/>)}
                  </div>

                  <div>
                    <div>
                      <h2>PRICE:</h2>
                      <h1>{this.state.price && this.state.price.currency.symbol} {this.state.price && this.state.price.amount}</h1>
                    </div>
                  </div>
      
                  {
                    !this.state.product.inStock ?
                    <div className='button bg-dark' style={{pointerEvents: 'none'}}>OUT OF STOCK</div>
                    :
                    <>{
                      this.state.incart ?
                      <div className='button bg-dark' onClick={()=>{
                        this.props.removeFromCart(this.state.product);
                        this.setState({
                          incart: false
                        })
                      }}>Remove from cart</div>

                      : <div className='button bg-primary' onClick={()=> {
                        this.props.addToCart(this.state.product, this.state.attributes);
                        this.inCart(this.state.product.id, this.props.products);
                      }}>Add to Cart</div>
                    }</>
                  }
      
                  <div className='html-description' dangerouslySetInnerHTML={cleanMarkUp(this.state.product.description)}>
                    
                  </div>
      
                </div>
              </div>
      
            </div>
        
        :
        <h1>Product not Found</h1>
      }
      </>

    )
  }
}



function cleanMarkUp(data){
  return{__html: data}
}

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
      <WrappedComponent
          {...props}
          params={params}
      />
  );
};

function mapStateToProps(state){
  return({
    products: state.cart.products,
    currency: state.currency.activeCurrency,
  })
}
function mapDispatchToProps(dispatch){
  return{
    addToCart: (item, attributes) => dispatch(addToCart(item, attributes)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));