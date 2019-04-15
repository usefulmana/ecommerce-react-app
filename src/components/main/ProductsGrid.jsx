import React, { Component } from 'react'
import styled from 'styled-components'
import {ProductConsumer} from './context'
import Header from '../secondary/Header';
import NavBar from '../secondary/NavBar';
import Footer from '../secondary/Footer';
import { Link } from 'react-router-dom';
import UpButton from '../secondary/UpButton';
import Product from '../secondary/Product';
const url = 'http://rmit.chickenkiller.com:8080/products';
export default class ProductsGrid extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
            id: '',
            name: '',
            brand: '',
            price: '',
            description:'',
            pageOfItems: []
        };
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
      console.log(this.state)
    return (
    <ProductsGridWrapper>
        <Header />
        <NavBar />
            <div className="row bg-light">
                <div className="col-lg-4 text-muted">
                    <p> ALL PRODUCTS </p>
                </div>
                <div className="col-lg-8 text-right">
                    <Link to="/">
                        <a className="text-muted">HOME</a>
                    </Link>
                    /
            <Link to="/viewProducts">
                        <a className="text-muted">ALL PRODUCTS</a>
                    </Link>
                </div>
            </div>
            <div>
                <hr />
                <div className="views">
                    <Link to="/viewProducts">
                        <button
                            className="btn text-muted"
                            type="button"
                            data-toggle="tooltip"
                            title="Grid View"
                        >
                            <i className="fas fa-th" />
                        </button>
                    </Link>
                    <Link to="/viewProductList">
                        <button
                            className="btn text-muted"
                            type="button"
                            data-toggle="tooltip"
                            title="List View"
                        >
                            <i className="fas fa-list" />
                        </button>
                    </Link>
                </div>
                <hr />
            </div>
            <div>
                {this.state.product.map(p => (
                    <Product
                        name={p.name}
                        price={p.price}
                        brand={p.brand}
                        imageUrl={p.imageUrl}
                        description={p.description}
                    />
                ))}
            
            </div>
        <UpButton/>
        <Footer/>
    </ProductsGridWrapper>
    )
  }
}


const ProductsGridWrapper = styled.div`
.col-lg-4 {
    padding-top:2rem;
    padding-bottom:1rem;
    padding-left:4rem;
}
.col-lg-8{
    padding-top:2rem;
    padding-bottom:1rem;
    padding-right:4rem;
}
.col-lg-8 a{
    margin-left:0.2rem;
    margin-right:0.2rem;
}`