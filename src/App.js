import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import CMS from './pages/CMS';
import Comment from './pages/Comment';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';



class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Splash} />


          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute exact path="/CMS" component={CMS} /> 
          <PrivateRoute exact path="/classes" component={Classes} />
          <PrivateRoute exact path="/classes/:class_id" component={ClassDetail} />
          <PrivateRoute exact path="/comment/:comment_id" component={Comment} />
        </Switch>

      </div>
    );
  }
}

export default App;
