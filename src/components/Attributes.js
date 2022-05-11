
import React, { Component } from 'react';
class Attributes extends Component{
    constructor(){
      super();
    }
  
    // componentWillMount(){
    //   let cat = this.props.attributes.id
    //   let attr = this.props.attributes.items[0].id
    //   this.props.setAttribute(cat, attr)
    // }
  
    render(){
  
      if(this.props.attributes.name === 'Color'){
         return(
          <>
            <h2 className='art-header'>{this.props.attributes.name}:</h2>
            <div className='attribute'>
              {this.props.attributes.items.map( (art, key) => <button key={key} className={this.props.isSet(this.props.attributes.id, art.id) ? 'cart-item-button color active' : 'cart-item-button color'}  style={{
                backgroundColor: art.value
              }} onClick={() => this.props.setAttribute(this.props.attributes.id,art.id)}></button>)}
            </div>
          </>
        )
      }
  
      else{
        return(
          <>
            <h2 className='art-header'>{this.props.attributes.name}:</h2>
            <div className='attribute'>
              {this.props.attributes.items.map( (art, key) => <button key={key} className={this.props.isSet(this.props.attributes.id, art.id) ? 'cart-item-button active' : 'cart-item-button'} onClick={() =>this.props.setAttribute(this.props.attributes.id,art.id)}>{art.value}</button>)}
            </div>
          </>
        )
      }
     
    }
}

export default Attributes