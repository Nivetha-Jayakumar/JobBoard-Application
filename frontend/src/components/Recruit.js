import React, { Component } from 'react';
import Navbar from './Navbar';
import * as API from '../api/API';

class Recruit extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.jobs = [];
    this.state.show = false;
    this.state.applicants = [];
    this.state.jobID = '';
    this.state.jobCompany = '';
    this.state.jobPost = '';
    this.state.message = '';
    this.state.default = true;
    // this.state.hired = false;
    // this.state.isLoggedIn = this.props.location.state.data.isLoggedIn;

    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleHiring = this.handleHiring.bind(this);
    this.handleViewProfile = this.handleViewProfile.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.applicants);
    // console.log(this.props.location.state);

    API.getMyPostedJobs(this.state.email).then((data) => {
      // console.log(data);
      if (data !== 404) {
          this.setState({jobs: data});
      } else {
        this.setState({error: data})
      }
    }).catch((err) => {
      this.setState({error: err});
    });

  }

  handleViewProfile(event, user) {
    event.preventDefault();
    // console.log(user);

    let profile = user.firstname.toLowerCase() + user.lastname.toLowerCase();
    // console.log(profile);
    API.updateViews(user).then((response) => {
      if (response === 200) {
        this.props.history.push({
          pathname: `/view/${profile}`,
          state: {
            data: this.state,
            profile: user
          }
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleHiring(event, id, name, applicantEmail, jobID, jobCompany, jobPost, status) {
    event.preventDefault();
    // console.log(jobID);
    // console.log(id, name, applicantEmail, jobID, jobCompany, jobPost, status);

    // API.updateHiring(id, name, applicantEmail, jobID, jobCompany, jobPost, status);

    API.updateHiring(id, name, applicantEmail, jobID, jobCompany, jobPost, status).then((response) => {
      if (response === 200) {
        this.setState({message: 'An email notification has been sent to the applicant.'});

        setTimeout(function () {
          window.location.reload();
        }, 2000)
        // window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

    handleTabPage(tab) {
      // console.log('In profile', tab);
      let profile = this.props.location.state.firstname.toLowerCase() + this.props.location.state.lastname.toLowerCase();
      // tab = tab.toLowerCase();
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


  render(){
    return (
      <div>
      <div className="container navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
        </div>

        <div id="recruit-main" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1526000171/recruit.jpg)`}}>
          <h1 className="text-center">Find a fit · Hire them</h1>
        </div>

        <div className="bg-color">
        <div className="container" id="applicants-content">
          <div className="col-xs-12 panel panel-body" id="applicant-panel">
            <div className="text-center" id="applicant-header"><h2>Recruit Talents</h2></div><hr /><br />

            {this.state.message ? <p className="text-center alert alert-success"><i className="fa fa-check fa-lg" />{this.state.message}<br /></p> : null}
            {/* <div> */}
            <div className="panel panel-body col-xs-6" id="show-applicants-panel" >
              <h3 className="text-center">Posted Jobs</h3>
              <hr />
              {this.state.jobs.map((value, index) => (
                <div key={index} className="col-xs-12 panel panel-body recruit-joblist" onClick={() => this.setState({show: true, applicants: value.applied, jobID: value.jobID, jobCompany: value.company, jobPost: value.designation, default: false})}>
                  <h5 className="col-xs-12 col-sm-7">{value.designation}</h5> <a className="col-xs-12 col-sm-5 text-right view-applicants-link" onClick={() => this.setState({show: true, applicants: value.applied, jobID: value.jobID, jobCompany: value.company, jobPost: value.designation, default: false})}><i className="fa fa-users" /> View applicants</a>
                </div>
              ))}
            </div>
            {this.state.applicants.length ?
              <div className="panel panel-body col-xs-6" id="list-applicants-panel">
                <h3 className="text-center">Job Applicants</h3>
                <hr />
                {this.state.applicants.map((value, index) => (
                  <div key={index} className="col-xs-12 panel panel-body applicant-list">
                    <h5 className="col-xs-12 col-sm-6">{value.firstname} {value.lastname} <a href={value.resume} target="_blank"><i className="fa fa-download" /></a></h5>
                      {value.isHired === undefined ?
                        <span className="col-xs-12 col-sm-6 hire-btns">
                          <button className="btn btn-default btn-xs" id="hire" onClick={(event) => this.handleHiring(event, value._id, value.firstname, value.email, this.state.jobID, this.state.jobCompany, this.state.jobPost, 'yes')}><i className="fa fa-check" /> Hire</button> &nbsp;
                          <button className="btn btn-default btn-xs" id="dhire" onClick={(event) => this.handleHiring(event, value._id, value.firstname, value.email, this.state.jobID, this.state.jobCompany, this.state.jobPost, 'no')}><i className="fa fa-close" /> Don't hire</button>
                        </span> : value.isHired === false ?
                            <span className="col-xs-12 col-sm-6 hire-btns"><button className="btn btn-default btn-xs btn-danger" disabled><i className="fa fa-close" /> Not hired</button></span> :
                            <span className="col-xs-12 col-sm-6 hire-btns"><button className="btn btn-default btn-xs btn-success" disabled><i className="fa fa-check" /> Hired</button></span>
                      }
                  </div>
                ))}
              </div> :
              <div className="panel-body col-xs-6" id="list-applicants">
                {this.state.default ?
                  <p className="alert alert-info text-center"><i className="fa fa-info-circle fa-lg" /> Click on a job to view the applicants</p> :
                  <p className="alert alert-warning text-center">Oops! No one has applied for this job yet.</p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default Recruit;
