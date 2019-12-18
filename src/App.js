import React, { Component } from 'react';
import './App.css';

import UserTable from './components/UserTable';
import FormDialog from './components/FormDialog';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.getUsers();
  }

  getUsers = () => {
    fetch('/users')
    .then(res => res.json())
    .then(users => {
      users = users.map(user => {
        user.signup = new Date(user.signup);
        user.lastLogin = (user.lastLogin===null) ? '-' : new Date(user.lastLogin);
        return user;
      });
      this.setState({users})
    })
    .catch(err=>console.log(err));
  };

  onNewUserCreated = async () => {
    this.getUsers();
  };

  render() {
    return (
      <React.Fragment>
        
        <UserTable users={ this.state.users }/>
        <FormDialog onNewUserCreated = {this.onNewUserCreated}/>
        
      </React.Fragment>
    );
  }

}

export default App;



