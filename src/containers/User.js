import React from "react";

class User extends React.Component {
  render() {
    console.log(this.props.match.params.id)
      return (
        <div>
          {this.props.match.params.id}
        </div>
      )
    }
}
export default User