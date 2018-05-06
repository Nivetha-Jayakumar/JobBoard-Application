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
    this.state.message = '';
    this.state.default = true;
    // this.state.hired = false;
    // this.state.isLoggedIn = this.props.location.state.data.isLoggedIn;

    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleHiring = this.handleHiring.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.applicants);
    console.log(this.props.location.state);

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

    // API.getMyPostedJobs(this.state.email).then((data) => {
    //   // console.log(data);
    //   if (data !== 404) {
    //       this.setState({jobs: data});
    //   } else {
    //     this.setState({error: data})
    //   }
    // }).catch((err) => {
    //   this.setState({error: err});
    // });

  }

  handleHiring(event, id, applicantEmail, jobID, status) {
    event.preventDefault();
    // console.log(jobID);

    API.updateHiring(id, applicantEmail, jobID, status).then((response) => {
      if (response === 200) {
        this.setState({message: 'An email notification has been sent to the applicant.'});

        setTimeout(function () {
          window.location.reload();
        }, 3000)
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
      <div className="container">
        <div className="navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
        </div>

        <div className="container" id="applicants-content">
          <div className="col-xs-12 panel panel-default" id="applicant-panel">
            <div className="panel-heading text-center" id="applicant-header"><h3>Recruit Talents</h3></div><br />
            {this.state.message ? <p className="text-center alert alert-success"><i className="fa fa-check fa-lg" />{this.state.message}<br /></p> : null}
            <div className="panel-body col-xs-6" id="show-applicants">
              <div className="panel panel-heading panel-default text-center" id="posted-header"><h4>Posted Jobs</h4></div>
              {this.state.jobs.map((value, index) => (
                <div key={index} className="col-xs-12 panel panel-body recruit-joblist">
                  <p className="col-xs-12 col-sm-7">{value.designation}</p> <a className="col-xs-12 col-sm-5 text-right view-applicants-link" onClick={() => this.setState({show: true, applicants: value.applied, jobID: value.jobID, default: false})}><i className="fa fa-users" /> View applicants</a>
                </div>
              ))}
            </div>
            {this.state.applicants.length ?
              <div className="panel-body col-xs-6" id="list-applicants">
                <div className="panel panel-heading panel-default text-center" id="posted-header"><h4>Job Applicants</h4></div>
                {this.state.applicants.map((value, index) => (
                  <div key={index} className="col-xs-12 panel panel-body recruit-joblist">
                    <p className="col-xs-12 col-sm-6">{value.firstname} {value.lastname} <a><i className="fa fa-external-link" /></a></p>
                      {value.isHired === undefined ?
                        <span className="col-xs-12 col-sm-6 hire-btns">
                          <button className="btn btn-default btn-xs" id="hire" onClick={(event) => this.handleHiring(event, value._id, value.email, this.state.jobID, 'yes')}><i className="fa fa-check" /> Hire</button> &nbsp;
                          <button className="btn btn-default btn-xs" id="dhire" onClick={(event) => this.handleHiring(event, value._id, value.email, this.state.jobID, 'no')}><i className="fa fa-close" /> Don't hire</button>
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
                  <p className="alert alert-warning text-center">Oops! Noone has applied for this job yet.</p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}


export default Recruit;
