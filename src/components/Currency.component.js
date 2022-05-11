import React, { Component } from 'react'
import { connect } from 'react-redux';
import { hideCurrency, setCurrency } from '../actions/currency.action';

export class Currency extends Component {
  render() {
    return (
    <>
        <div className={this.props.showCurrency ? 'void active' : 'void'} onClick={()=>this.props.hideCurrency()}/>
        <ul className={this.props.showCurrency ? 'currency-dropdown active': 'currency-dropdown'}>
            {
                this.props.currencies && this.props.currencies.map((currency, index) => <li className='currency' onClick={()=>{
                        this.props.setCurrency(currency);
                        this.props.hideCurrency();
                    }} key={index}>
                        <span>{currency.symbol}</span>
                        <span>{currency.label}</span>
                    </li>)
            }
        </ul>
    </>
    )
  }
}

function mapStateToProps(state){
    return({
        showCurrency: state.currency.show,
        currencies: state.currency.currencies
    })
}
function mapDispatchToProps(dispatch){
    return{
        hideCurrency: ()=> dispatch(hideCurrency()),
        setCurrency: (data) => dispatch(setCurrency(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency)