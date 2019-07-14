import React, { Component } from 'react';
import User from './User';
import { Link } from "react-router-dom";

/*
  @component UserCards
    Responsible for listing out Bloggers/Users on the site
*/


class UserCards extends Component{


  /*
  @state
    keys
      l-> users // List of users
      l-> isFetching //data fetching state
  */

  state  =  {
     isFetching : false,
     users : []
  }

  /*
    Fetch users via /users api
  */

  componentDidMount(){
    this.fetchUser();
  }

  /*
    Function - To Render User cards
  */
  renderList = users => {
    return users.map((user, iter) => {
      let linkUrl = `/posts?user=${user.name}&userId=${user.id}&skip=0&limit=10`;
      return(
        <Link key={iter} to={linkUrl}>
          <li key={iter} className='_userLi'>
            <User
              key={iter}
              userData={user}/>
          </li>
        </Link>
      )
    })
  }

  fetchUser = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
    .then( res => {
        this.setState({
          isFetching : true
        })
        return res.json()
      }).then(data => {
        this.setState({
          isFetching : false,
          users: data
        })
      })

  }


  render(){
    const { users } = this.state;
      return(
        <div className='_userListDiv'>
          <div className='_title'>
            <h1>Bloggers</h1>
          </div>
          {(users && users.length > 0) &&
            <ul className='userList'>
              {this.renderList(users)}
            </ul>
          }
        </div>
      )
    }
}

export default UserCards;
