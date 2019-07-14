import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserCards from './UserCards/UserCards'
import Posts from './Blog/Posts';
import PostDetails from './Blog/PostDetails';


/*
  Main Component
    [Routes]
        - /           route - Display Bloggers
        - /users      route - Display Bloggers
        - /posts      route - Display List of Posts by Blogger
        - /posts/:id  route - takes :id and displays particular Post by Blogger
*/

class Main extends Component {

  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={UserCards}/>
          <Route exact path='/users' component={UserCards}/>
          <Route exact path='/posts' component={Posts}/>
          <Route path='/posts/:id' component={PostDetails}/>
        </Switch>

      </main>
    )
  }
}


export default Main;
