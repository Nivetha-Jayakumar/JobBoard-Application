import React, { Component } from 'react';
import Navbar from './Navbar'
import * as API from '../api/API';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.viewuser = {};
    this.state.message = '';

    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentWillMount(){
    // console.log(this.state);
    // console.log(this.state.profile.experience.length);
    // console.log('Profile mounted');
    // console.log(this.state.profile);
    if (this.props.location.state.profile) {
      API.getOneUser(this.props.location.state.profile.email).then((response) => {
        this.setState({viewuser: response}, () => console.log(this.state.viewuser.experience));
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  handleTabPage(tab) {
    // console.log('In profile', tab);
    if (this.state.data) {
      let profile = this.state.data.firstname.toLowerCase() + this.state.data.lastname.toLowerCase();
      // console.log(profile);
      if (tab === 'logout') {
        API.logout(this.state.data.tokens[0]).then((response) => {
          if (response === 200) {
            this.setState({redirect: true});
          }
        }).catch((err) => {
          console.log(err);
        })
      } else if (tab === 'profile') {
        this.props.history.push({
          pathname: `/in/${profile}`,
          state: this.state.data
        })
        // this.setState(this.state.data, () => this.render());
      } else {
        this.props.history.push({
          pathname: `/${tab}`,
          state: this.state.data
        })
      }
    } else {
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
      } else {
        this.props.history.push({
          pathname: `/${tab}`,
          state: this.state
        })
      }
    }
  }

  handleSendMessage(event) {
    event.preventDefault();
    this.setState({sendMessage: false});

    // console.log(this.state.message);
    // console.log(this.state.profile.firstname);
    // console.log(this.state.data.firstname);
    // console.log(this.state.data._id);
    // console.log(this.state.profile._id);
    let data = {
      fromID: this.state.data._id,
      toID: this.state.profile._id,
      from: this.state.data.firstname + ' ' + this.state.data.lastname,
      to: this.state.profile.firstname + ' ' + this.state.profile.lastname,
      message: this.state.message
    }
    // console.log(data);

    API.sendMessage(data).then((response) => {
      if (response === 200) {
        this.setState({alert: 'Success'});
      }
    }).catch((err) => {
      this.setState({alert: 'Failure'});
    })
  }


  render() {
    if (this.state) {
      return (
        <div>
        <div className="container navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.props.location.state.data.isLoggedIn}
            data={this.props.location.state.data}
            chooseTab={this.handleTabPage} />
        </div>

        <div className="cover-image" style={{backgroundImage: `url(${this.state.profile.cover})`}}>

        </div>


        <div className="profile-view container">

          <div className="container panel panel-body profile-content">

              <div className="text-center avatar-image">
                <img
                  className="avatar"
                  src={this.state.profile.avatar}
                  alt={this.state.profile.firstname}
                  style={{width: 260}}
                />
              </div>
              <div className="text-center profile-name">
                    <h2 className="col-xs-12 name">{this.state.profile.firstname} {this.state.profile.lastname}</h2>
                    <span className="lfg">
                      {this.state.profile.linkedin ? <a href={this.state.profile.linkedin} target='_blank'><i className="fa fa-linkedin" />&nbsp;&nbsp;</a> : null}
                      {this.state.profile.fb ? <a href={this.state.profile.fb} target='_blank'><i className="fa fa-facebook-f" />&nbsp;&nbsp;</a> : null}
                      {this.state.profile.github ? <a href={this.state.profile.github} target="_blank"><i className="fa fa-github" />&nbsp;&nbsp;</a> : null}</span>
              </div>

              <br />
              <div className="text-center skills">
                  {this.state.profile.experience.length ? <p>Worked at {this.state.profile.experience[0].company}</p> : null}
                  {this.state.profile.skills ? <p>Experience working with {this.state.profile.skills}</p> : null}
              </div>
              <br />

              <br /><br />
              {this.state.sendMessage ?
                <div className="col-md-6 col-md-offset-3 message-panel">
                    <div className="col-xs-12">
                      <textarea
                        className="form-control input-lg"
                        placeholder="Message"
                        rows="6"
                        autoFocus
                        onChange={(event) => this.setState({message: event.target.value})}
                       />
                     </div>
                     <div>&nbsp;</div>
                     <div className="col-xs-12">
                       <a onClick={() => this.setState({sendMessage: false})}>Cancel</a>&nbsp;&nbsp;
                       <button className="btn btn-md send" onClick={this.handleSendMessage}>Send</button>
                     </div>
                     {this.state.alert ?
                     <span>{this.state.alert === 'Success' ? <p className="alert alert-success"><i className="fa fa-check fa-2x" /> Message Sent</p> :
                      <p className="alert alert-danger"><i className="fa fa-info fa-2x" /> Message not sent</p>}</span> :
                    null}
                </div> :
                <div className="text-center send-message">
                  <button className="btn btn-lg" onClick={() => this.setState({sendMessage: true})}>
                    <i className="fa fa-paper-plane" /> Send a message
                  </button>
                </div>}

            </div>

            <hr />
            <div className="panel panel-body profile-body">

            {this.state.profile.experience.length ?
            <div id="experience">
              <h4 className="make-center profile-section-headers">EXPERIENCE</h4><br />
              <div className="">
                <span>{this.state.profile.experience.map((value, index) => (
                  <div key={index} className="col-xs-12 panel panel-body list">
                    <div className="col-md-2 text-center hidden-xs proj-img">
                      <i className="fa fa-graduation-cap fa-4x" />
                    </div>
                    <div className="col-md-6 col-xs-12 proj-desc">
                      <p>{value.company}</p>
                      <h4>{value.role}</h4>
                    </div>
                    <br />
                  </div>
                ))}</span>
              </div>
            </div> : null }


              {this.state.profile.education.length ?
              <div id="education">
                <h4 className="make-center profile-section-headers">EDUCATION</h4><br />
                <div className="">
                    <span>{this.state.profile.education.map((value, index) => (
                      <div key={index} className="col-xs-12 panel panel-body list">
                        <div className="col-md-2 text-center hidden-xs grad-cap">
                          <i className="fa fa-graduation-cap fa-4x" />
                        </div>
                        <div className="col-md-6 col-xs-12 grad-univ">
                          <p>{value.university.toUpperCase()} · {value.gradDate.toUpperCase()}</p>
                          <h4>{value.degree}, {value.major}</h4>
                        </div>
                        <div>&nbsp;</div>
                      </div>
                    ))}</span>
                </div>
              </div> : null }<br />

              {this.state.profile.projects.length ?
              <div id="projects">
                <h4 className="make-center profile-section-headers">PROJECTS</h4><br />
                <div className="">
                  <span>{this.state.profile.projects.map((value, index) => (
                    <div key={index} className="col-xs-12 panel panel-body list">
                      <div className="col-md-2 text-center hidden-xs proj-img">
                        <i className="fa fa-graduation-cap fa-4x" />
                      </div>
                      <div className="col-md-6 col-xs-12 proj-desc">
                        <h4>{value.title} &nbsp; <a href={value.link} target="_blank"><i className="fa fa fa-share-square-o"/></a></h4>
                        <p>{value.description}</p>
                        <p>{value.role}</p>
                      </div>
                    </div>
                  ))}</span>
                </div>
              </div> : null }<br />

            </div>

          </div>
        </div>
      )
    } else {
      return <p>Not available</p>
    }

  }
}

export default Profile;
