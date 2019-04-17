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
                            <div className="input-group-append">
                                <Link to='/searchResults'> <a
                                    className="btn btn-secondary search-button"
                                    type="button"
                                >
                                    <i className="fas fa-search" />
                                </a></Link>
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
    margin-left: 50rem;
  border: 0;
  color:#ff4c3b !important;
  background-color: white;
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
