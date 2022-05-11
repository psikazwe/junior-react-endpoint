import React, { Component } from 'react';
import "./../style/productItem.css";
import cart from "./../assets/cart-white.svg";
import { Link } from 'react-router-dom';

export class ProductItem extends Component {
    constructor(){
        super();
        this.state= {
            incart: false,
            price: null,
        }
    }

    componentDidMount(){
        this.inCart(this.props.item.id, this.props.products);
        this.props.currency && this.getPrice(this.props.currency.symbol);
    }

    componentWillReceiveProps(nextProps){
        this.getPrice(nextProps.currency.symbol);
        this.inCart(nextProps.item.id, nextProps.products)
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
        this.props.item.prices.forEach(price =>{
            if(price.currency.symbol === symbol){
                this.setState({
                    price: price
                })
            }
        })
    }

  render() {
    return (
        <Link to={"/product/"+this.props.item.id}>
        <div className='product-item'>

            {!this.props.item.inStock && <div className='stock'>
                <h3>OUT OF STOCK</h3>
            </div>}

            <div className='product-image'>
                <img src={this.props.item.gallery[0]} loading="lazy"/>
            </div>

            <div className='product-details'>

                {this.state.incart && <div className='add-to-cart-button'>
                    <img src={cart}/>
                </div>}

                <h2>{this.props.item.brand} {this.props.item.name}</h2>
                <h1>{this.state.price && this.state.price.currency.symbol} {this.state.price && this.state.price.amount}</h1>
                
            </div>
        </div>
        </Link>
    )
  }
}

export default ProductItem;