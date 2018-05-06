import React, { Component } from 'react';
import * as API from '../api/API';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: this.props.location.state.company,
      designation: this.props.location.state.designation,
      email: this.props.location.state.email,
      firstname: this.props.location.state.firstname,
      lastname: this.props.location.state.lastname,
      joined: this.props.location.state.joined
    }

    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  componentWillMount(){
    // console.log(this.props.location.state);
    // console.log(this.state);
    // console.log(this.props.location.state);
  }

  handleUpdateProfile() {
    // console.log(this.state);
    let id = this.props.location.state._id;
    let userProfile = {
      company: this.state.company,
      designation: this.state.designation,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }

    API.updateProfile(userProfile, id).then((updatedProfile) => {
      // console.log(updatedProfile);
      this.setState({
        company: updatedProfile.company,
        designation: updatedProfile.designation,
        email: updatedProfile.email,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <p>{this.state.joined}</p>
        <label>Firstname: </label><input
          type='text'
          value={this.state.firstname}
          onChange={(event) => this.setState({firstname: event.target.value})}
          contentEditable /><br />
        <label>Lastname: </label><input
          type='text'
          value={this.state.lastname}
          onChange={(event) => this.setState({lastname: event.target.value})}
          contentEditable /><br />
        <label>Email ID: </label><input
          type='email'
          value={this.state.email}
          onChange={(event) => this.setState({email: event.target.value})}
          contentEditable /><br />
        <label>Company: </label><input
          type='text'
          value={this.state.company}
          onChange={(event) => this.setState({company: event.target.value})}
          contentEditable /><br />
        <label>Designation: </label><input
          type='text'
          value={this.state.designation}
          onChange={(event) => this.setState({designation: event.target.value})}
          contentEditable /><br /><br />
        <button type='submit' onClick={this.handleUpdateProfile}>Save</button>
      </div>
    )
  }
}

export default Profile;
