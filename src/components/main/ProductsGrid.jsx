import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../secondary/Header';
import NavBar from '../secondary/NavBar';
import Footer from '../secondary/Footer';
import { Link } from 'react-router-dom';
import UpButton from '../secondary/UpButton';
import Product from '../secondary/Product';
import PriceSlider from '../secondary/PriceSlider';
import Paginate from '../secondary/Paginate'

const url = 'http://rmit.chickenkiller.com:8080/products';
export default class ProductsGrid extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
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
            <Link to="/productGridView">
              <a className="text-muted">ALL PRODUCTS</a>
            </Link>
          </div>
        </div>
        <div>
          <hr className="line-top" />
          <div className="row">
            <div className="price-slider mx-auto">
              <PriceSlider />
            </div>
            <div className="views">
              <Link to="/viewProducts">
                <button
                  className="btn text-muted grid-btn"
                  type="button"
                  data-toggle="tooltip"
                  title="Grid View"
                >
                  <i className="fas fa-th" />
                </button>
              </Link>
              <Link to="/viewProductList">
                <button
                  className="btn text-muted list-btn"
                  type="button"
                  data-toggle="tooltip"
                  title="List View"
                >
                  <i className="fas fa-list" />
                </button>
              </Link>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <div className="row items">
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
          </div>
          <div className="paginate"><Paginate items={this.state.product} onChangePage={this.onChangePage} /></div>
        </div>
        <UpButton />
        <Footer />
      </ProductsGridWrapper>
    );
  }
}

const ProductsGridWrapper = styled.div`
.items div{
  margin-left: 1.5rem;
}
.paginate{
  margin-top: 7rem;
  margin-left: 50rem;
}
  .price-slider {
    margin-top: 0.6rem;
    padding-bottom: 1rem;
  }
  .grid-btn {
    color: #ff4c3b !important;
    background: transparent;
  }
  .list-btn {
    background: transparent;
  }
  .line-top {
    margin-top: 0;
  }
  .views {
    margin-left: 105rem;
    margin-top: -2.8rem;
  }
  .col-lg-4 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 4rem;
  }
  .col-lg-8 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-right: 4rem;
  }
  .col-lg-8 a {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .row {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;
