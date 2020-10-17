import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestUserList } from "./../actions/UserList";
import MaterialTable from 'material-table';
import _ from "lodash";

class UserList extends React.Component {
  componentDidMount() {
    this.props.requestUserList();
  }

  render() {
    const userList = this.props.userList
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
              this.props.history.push(`/users/${rowData.id}`)
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
}

const mapStateToProps = state => ({ userList: state.UserList });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestUserList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
