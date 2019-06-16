import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch, withRouter} from 'react-router-dom';
import  feedit from './feed-it';
import 'bootstrap/dist/css/bootstrap.css'
import './css/style.css'
class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter >
      <Switch>
      <Route exact path="/" component={feedit}/>
      </Switch>
      </BrowserRouter>      
      </div>
    );
  }
}

export default withRouter(App);
