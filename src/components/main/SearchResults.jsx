import React, { Component } from 'react';
import Header from '../secondary/Header';
import NavBar from '../secondary/NavBar';
import Footer from '../secondary/Footer';
import Search from './Search';
import UpButton from '../secondary/UpButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class SearchResults extends Component {
  render() {
    return (
      <SearchResultsWrapper>
        <Header />
        <NavBar />
        <div className="row bg-light">
          <div className="col-lg-4 text-muted">
            <p> SEARCH </p>
          </div>
          <div className="col-lg-8 text-right">
            <Link to="/">
              <a className="text-muted">HOME</a>
            </Link>
            /
            <Link to="/searchResults">
              <a className="text-muted">SEARCH</a>
            </Link>
          </div>
        </div>
        <Search />
        <UpButton />
        <Footer />
      </SearchResultsWrapper>
    );
  }
}

const SearchResultsWrapper = styled.div`
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
`;
