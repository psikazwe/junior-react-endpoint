import React, { Component } from 'react'
import Attributes from './Attributes';

export class CartItem extends Component {
  constructor(){
    super();

    this.state = {
      price: null,
      quantity: 0,
      attributes: {}
    }
  }

  componentWillMount(){
    this.getPrice(this.props.currency.symbol);
    this.setState({
      quantity: this.props.item.quantity,
      attributes: this.props.item.selectedAttributes,
    });
  }
  componentWillReceiveProps(nextProps){
    this.getPrice(nextProps.currency.symbol);
    this.setState({
      quantity: nextProps.item.quantity,
      attributes: nextProps.item.selectedAttributes,
    });
  }



  getPrice(symbol){
    this.props.item.prices.forEach(price =>{
        if(price.currency.symbol === symbol){
            this.setState({
                price: price
            })
        }
    })
  }

  incrementQuantity(){
    let value = this.state.quantity + 1
    this.setState({
      quantity: value
    });
    this.props.increment(this.props.index);
    this.props.calculate();
  }

  decrementQuantity(){
    let value = this.state.quantity;
    if(value > 1){
      value = value - 1;
      this.setState({
        quantity: value
      });
      this.props.decrement(this.props.index);
    }
    else{
      this.props.remove(this.props.item); 
    }
    this.props.calculate();
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

        this.props.editAttributes(this.props.index, attributeCopy);
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
      });
      this.props.editAttributes(this.props.index, attributeSet);
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
      <div className='cart-item'>
          <div className='cart-item-details '>
              <div className='cart-item-row name'>
                  <h2><strong>{this.props.item.brand}</strong><br/>{this.props.item.name}</h2>
                  <button className='cart-item-button' onClick={()=>this.incrementQuantity()}>+</button>
              </div>
              
              <div className='cart-item-row price'>
                  <h2>{this.state.price && this.state.price.currency.symbol} {this.state.price && this.state.price.amount}</h2>
                  <div>{this.state.quantity}</div>
              </div>
              
              <div className='cart-item-row size'>
                  <div className='cart-item-button-container'>
                    <div>
                      {this.props.item.attributes.map( (attribute) => <Attributes attributes={attribute} setAttribute={this.selectAttribute.bind(this)}  isSet={this.isAttribute.bind(this)}/>)}
                    </div>
                    
                  </div>
                  <button className= {this.state.quantity > 1 ? 'cart-item-button' : 'cart-item-button bg-dark'} onClick={()=>this.decrementQuantity()}>-</button>
              </div>
          </div>

          <div className='item-image'>
            <img src={this.props.item.gallery[0]} />
          </div>
      </div>
    )
  }
}

export default CartItem;