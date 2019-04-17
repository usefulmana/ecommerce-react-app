import React, { Component } from 'react'
import styled from 'styled-components'
import Image from 'react-image-resizer'
import { Link } from 'react-router-dom';
export default class ProductHorizontalCard extends Component {
  render() {
    return (
      <ProductHorizontalCardWrapper>
        <div>
          <div className="mt-3">
          
              <div className="card">
              <div className="card-horizontal">
                <div className="img-square-wrapper">
                  <Link to={`/viewDetail/${this.props.id}`}>
                  <Image
                    src={this.props.imageUrl}
                    height={100}
                    width={80}
                    noImageSrc='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                  /> </Link>
                </div>
                <Link to={`/viewDetail/${this.props.id}`}>
                <div className="card-body">
                    <h5 className="card-title text-primary">{this.props.name}</h5>
                    <p className='text-left'>${this.props.price}</p>
                  </div></Link>
              </div>
              </div>
           
          </div>
        </div>
      </ProductHorizontalCardWrapper>
    )
  }
}

const ProductHorizontalCardWrapper = styled.div`
.card-horizontal {
    display: flex;
    flex: 1 1 auto;
}
.card {
    border: transparent;
    transition: all 1s linear;
    min-width:50rem;
  }
  .card:hover{
      transform: scale(1.1);
  }
  .card-body p{
    color:red;
  }
`