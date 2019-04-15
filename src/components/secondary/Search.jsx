import React, { Component } from 'react'
export default class Search extends Component {
  state = {
    query: "",
    products: []
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      query: value
    });

    this.search(value);
  };

  search = query => {
    const url = `http://rmit.chickenkiller.com:8080/products`;

    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({products: json}));
  };

  componentDidMount() {
    this.search("");
  }

  render() {
    return (
      <form>
        <input
          type="text"
          className="search-box"
          placeholder="Search for..."
          onChange={this.onChange}
        />
        {this.state.products.map(p => (
          <ul key={p.name}>
            <li>{p.name}</li>
          </ul>
        ))}
      </form>
    );
  }
}
