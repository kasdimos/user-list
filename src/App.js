import React, { Component } from 'react';
import './App.css';

import UserTable from './components/UserTable';
import FormDialog from './components/FormDialog';
//import { resolve } from 'dns';




class App extends Component {
  state = {
    users: [
      {
        signupDate: new Date("2015-03-25"), signup: new Date(),
        lastLoginDate: new Date("2015-03-25"), lastLogin: new Date(),
        name: 'John', email: 'john@gmail.com', role: 'admin', status: 'active'
        //birthCity: 63 
      }
      // {
      //   signupDate: new Date("2015-03-25"), signup: new Date(),
      //   lastLoginDate: new Date("2015-03-25"), lastLogin: new Date(),
      //   name: 'Helen', email: 'helen@gmail.com', role: 'user', status: 'inactive'
      //   //birthCity: 63 
      // },
      // {
      //   signupDate: new Date("2015-03-25"), signup: new Date(),
      //   lastLoginDate: new Date("2015-03-25"), lastLogin: new Date(),
      //   name: 'Kathy', email: 'helen@gmail.com', role: 'user', status: 'inactive'
      //   //birthCity: 63 
      // }

    ]
  };

  getUsers = () => {
    fetch('/users')
    .then(res => res.json())
    .then(users => {
      users = users.map(user => {
        user.signup = new Date(user.signup);
        user.lastLogin = new Date(user.lastLogin);
        return user;
      });
      this.setState({users})
    })
    .catch(err=>console.log(err));
  };



  createNewUser = async (name, email, role) => {
    //console.log(name, email, role)
    
    //return await postData('/newUser', {name, email, role});


    this.getUsers();
  };

  render() {
    return (
      <React.Fragment>
        
        <UserTable users={ this.state.users }/>
        <FormDialog onNewUser = {this.createNewUser}/>
        
      </React.Fragment>
    );
  }

}

export default App;



