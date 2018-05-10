import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import * as API from '../api/API';

class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;

    this.handleTabPage = this.handleTabPage.bind(this);
  }

  handleTabPage(tab) {
    // console.log(this.state);
    // let data = this.state;
    let profile = this.state.firstname.toLowerCase() + this.state.lastname.toLowerCase();
    // tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.state.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.state
      })
    } else if (tab === 'recruit') {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.state}
              type={this.state.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>

          <div className="col-xs-12 panel panel-body inbox-view">
            <h1>Messages</h1>
            <hr />
          </div>
        </div>
      )
    }
  }
}

export default Inbox;
