import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PersonAdd from '@material-ui/icons/PersonAdd';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errors: []
    };
  }

  btnStyles = {
    padding: '5px',
    color: '#000',
    border: '1px solid rgba(74, 74, 74, 0.5)',
    minWidth: '42px',
    top: '-46px',
    left: '12px'
  };

  handleClickOpen = () => {
    this.setState({open: true, errors:[]});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCreate = async () => {
    let res;

    try{
      res = await postData('/newUser', {
        name: document.getElementById('name').value, 
        email: document.getElementById('email').value, 
        role: document.getElementById('role').value
      });
    }catch(err){
      res = err;
    }

    if(Array.isArray(res)){
      // Validation errors
      this.setState({errors: 
        <ul>
          {res.map(e => 
            <li key={e.key} > {e.key + '-> ' + e.msg } </li>
          )}
        </ul>
      });
    }else if(!res.success){
      // Server error
      this.setState({errors: res });
    }else{
      // Success
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('role').value = '';
      this.setState({errors: <span style={{color:'forestgreen'}}>User added!</span> });
    }
  };

  render() {
    return ( <div>
      <Button style={this.btnStyles} id="newUserBtn" variant="outlined" color="primary" onClick={this.handleClickOpen}>
        <PersonAdd />
      </Button>
      
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert name, email and role.
          </DialogContentText>
          <span style={{color:'maroon'}}>{this.state.errors}</span>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleCreate} color="primary">
            Add new User
          </Button>
        </DialogActions>
      </Dialog>
    </div> );
  };
}


async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if(response.status === 200) return await response.json();
  throw await response.text();
}