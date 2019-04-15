import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
export default class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <header className='bg-light'>
                    <div className="row text-muted">
                        <div class="col-lg-6 text-left" id="header">
                            <div class="welcome">
                                <p>Welcome to our store Carto</p>
                            </div>
                            <div className="phone-icon">
                                <i className="fas fa-phone" />
                            </div>
                            <div className="phone">
                                <p> Call us (+84)903 - 054 - 777</p>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right " id="header">
                            <div className="support-icon">
                                <i className="fas fa-home" />
                            </div>
                            <Link to="/" className="ml-auto">
                                <div className="support">
                                    <a className="home text-muted">Home</a>
                                </div>
                            </Link>
                            <div className=" btn-group dropdown-btn bg-light">
                                <a
                                    type="button"
                                    className=" btn dropdown-toggle text-muted home"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    My Manager
                  </a>
                                <div className="dropdown-menu text-center">
                                    <Link to="/productManager" className="ml-auto">
                                        <a href="#" className="dropdown-item home">
                                            {' '}
                                            Manage Products
                      </a>
                                    </Link>
                                    <hr className="light" />
                                    <Link to="productTypeManager" className="ml-auto">
                                        <a href="#" className="dropdown-item home">
                                            {' '}
                                            Manage Product Types
                      </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </HeaderWrapper>
        )
    }
}

const HeaderWrapper = styled.div`
#header {
  margin-top: 0.5rem;
  margin-bottom: -0.1rem;
}
.support {
  display: inline-block;
  padding-right: 1.5rem;
  margin-top:-1rem;
}
.home:hover {
  color: #ff4c3b !important;
}
.support-icon {
  display: inline-block;
  padding-right: 0.5rem;
}

.welcome {
  display: inline-block;
  margin-top: 0.2rem;
  padding-left: 5rem;
  padding-right: 1.1rem;
}
.phone-icon {
  display: inline-block;
  padding-right: 1.1rem;
  color: #ff4c3b;
}
.phone {
  display: inline-block;
}
.fa-cog{
  margin-top:1rem;
}
.dropdown-btn {
  display: inline-block;
  padding-top:0.4rem;
  margin-right: 5rem;
  margin-left:-1rem;
  margin-top: -0.8rem;
}`
