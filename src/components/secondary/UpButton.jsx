import React, { Component } from 'react';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
export default class UpButton extends Component {
  render() {
    return (
      <div>
        <ScrollUpButton ShowAtPosition={50}/>
      </div>
    );
  }
}
