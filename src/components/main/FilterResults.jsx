import React, { Component } from 'react'

export default class FilterResults extends Component {
    constructor() {
        super()
        this.state = {
            product: []
        };
    }
    fetchProduct() {
        fetch(`http://rmit.chickenkiller.com:8080/products/byType/${this.props.match.params.productType}`)
            .then(res => res.json())
            .then(json => this.setState({ product: json }));
    }
    componentDidMount() {
        this.fetchProduct();
    }
  render() {
      console.log(this.props.match.params.productType)
      console.log(this.state.product)
    return (
      <div>
        
      </div>
    )
  }
}
