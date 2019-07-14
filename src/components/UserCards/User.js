import React , { Component } from 'react';
import { Card, Image, Label } from 'semantic-ui-react'

/*
  @component User
    Responsible for rendering inidividual Card for Blogger/User
*/


class User extends Component {
  render(){
    const { name, username } = this.props.userData;
    const { catchPhrase } = this.props.userData.company;
    return(
      <div className='_userCard'>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>@{username}</Card.Meta>
            <Card.Description className='_userCompany'>
            Company : {this.props.userData.company.name}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
           <ul className='_userTagsUl'>
           {
             catchPhrase.split(' ').map((ctpr,id) => {
               return(
                 <li key={id} className='_userTags'>
                 <Label color='blue' tag>
                     {ctpr}
                 </Label>
                 </li>
               )
             })
           }
           </ul>
          </Card.Content>
      </Card>
      </div>
    )
  }
}


export default User;
