import React, { Component } from 'react'
import styled  from 'styled-components'
import {Link} from 'react-router-dom'
import Logo from '../img/logo_transparent_med.png'
export default class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
            <div className="row text-center">
                <div className="col-md-4">
                    <Link to='/'>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="col-md-4 padding">
                    <hr className="light-bar" />
                    <h3>Store Hours</h3>
                    <hr className="light-bar" />
                    <div className="text-muted">
                        <p> Monday - Friday: 12am-9pm</p>
                        <p> Saturday: 9am-9pm</p>
                        <p> Sunday: 9am-10pm</p>
                    </div>
                </div>
                <div className="col-md-4 padding">
                    <hr className="light-bar" />
                    <h3>Store Information</h3>
                    <hr className="light-bar" />
                    <div className="text-muted text-center">
                        <div>
                            <i className="fas fa-map-marker-alt" />
                            <div className="address text-center">
                                <a href="https://goo.gl/maps/ynVYqmfFQs22">
                                    {" "}
                                    <p className="text-muted">
                                        72 Le Thanh Ton, Ben Nghe Ward, District 1, Ho Chi Minh
                                        City, Vietnam
                    </p>
                                </a>
                            </div>
                        </div>
                        <div>
                            <i className="fas fa-phone" />
                            <p className="address">Call us: (+84)903-054-777</p>
                        </div>
                        <div>
                            <i className="fas fa-envelope" />
                            <p className="address">
                                <a
                                    href="mailto: alex.nguyen3141@gmail.com"
                                    className="text-muted"
                                >
                                    {" "}
                                    alex.nguyen3141@gmail.com
                  </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div class="footer-social">
                    <a href="https://twitter.com/hm?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                        <i class="fab fa-twitter" />
                    </a>
                    <a href="https://www.instagram.com/hm/?hl=en">
                        <i class="fas fa-hashtag" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCoc8tpGCY1wrp8pV7mI0scA">
                        <i class="fab fa-youtube" />
                    </a>
                    <a href="https://www.linkedin.com/company/h&m">
                        <i class="fab fa-linkedin-in" />
                    </a>
                </div>
            </div>
            <hr />
            <div className="text-center text-muted">
                <h5> &copy; Alex Nguyen. All rights reserved.</h5>
            </div>
      </FooterWrapper>
    )
  }
}


const FooterWrapper = styled.div`
.address{
    display: inline-block;
    margin-left: 1rem;
}
.light-bar{
    border-top:1px solid #d5d5d5;
    width: 75%;
    margin-top: 0.8rem;
    margin-bottom: 1rem;
}
.padding{
    padding-top: 5rem;
    padding-bottom: 3rem;
}
.footer-social a{
    font-size:2rem;
    padding: 1.5rem 1.5rem 0 1.5rem; 
}
.fa-twitter,.fa-youtube,.fa-hashtag,.fa-linkedin-in{
    color:grey;
}

.fa-twitter:hover,.fa-youtube:hover,.fa-hashtag:hover,.fa-linkedin-in:hover{
    transform: scale(1.2);
}
.text-muted h5{
    font-size:0.8rem;
}
.col-md-4 img{
    padding-top: 1rem;
    padding-bottom: -1.5rem;
    margin-bottom: -3rem;
}

.col-md-4 img:hover{
    transform: scale(1.1);
}
`