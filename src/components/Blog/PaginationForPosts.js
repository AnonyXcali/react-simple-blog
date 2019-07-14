import { Pagination } from 'semantic-ui-react';
import React, { Component } from 'react';


/*
  @component Pagination
    Responsible for rendering and handling pagination
*/


class PaginationForPosts extends Component {

  state = {
    activePage: 1
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.props.sendPaginationRequest(activePage);
  }


  render(){
    const { pageSize } = this.props;
    const { activePage } = this.state

    return(
      <Pagination
        className='_pagination'
        boundaryRange={null}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
        totalPages={pageSize}
        activePage={activePage}
        onPageChange={this.handlePaginationChange}
      />
    )
  }
}


export default PaginationForPosts;
