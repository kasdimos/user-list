
import React from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};


export default ({ users }) => {


  // const [state] = React.useState({
  //   columns: [
  //     { title: 'SignUp Date', field: 'signup', type: 'date'},
  //     { title: 'Last Login', field: 'lastLogin', type: 'datetime'},
  //     { title: 'Name', field: 'name' },
  //     {
  //       title: 'Email', field: 'email'
  //       //customSort: (a, b) => a.name.length - b.name.length
  //     },
  //     { title: 'Role', field: 'role' },
  //     { title: 'Status', field: 'status' }
  //   ],
  //   data: users
  // });

  
  const columns = [
        { title: 'SignUp Date', field: 'signup', type: 'date'},
        { title: 'Last Login', field: 'lastLogin', type: 'datetime'},
        { title: 'Name', field: 'name' },
        {
          title: 'Email', field: 'email'
          //customSort: (a, b) => a.name.length - b.name.length
        },
        { title: 'Role', field: 'role' },
        { title: 'Status', field: 'status' }
      ];

  

  return (
    <MaterialTable
      title= "User's table"
      icons={tableIcons}
      // columns={state.columns}
      // data={state.data}
      columns={columns}
      data={users}

      options={{
        sorting:true
      }}

    />
  );
}
