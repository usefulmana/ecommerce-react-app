import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from 'react-image-resizer';

const url = 'http://rmit.chickenkiller.com:8080/products';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      products: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  fetchProduct() {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ products: json }));
  }
  componentDidMount() {
    this.fetchProduct();
    this.refs.search.focus();
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <SearchWrapper>
        <div>
          <div className="search">
            <div className="search-bar">
              <input
                type="text"
                value={this.state.searchString}
                ref="search"
                onChange={this.handleChange}
                placeholder="     Search"
              />
            </div>
            <div>
              {this.state.products
                .filter(searchingFor(this.state.query))
                .slice(0, 3)
                .map(l => {
                  return (
                    <div className="row">
                      <div className="col-12 mt-3">
                        <div className="card">
                          <div className="card-horizontal">
                            <div className="image-square-wrapper">
                              <Link to={`/viewDetail/${l._id}`}>
                                {' '}
                                <Image
                                  src={l.imageUrl}
                                  height={100}
                                  width={100}
                                  noImageSrc='https://www.jainsusa.com/images/store/agriculture/not-available.jpg'
                                />
                              </Link>
                            </div>
                            <Link to={`/viewDetail/${l._id}`}>
                              <div className="card-body">
                                <h4 className="card-title">{l.name}</h4>
                                <p>${l.price}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </SearchWrapper>
    );
  }
}
function searchingFor(query) {
  return function (x) {
    return x.name.toLowerCase().includes(query.toLowerCase()) || !query;
  };
}

const SearchWrapper = styled.div`
  .card-body p {
    color: #b63514 !important;
  }
  .card {
    border-top: none;
    border-left: none;
    border-right: none;
    margin-left: 40rem;
    margin-right: 40rem;
  }
  .image-square-wrapper {
    margin-top: 0.6rem;
  }
  .card-horizontal {
    display: flex;
    flex: 1 1 auto;
  }
  .card:hover{
    transform: scale(1.1);
  }
  .search {
    margin-top: 3rem;
    min-height: 30rem;
  }
  .search-bar {
    text-align: center;
  }
  .search-bar input {
    width: 35%;
    border-radius: 15px;
    height: 40px;
  }
  .search-bar input:focus {
    border-color: #ff4c3b !important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px #ff4c3b !important;
    outline: 0 none;
  }
`;
