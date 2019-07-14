import React , { Component } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import PaginationForPosts from './PaginationForPosts';

/*
  @component Posts
    Responsible for listing out Blogs by particual Blogger on the site
*/


class Posts extends Component{

  /*
  @state
    keys
      l-> posts // List of Posts by :id
      l-> isFetching //data fetching state
  */

  state  =  {
     isFetching : false,
     posts : [],
     paginatedPosts:[],
     paginationValue:5,
     pageSize: '',
     currentAuthor: '',
     currentPage:1
  }
  componentDidMount(){
    this.fetchPosts();
  }

  /*
    Function - To Render User cards
  */
  renderList = posts => {
    return posts.map((post, iter) => {
      let postLink = `/posts/${post.id}?author=${this.state.currentAuthor}`;
      return(
          <Link key={iter} to={postLink}>
            <li key={iter} className='_postLi'>
              <Post
                key={iter}
                postData={post}
                type='list'
                />
            </li>
          </Link>
        )
    })
  }

  sendPaginationRequest = (page) => {
    this.sliceDataForPagination(this.state.paginationValue, page);
  }

  sliceDataForPagination = (pagVal, page) => {
    const { posts } = this.state;
    let indexOfLastKey = page * pagVal;
    let indexOfFirstKey= indexOfLastKey - pagVal;
    let slice = posts.slice(indexOfFirstKey, indexOfLastKey)
    this.setState({
      paginatedPosts:slice,
    })
  }

  getNumberOfPages = (data, paginVal) => {
    return data.length / this.state.paginationValue;
  }

  fetchPosts = () => {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${parsed.userId}&skip=0&limit=10`;
    fetch(url)
    .then( res => {
        this.setState({
          isFetching : true
        })
        return res.json()
      }).then(data => {
        this.setState({
          isFetching : false,
          posts: data,
          pageSize: this.getNumberOfPages(data),
          paginatedPosts:data.slice(0,this.state.paginationValue),
          currentAuthor: parsed.user
        })
      })

  }

  render(){
    const { posts, currentAuthor, paginatedPosts, pageSize } = this.state;
      return(
        <div className='_postListDiv'>
          <div className='_title'>
          <h1>Blog Posts by {currentAuthor}</h1>
          </div>
          {(posts && posts.length > 0) &&
            <ul className='_postsList'>
              {this.renderList(paginatedPosts)}
            </ul>
          }
          <div className={posts.length > 0 ? '_paginDiv' : '_hide _paginDiv'}>
            <PaginationForPosts
              pageSize={pageSize}
              sendPaginationRequest={(page) => {this.sendPaginationRequest(page)}}
            />
          </div>
        </div>
      )
  }
}

export default Posts;
