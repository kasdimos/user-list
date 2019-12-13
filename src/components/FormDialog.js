import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PersonAdd from '@material-ui/icons/PersonAdd';


export default function FormDialog(props) {
  const [open, setOpen, errors] = React.useState(false);

  let btnStyles = {
    padding: '5px',
    color: '#000',
    border: '1px solid rgba(74, 74, 74, 0.5)',
    minWidth: '42px',
    top: '-46px',
    left: '12px'
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    // let res = await props.onNewUser(
    //   document.getElementById('name').value, 
    //   document.getElementById('email').value, 
    //   document.getElementById('role').value
    // );

    let res = await postData('/newUser', {
      name: document.getElementById('name').value, 
      email: document.getElementById('email').value, 
      role: document.getElementById('role').value
    });

    if(!res.success) console.log('ER')
    //useState({errors: '22ss'});
    console.log(errors)

    // .then(res => {
    //   console.log(res)
    //  
    // })


    //handleClose();
  };

  return (
    <div>
      <Button style={btnStyles} id="newUserBtn" variant="outlined" color="primary" onClick={handleClickOpen}>
        <PersonAdd />
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert name, email and role.
          </DialogContentText>
          <span>{errors}</span>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Add new User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}