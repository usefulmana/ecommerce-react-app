/**Author: Nguyen Le Bao Anh
 * Course: COSC2430 - Web Programming
 * Assignment #: 2
 * Created on: 11/04/19
 * Last Updated: 15/04/19
 * Description: A ReactJS-based e-commerce web application*/

import React, { Component } from 'react';
import './App.css';
import Home from './components/main/Home';
import ProductManager from './components/main/ProductManager';
import ProductTypeManager from './components/main/ProductTypeManager';
import Default from './components/main/Default';
import ProductDetail from './components/main/ProductDetail';
import ProductGrid from './components/main/ProductsGrid';
import ProductList from './components/main/ProductsList';
import { Switch, Route } from 'react-router-dom';
import SearchResults from './components/main/SearchResults';
import FilterResults from './components/main/FilterResults'
// TODO Filter, Search, Pagination, List View
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/productManager" component={ProductManager} />
          <Route exact path="/productTypeManager" component={ProductTypeManager}/>
          <Route exact path="/productGridView" component={ProductGrid} />
          <Route exact path="/productListView" component={ProductList} />
          <Route exact path="/searchResults" component={SearchResults} />
          <Route path={"/viewDetail/:id"} component={ProductDetail} />
          <Route path={"/filterResults/:productType"} component={FilterResults} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
