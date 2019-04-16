import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const url = "http://rmit.chickenkiller.com:8080/products";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
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
        <h3>React - simple search</h3>
        <div>
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="type name here"
          />
            {this.state.products.filter(searchingFor(this.state.query)).map(l => {
              return (
                <Link to={`/viewDetail/${l._id}`}> {l.name} </Link>
              );
            })}
        </div>
      </SearchWrapper>
    );
  }
}

function searchingFor(query){
    return function(x){
      return x.name.toLowerCase().includes(query.toLowerCase()) || !query;
    }
}

const SearchWrapper =  styled.div``


