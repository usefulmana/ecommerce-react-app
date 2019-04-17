import React, { Component } from 'react'
import Product from './Product';
import Paginate from './Paginate';

const url = 'http://rmit.chickenkiller.com:8080/products';
export default class PaginateTest extends Component {
    constructor(){
        super();
        this.state = {
            product: [],
            pageOfItems: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {

        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    fetchProduct() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ product: json }));
    }
    componentDidMount() {
        this.fetchProduct();
    }
  render() {
    return (
      <div>
            <div className="container">
                <div className="text-center">
                    {this.state.pageOfItems.map(item =>
                        <div key={item.id}><Product
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            brand={item.brand}
                            imageUrl={item.imageUrl}
                            description={item.description}
                        /></div>
                    )}
                    <Paginate items={this.state.product} onChangePage={this.onChangePage} />
                </div>
            </div>
      </div>
    )
  }
}
