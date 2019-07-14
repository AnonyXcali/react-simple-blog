import React , { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import { List } from 'react-content-loader'

/*
  @component Post
    Responsible for rendering component for Blog posts
*/


class Post extends Component{

  render(){
    const { title, body } = this.props.postData;
    const {type, currentAuthor} = this.props;
    if(type === 'list') {
      return(
          <Card.Group>
            <Card fluid color='violet'>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                  {body}
                </Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
      )
    }else if(type === 'display'){
      return(
        <div>
          {(!title && !body) &&
            <List/>
          }
          {title &&
            <article>
              <h1 className='_postDisplayTitle'>{title}</h1>
              <div>
                <Image floated='left' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                <h2>{currentAuthor}</h2>
              </div>
              <div className='_postBody'>
                <p>{body}</p>
              </div>
            </article>
          }
        </div>
      )
    }else{
      return(
        <h1>
          Error Displaying Data
        </h1>)
    }

  }

}

export default Post;
