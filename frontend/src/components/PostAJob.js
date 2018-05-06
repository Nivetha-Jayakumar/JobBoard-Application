import React, { Component } from 'react';
import Navbar from './Navbar';
import * as API from '../api/API';

class PostAJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.location.state.company,
      jobID: '',
      designation: '',
      description: '',
      postedBy: this.props.location.state.firstname + ' ' + this.props.location.state.lastname,
      location: '',
      requirements: '',
      type: 'Technology',
      status: '',
      emailID: this.props.location.state.email,
      isLoggedIn: this.props.location.state.isLoggedIn,
      isEmployer: false,
      error: '',
      headsUp: false
    }

    this.handlePost = this.handlePost.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.state);
    // console.log('PostAJob state', this.props.location.state);
    if (this.props.location.state) {
      this.setState({isEmployer: this.props.location.state.isEmployer})
    } else {
      this.setState({isEmployer: false})
    }
  }

  handleTabPage(tab) {
    // console.log(tab);
    let profile = this.props.location.state.firstname.toLowerCase() + this.props.location.state.lastname.toLowerCase();
    // console.log(profile);
    tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.props.location.state.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.props.location.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.props.location.state
      })
    }
  }

  handlePost(event) {
    event.preventDefault();
    // console.log(this.state);
    let {jobID, company, description, designation, emailID, location, postedBy, requirements, type} = this.state;
    if (jobID && company && description && designation && emailID && location && postedBy && requirements && type) {
      // console.log(this.state);
      this.setState({status: 'Open'}, () => {
        let {status} = this.state;
        var job = {jobID, company, description, designation, emailID, location, postedBy, requirements, status, type}
        // API.postJob(job);
        API.postJob(job).then((response) => {
          if (response === 200) {
            this.props.history.push({
              pathname: `/dashboard`,
              state: this.props.location.state
            })
          } else {
            this.setState({error: 'Unable to post at the moment.'})
          }
        }).catch((err) => {
          this.setState({error: 'Refresh the page and try posting again.'});
        })
      })
    } else {
      this.setState({error: 'You need to give more details of the job.'});
    }
  }

  render() {
    if (!this.state.isEmployer) {
      return (
        <p>Not aiuthorized</p>
      )
    } else {
      return (
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              type={this.props.location.state.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>

          <div className="container postajob-content">
            <div className="row text-center">
              <h3>Over 100+ employers use JobSeek to recruit talents.</h3>
            </div>
            <br />
            <div className="col-xs-12 text-center">
              <p className="alert alert-info"><i className="fa fa-info-circle fa-lg" /> To ensure more views and responses, please fill in all the details of the job</p>
            </div>

            <div className="col-xs-12">

              <form className="form-horizontal" id="application-form" onSubmit={this.handlePost}>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Company: </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.company}
                      disabled
                    />
                  </div>
                  <p className="col-sm-4"><i className="fa fa-info-circle" /> You can recruit only for your company.</p>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Job ID: </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.jobID}
                      maxLength="6"
                      required
                      onChange={(event) => this.setState({jobID: event.target.value})}
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Job position: </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.designation}
                      required
                      onChange={(event) => this.setState({designation: event.target.value})}
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Category: </label>
                  <div className="col-sm-3">
                     <select value={this.state.type} className="form-control" onChange={(event) => this.setState({type: event.target.value})}>
                       <option value="Technology">Technology</option>
                       <option value="Finance">Finance</option>
                       <option value="Service">Service</option>
                       <option value="Heatlh Sciences">Health Sciences</option>
                       <option value="Management">Management</option>
                       <option value="Construction">Construction</option>
                       <option value="Aviation">Aviation</option>
                       <option value="Water Treatment">Water Treatment</option>
                       <option value="Retail">Retail</option>
                     </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Job location: </label>
                  <div className="col-sm-3">
                    <input
                      id="job-location"
                      type="text"
                      className="form-control input-sm"
                      value={this.state.location}
                      required
                      onChange={(event) => {
                        this.setState({location: event.target.value})
                        // window.initMap()
                      }}
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Description: </label>
                  <div className="col-sm-5">
                    <textarea
                      className="form-control" cols="50" rows="5"
                      value={this.state.description}
                      onChange={(event) => this.setState({description: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Candidate requirements: </label>
                  <div className="col-sm-5">
                    <textarea
                      className="form-control" cols="50" rows="5"
                      value={this.state.requirements}
                      onChange={(event) => this.setState({requirements: event.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-5">
                    <a onClick={(event) => this.setState(
                      {
                        designation: '',
                        jobID: '',
                        location: '',
                        category: 'Technology',
                        description: '',
                        responsibilities: '',
                        requirements: ''
                      })}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" className="btn btn-md btn-primary">Post</button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>

      )
    }

  }
}

export default PostAJob;
