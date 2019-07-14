import React, { Component, createRef } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Sticky } from 'semantic-ui-react'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import './styles/styles.css'
import './styles/header.css'


/*
Components Used
  Header|
        l--> Shows the Navigation if applicable
        l--> Should be sticky component
  Main--|
        l--> Is Root Page
        l--> Responsible for Listing of Users.
*/
import Header from './components/Header';
import Main from './components/Main';



class App extends Component {

  contextRef = createRef()

  render() {
    return (
      <Router>
        <div className='_blogRoot' ref={this.contextRef}>
          <Sticky context={this.contextRef}>
            <Header/>
          </Sticky>
          <Main/>
        </div>
      </Router>
    );
  }
}

export default App;
