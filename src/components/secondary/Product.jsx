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
              <div className="card-img-top"><Image
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
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
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
  .card{min-height:19rem;}
`;
