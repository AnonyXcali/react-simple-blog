import React, { Component } from 'react';
import { Button, Card, Icon, Confirm } from 'semantic-ui-react'
import Post from './Post';

/*
  @component PostDetails
    Responsible for rendering particular Blog Post and its comments
*/


class PostDetails extends Component{

  state = {
    isFetching: false,
    post:[],
    comments:[],
    currentAuthor: '',
    commentsVisible: false,
    open: false
  }

  componentDidMount(){
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    this.setState({
      currentAuthor : parsed.author
    })
    this.fetchPostDetails(false,-1);
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  fetchPostDetails = (isComment, postId) => {
    const { id } = this.props.match.params
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    if(isComment){
      url = `https://jsonplaceholder.typicode.com/posts/${id}/comments/`
      fetch(url)
      .then( res => {
          this.setState({
            isFetching : true
          })
          return res.json()
        }).then(data => {
          this.setState({
            isFetching : false,
            comments: data,
            commentsVisible: true
          })
        })
    }else{
      fetch(url)
      .then( res => {
          this.setState({
            isFetching : true
          })
          return res.json()
        }).then(data => {
          this.setState({
            isFetching : false,
            post: data
          })
        })
    }
  }

  handleClick = () => {
    const { id } = this.props.match.params
    this.props.history.push(`/posts/${id}/comments`)
    this.fetchPostDetails(true,id);
  }


  renderList = renderObj => {
    return renderObj.map( comment => {
      return (
        <Card fluid color='orange'>
          <Card.Content>
            <Card.Meta>
              {comment.name}
            </Card.Meta>
            <Card.Description>
              {comment.body}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  toggleComments = () => {
    this.setState({
      commentsVisible : this.state.commentsVisible ? false : true
    })
  }

  _handleAction = () => {
    const { open } = this.state;
    if(!open){
      this.open();
    }else{
      this.close();
    }
  }

  _delete = () => {
    const { id } = this.props.match.params
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE'
    }).then(response => response.json())
      .then( data => {
        this.close();
        this.props.history.push(`/users`)
      })
  }


  render(){
    const { post, comments, commentsVisible } = this.state;
    return(
      <div className='_postListDiv'>
        { post  &&
          <div>
            <Post
              postData={post}
              type='display'
              currentAuthor={this.state.currentAuthor}
            />
              <Button onClick={this.handleClick} basic color='yellow'>
                {(comments && comments.length > 0) ?
                  <Icon className='_refresh' name='refresh' />
                  : 'Get Comments'
                }
              </Button>
              <Button className='_deletePost' onClick={this._handleAction} basic color='red'>
                Delete BlogPost?
              </Button>
              <Button className='_toggleComments' disabled={comments.length > 0 ? false: true} onClick={this.toggleComments} basic color='orange'>
                {commentsVisible ? 'Hide Comments' : 'Show Comments'}
              </Button>
              { comments.length > 0 &&
                <div ref={this.contextRef} className={ commentsVisible ? '_commentsBlock' : '_hide _commentsBlock'}>
                  <Card.Group className='_commentsUlEle'>
                      {this.renderList(comments)}
                  </Card.Group>
                </div>
              }
          </div>
        }
        <Confirm
          open={this.state.open}
          content='Are you sure you want to delete this blog-post?'
          onCancel={this.close}
          onConfirm={this._delete} />
      </div>
    )
  }
}

export default PostDetails;
