import React, { Component } from 'react'

const url ='http://rmit.chickenkiller.com:8080/products';
const ProductContext = React.createContext();
class ProductProvider extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    };
    fetchProduct() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ products: json }));
    }
    componentDidMount() {
        this.fetchProduct();
    }
    handleDetail = () => {console.log('Hello from Detail')}
  render() {
    return (
      <ProductContext.Provider value={{...this.state}}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}
 const ProductConsumer = ProductContext.Consumer;

 export {ProductProvider, ProductConsumer};