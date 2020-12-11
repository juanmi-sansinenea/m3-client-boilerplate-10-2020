import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import {Classes} from './Classes'

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Private Route</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
        <Classes />

      </div>
    );
  }
}


export default withAuth(Private);
