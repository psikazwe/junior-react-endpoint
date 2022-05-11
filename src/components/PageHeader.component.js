import React, { Component } from 'react'

export class PageHeader extends Component {
  render() {
    return (
        <div className='header'>
          <h1>{this.props.category}</h1>
      </div>
    )
  }
}

export default PageHeader