import React, { Component } from 'react'
import Header from '../secondary/Header';
import Navbar from '../secondary/NavBar';
import Banner from '../secondary/Banner';
import Footer from '../secondary/Footer';
import UpButton from '../secondary/UpButton';
import Search from './Search';
import PaginateTest from '../secondary/PaginateTest';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Navbar/>
        <Banner/>
        <UpButton />
        <Search/>
        <PaginateTest/>
        <Footer/>
      </div>
    )
  }
}
