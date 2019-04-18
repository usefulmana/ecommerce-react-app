import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-image-resizer";
import styled from "styled-components";
import ProductDetail from "../main/ProductDetail";

export default class Product extends Component {
  render() {
    return (
      <div>
        <ProductWrapper className="">
          <Link to={`/viewDetail/${this.props.id}`}>
            <div className="card">
              <div className="card-img-top img-container"><Image
                src={this.props.imageUrl}
                height={100}
                width={80}
                noImageSrc='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
              /></div>
              <div className="card-body">
                <h5 className="card-title text-primary">{this.props.name}</h5>
                <p className='text-left'>${this.props.price}</p>
              </div>
            </div>
          </Link>
        </ProductWrapper>
      </div>
    );
  }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  } 
  .card :hover{
   transform: scale(1.1)
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .card-body p{
    color:red;
  }
  .card{min-height:19rem; max-width:17rem;}
`;
