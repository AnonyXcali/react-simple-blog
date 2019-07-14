import React , { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{

  render(){
    return(
      <div className='_headerNav'>
        <Link to='/users'>
          <h1>React Blog</h1>
        </Link>
      </div>
    )
  }
}


export default Header;
