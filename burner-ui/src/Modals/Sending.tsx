import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sending extends Component {
  render() {
    return (
      <div>
        <h1>Sending</h1>
        <p>Lorem ipsum si dolor et amet</p>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default Sending;
