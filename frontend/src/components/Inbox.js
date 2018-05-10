import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import * as API from '../api/API';

class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.showMessage = '';

    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.messages);
    console.log(this.state.showMessage);
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

          <div className="col-xs-12 panel panel-default inbox-view">
            <h1 className="text-center">Messages</h1>
            <hr />
            <div className="col-xs-6">
              {this.state.messages.length ?
                <span>
                  {this.state.messages.map((value, index) => (
                    <div key={index} className="panel panel-body view-message" onClick={() => this.setState({showMessage: value})}>
                      <h4>{value.from}</h4>
                      <h6>{value.message}</h6>
                      {value.isRead ? null : <p className="pull-right">Unread</p>}
                    </div>
                  ))}
                </span> : null
              }
            </div>
            {this.state.showMessage ?
              <div className="col-xs-6 panel panel-body">
                <h2>Message from {this.state.showMessage.from}</h2>
                <hr />
                <h4>{this.state.showMessage.message}</h4>
              </div> : null}
          </div>
        </div>
      )
    }
  }
}

export default Inbox;
