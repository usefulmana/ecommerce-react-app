import React, { Component } from 'react'
import styled  from 'styled-components'
import {Link} from 'react-router-dom'
import BannerPhoto from '../img/home-banner.jpg'
export default class Banner extends Component {
  render() {
    return (
      <BannerWrapper>
            <img src={BannerPhoto} alt="Banner Photo" />
            <div className="banner-text"> Welcome To Carto</div>
            <div>
                <Link to="/productGridView">
                    <button className="btn shop-btn" type="button" href="#">
                        SHOP NOW
            </button>
                </Link>
            </div>
      </BannerWrapper>
    )
  }
}


const BannerWrapper = styled.div`
.banner-text {
  font-size: 4rem;
  position: absolute;
  top: 25rem;
  right: 65rem;
}

.shop-btn {
  position: absolute;
  top: 34rem;
  right: 78rem;
  background-color: #ff4c3b;
  border: solid transparent;
  color: white !important;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
}

.shop-btn:hover {
  background-color: white;
  color: black !important;
  border-color: #ff4c3b;
}
`