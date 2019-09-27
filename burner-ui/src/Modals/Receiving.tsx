import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { any } from 'prop-types';

interface ReceivingProps {
  history: any;
  location: any;
  match: any;
}
class Receiving extends Component<ReceivingProps> {
  constructor(props: ReceivingProps) {
    super(props);
  }
  render() {
    console.log(this.props.location);
    return (
      <div>
        <h1>Receiving</h1>
        <p>Lorem ipsum si dolor et amet</p>
        <Link to='/'>Home</Link>
        {/* <Button onClick={() => history.push('/send')}>Send</Button> */}
      </div>
    );
  }
}

export default withRouter(Receiving);
