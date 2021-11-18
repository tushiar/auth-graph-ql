import { compose, graphql } from "react-apollo";
import query from "../queries/CurrentUser";
import { Link } from "react-router";
import mutation from "../mutations/Logout";
import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  onLogout() {
    this.props.mutate({
      variables: {},
      refetchQueries: [{ query }],
    });
  }
  renderButtons() {
    const { user, loading } = this.props.data;
    if (loading) return <div />;
    if (user)
      return (
        <div>
          <li>
            <a onClick={this.onLogout.bind(this)}>Sign Out</a>
          </li>
        </div>
      );
    else
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo left">Home</Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
