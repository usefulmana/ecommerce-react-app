import React, { Component } from 'react'
import styled from 'styled-components'
import {ProductConsumer} from './context'
import Header from '../secondary/Header';
import NavBar from '../secondary/NavBar';
import Footer from '../secondary/Footer';
export default class ProductsGrid extends Component {
  render() {
    return (
    <React.Fragment>
        <Header />
        <NavBar />
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <ProductConsumer>
                        {(value)=>{
                            return <h1>{value}</h1>
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </div>
        <Footer/>
    </React.Fragment>
    )
  }
}
