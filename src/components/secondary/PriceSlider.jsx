import React, { Component } from 'react'
import styled from 'styled-components'

export default class PriceSlider extends Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);
  }

  updateRange(e) {
    this.props.updateRange(e.target.value);
  }

  render() {
    // console.log(this.props);
    const { range } = this.props;
    return (
      <PriceSiderWrapper>
        <input id="range" type="range"
          value={range}
          min="0"
          max="50000000"
          step="2000000"
          onChange={this.updateRange}
        />
        <span id="output">{range}</span>
      </PriceSiderWrapper>
    )
  }
}

const PriceSiderWrapper = styled.div`
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

div {
  display: flex;
  align-items: center;
  padding: 5px;
  #output {
    background: #ff4c3b ;
    color: #000;
    border-radius: 2px;
    padding: 3px 7px;
    margin: 0px 10px;
    text-align: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
      height: 0;
      width: 0;
      border: solid 6px #ff4c3b ;
      z-index: -1;
      border-top-color: white;
      border-bottom-color: white;
      border-left-color: white;
    }
  }
}

/* CHROME */
#range {
  -webkit-appearance: none;
  outline: none;
  background: #ff4c3b ;
  height: 6px;
  width: 200px;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff4c3b ;
  }
}

/* FIREFOX */
#range::-moz-range-thumb {
  border: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #ff4c3b ;
  cursor: pointer;
}

#range::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: #ff4c3b ;
  border-radius: 5px;
}
`
