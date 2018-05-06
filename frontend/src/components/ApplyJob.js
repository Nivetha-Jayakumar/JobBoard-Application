import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import * as API from '../api/API';

class ApplyJob extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.data.isLoggedIn,
      data: this.props.location.state.data,
      job: this.props.location.state.job,
      company: '',
      collapse: false,
      isValid: false,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      university: '',
      gpa: '',
      resume: '',
      dob: '',
      gender: 'Male',
      message: '',
      error: '',
      isDisabled: false,
      redirect: false
    }

    this.handleApplication = this.handleApplication.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    console.log(this.props.location.state.job);
    // let company = this.state.job.company;
    // API.getCompany(company).then((data) => {
    //   // console.log(data);
    //   if (data !== 400) {
    //     this.setState({company: data});
    //   } else {
    //     this.setState({isValid: false});
    //   }
    // }).catch((err) => {
    //   // console.log(err);
    //   this.setState({isValid: false});
    // });
    let applied = [];
    // console.log(this.state.job.applied);
    this.state.job.applied.map((value, index) => {
        applied = applied.concat(value.email);
    });
    console.log(applied);
    // console.log(this.state.data.email);
    if (applied.includes(this.state.data.email)) {
      this.setState({isDisabled: true});
    }
  }

  componentDidMount() {
    // console.log(this.state.job);
  }

  handleTabPage(tab) {
    // console.log(tab);
    let profile = this.state.data.firstname.toLowerCase() + this.state.data.lastname.toLowerCase();
    // console.log(profile);
    tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.props.location.state.data.tokens[0]).then((response) => {
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
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state.data
      })
    }
  }

  handleApplication(event) {
    event.preventDefault();
    // console.log(this.state);

    let application = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      university: this.state.university,
      gpa: this.state.gpa,
      resume: this.state.resume,
      dob: this.state.dob,
      gender: this.state.gender
    }
    let id= this.state.job._id;



    API.postJobApplication(application, id).then((response) => {
      // console.log(response);
      if (response === 200) {
        this.setState({
          message: 'Thank you for applying. A confirmation has been sent to your email',
          firstname: '',
          lastname: '',
          email: '',
          gpa: '',
          dob: '',
          university: '',
          resume: '',
          gender: 'Male',
          phone: '',
          isDisabled: true,
          collapse: false
        });

        API.updateAppliedJobs(this.state.job, 'Pending',  this.state.data._id).catch((err) => {this.setState({message: err})});
      }
    }).catch((err) => {
      // console.log(err);
      this.setState({message: err});
    })
  }

  renderApplyForm() {
    return (
      <div className="col-md-8 col-md-offset-2 text-justify apply-form">
        <br />
        {this.state.message ?
          <div className="text-justify alert alert-success">
            <i className="fa fa-check" /> {this.state.message}
          </div> :
        null}

        <form className="form-horizontal" id="application-form" onSubmit={this.handleApplication}>
          <div className="form-group">
            <label className="col-sm-4 control-label">Add your resume: </label>
            <div className="col-sm-7">
              <input
                type="file"
                className="form-control-file"
                name="resume"
                required
                onChange={(event) => this.setState({resume: event.target.files[0]})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Firstname: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control input-sm"
                value={this.state.firstname}
                required
                onChange={(event) => this.setState({firstname: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Lastname: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control input-sm"
                value={this.state.lastname}
                required
                onChange={(event) => this.setState({lastname: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Email: </label>
            <div className="col-sm-6">
              <input
                type="email"
                className="form-control input-sm"
                value={this.state.email}
                required
                onChange={(event) => this.setState({email: event.target.value})}
               />
               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Phone: </label>
            <div className="col-sm-6">
              <input
                type="tel"
                className="form-control input-sm"
                value={this.state.phone}
                required
                onChange={(event) => this.setState({phone: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Date of birth: </label>
            <div className="col-sm-6">
              <input
                type="date"
                className="form-control input-sm"
                value={this.state.dob}
                required
                onChange={(event) => this.setState({dob: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">University: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control input-sm"
                value={this.state.university}
                required
                onChange={(event) => this.setState({university: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">GPA: </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control input-sm"
                value={this.state.gpa}
                maxLength="4"
                required
                onChange={(event) => this.setState({gpa: event.target.value})}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Gender: </label>
            <div className="col-sm-6 col-md-3">
               <select value={this.state.gender} className="form-control input-sm" onChange={(event) => this.setState({gender: event.target.value})}>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Others">Others</option>
               </select>
            </div>
          </div>

          <br />

          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-5">
              <a onClick={(event) => this.setState({collapse: false})}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" className="btn btn-md btn-primary">Apply</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              type={this.props.location.state.data.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>

          {/* <div className="cover">

          </div> */}

          <div className="container job">
            {/* <div className="col-xs-12 text-center company-logo">
              <img />
            </div> */}

            <div className="col-xs-12 text-center header">
              <h2>{this.state.job.designation} at {this.state.job.company}</h2>
              <br />
              <div className="col-xs-12 col-md-8 col-md-offset-2 job-tags">
                <p className="col-md-3 job-tags">Job ID: {this.state.job.jobID}</p>
                <p className="col-md-3 job-tags">Posted by: {this.state.job.postedBy[0].name}</p>
                <p className="col-md-3 job-tags">Posted on: {this.state.job.postedOn}</p>
                <p className="col-md-3 job-tags">Location: {this.state.job.location}</p>
              </div>

              <br /><br />

              <div className="col-xs-12 col-md-0">&nbsp;</div>

              <div className="col-md-8 col-md-offset-2 about-job-header">
                <h4>About</h4>
                <p className="text-justify apply-job-content">{this.state.job.description}</p>
              </div>

              <br />

              <div className="col-md-8 col-md-offset-2 requirements-job-header">
                <h4>Requirements</h4>
                <p className="text-justify apply-job-content">{this.state.job.requirements}</p>
              </div>

              <br /><br />
              <div className="col-xs-12 col-md-0">&nbsp;</div>

              <div className="col-xs-12 apply-now">
                {this.state.isDisabled ?
                  <div>
                    <button className="btn btn-primary btn-lg apply-btn" disabled onClick={() => this.setState({collapse: true})}>Apply Now</button>
                    <p><i className="fa fa-check-circle" /> &nbsp;You have already applied to this job</p>
                  </div> :
                  <button className="btn btn-primary btn-lg apply-btn" onClick={() => this.setState({collapse: true})}>Apply Now</button>
                }
              </div>
            </div>
            <div>&nbsp;</div>
            {this.state.collapse ? this.renderApplyForm() : null}

          </div>
        </div>
      )
    }

  }
}


export default ApplyJob;
