import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import * as API from '../api/API';

class Inbox extends Component {
  constructor(props){
    super(props);
    // this.state = this.props.location.state;
    // this.state.showMessage = '';

    this.state = {
      profile: this.props.location.state.data,
      messages: '',
      showMessage: '',
      toID: '',
      to: '',
      newMessage: ''
    }

    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleUpdateRead = this.handleUpdateRead.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.messages);
    // console.log(this.props.location.state);
    // console.log(this.state.showMessage);
    API.getMessages(this.props.location.state.data._id).then((messages) => {
      this.setState({messages});
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpdateRead(event, value) {
    event.preventDefault();
    this.setState({showMessage: value, toID: value.fromID, to: value.from});

    if (!value.isRead) {
      API.updateIsRead(value._id);
    }

  }

  handleSendMessage(event) {
    event.preventDefault();

    let data = {
      fromID: this.props.location.state.data._id,
      toID: this.state.toID,
      from: this.props.location.state.data.firstname + ' ' + this.props.location.state.data.lastname,
      to: this.state.to,
      message: this.state.newMessage
    }

    // console.log(data);

    API.sendMessage(data, this.state.profile._id).then((response) => {
      if (response === 200) {
        this.setState({alert: 'Success', newMessage: ''});
      }
    }).catch((err) => {
      this.setState({alert: 'Failure'});
    })
    // console.log(this.state.newMessage);
  }

  handleTabPage(tab) {
    // console.log(this.state);
    // let data = this.state;
    let profile = this.state.profile.firstname.toLowerCase() + this.state.profile.lastname.toLowerCase();
    // tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.state.profile.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.state.profile
      })
    } else if (tab === 'recruit') {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state.profile
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state.profile
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
              status={this.props.location.state.data.isLoggedIn}
              data={this.state.profile}
              type={this.state.profile.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>

          <div className="col-xs-12 panel panel-default inbox-view">
            <h1 className="text-center">Messages</h1>
            <hr />
            {/* <div className="col-md-6" id="for-border"> */}
              {/* <div className=""> */}
                {this.state.messages.length ?
                  <div className="col-md-6" id="for-border">
                    <div className="">
                    {this.state.messages.map((value, index) => (
                      <div key={index} className="panel panel-body view-message" onClick={(event) => this.handleUpdateRead(event, value)}>
                        <h4>{value.from}, <span className="time">{value.time}</span></h4>
                        <h6>{value.message}</h6>
                        {value.isRead ? null : <p className="pull-right unread"><i className="fa fa-envelope" /></p>}
                      </div>
                    ))}
                  </div>
                </div> :
                  <div className="text-center panel panel-body col-xs-12">
                    <h3 className="alert alert-info">
                      <i className="fa fa-info-circle" /> You have no messages to read
                    </h3>
                  </div>
                }
              {/* </div> */}
            {/* </div> */}
            <div className="col-md-6">
              {this.state.showMessage ?
                <div className=" panel panel-body message">
                  <h3>Message from <span className="msg-name">{this.state.showMessage.from}</span></h3>
                  <hr />
                  <h4>{this.state.showMessage.message}</h4>
                  <br />
                  <form className="form-group" onSubmit={this.handleSendMessage}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-md need-help"
                        placeholder="Enter a message"
                        autoFocus
                        value={this.state.newMessage}
                        onChange={(event) => this.setState({newMessage: event.target.value})}
                      />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-md reply-btn">Reply</button>
                      </span>
                    </div>
                  </form>
                </div> : null}
            </div>

          </div>
        </div>
      )
    }
  }
}

export default Inbox;
