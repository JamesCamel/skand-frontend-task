import React from "react";
import { requestUserList } from "./../actions/UserList";
import MaterialTable from 'material-table';
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const UserList = (props) => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.UserList)
  React.useEffect(() => {
    dispatch(requestUserList())
  }, [])

  let data = []
  if (!_.isEmpty(userList)) {
    userList.map(user => {
      data.push({
        id: user.id,
        email: user.email,
        jobs_count: user.jobs_count,
        active: user.active
      })
    })
  }

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Email', field: 'email' },
    { title: 'Jobs Count', field: 'jobs_count', type: 'numeric' },
    { title: 'Active', field: 'active'}
  ]

  return(
    <MaterialTable
      title="User List"
      columns={[...columns]}
      data={[...data]}        
      actions={[
        {
          icon: 'pageview',
          tooltip: 'View User',
          onClick: (event, rowData) => {
            props.history.push(`/users/${rowData.id}`)
          }
        },
        {
          icon: 'create',
          tooltip: 'Edit User',
          onClick: (event, rowData) => {
            alert("You Edit " + rowData.id)
          }
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          // onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
        },
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new row")
        }  
      ]}
    />
  )

}

export default UserList
