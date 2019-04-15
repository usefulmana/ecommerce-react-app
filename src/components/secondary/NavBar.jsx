import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../img/logo_transparent.png'
import styled from 'styled-components'
export default class NavBar extends Component {
    render() {
        return (
            <NavBarWrapper>
                <nav className='navbar navbar-expand-sm px-sm-5'>
                    <Link to='/'>
                        <img src={Logo} alt="Carto Logo" className='navbar-brand' />
                    </Link>
                    <form className="w-50 mx-2">
                    <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                            />
                            <div className="input-group-append">
                                <a
                                    className="btn btn-secondary search-button"
                                    type="button"
                                >
                                    <i className="fas fa-search" />
                                </a>
                            </div>
                    </div>
                    </form>
                </nav>
            </NavBarWrapper>    
        )
    }
}


const NavBarWrapper = styled.div`
.logo {
  margin-left: 5rem;
}
.search-button {
  border: 0;
  color: white !important;
  background-color: #ff4c3b;
}
.search-button:hover{
  border: 0.1rem solid#ff4c3b !important;
  box-shadow: 0 0 2px #ff4c3b;
  background-color: white;
  color: black!important;
}
.input-group{
    margin-left: 44rem;
}
`
