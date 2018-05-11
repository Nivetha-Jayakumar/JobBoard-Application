import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import * as API from '../api/API';

class JobsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false,
      jobs: [],
      open: false,
      error: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleCompanySize = this.handleCompanySize.bind(this);
    this.handleViewJob = this.handleViewJob.bind(this);
  }

  componentWillMount(){
    // console.log(this.props);
    // console.log(this.state.jobs);
    API.getAllJobs().then((docs) => {
      this.setState({jobs: docs})
    }).catch((err) => {
      this.setState({error: err});
    });
  }

  handleSearch(string) {
    // console.log(string);
    // this.props.onSearch(string, 'jobs');
    API.getAllSearchedJobs(string).then((data) => {
      if (data !== 404) {
        // console.log(data[0].postedBy[0].name);
        // console.log(data);
        this.setState({jobs: data});
      }
    }).catch((err) => {
      this.setState({error: err});
      console.log(err);
    })
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

  handleViewJob(event, job) {
    event.preventDefault();
    // console.log(job);
    // console.log(job);
    this.props.history.push({
      pathname: `/applyjob`,
      state: {
        data: this.props.location.state,
        job
      }
    })
  }


  handleCompanySize(company, callback) {
    // API.getCompanySize(company);
    API.getCompanySize(company).then((response) => {
      return callback(response.size);
      // console.log(response);
    }).catch((err) => {
      this.setState({error: err})
    });
  }

  renderJobs() {
    return (
      <div id="renderjobs-content">
        <h2 className="text-center">Recent Jobs</h2>
        <h3 className="col-xs-12">{this.state.jobs.length} job (s)</h3>
        <div id="job-div">
        {this.state.jobs.map((value, index) => (
          <div key={index} className="col-sm-4 job-content">
            <div className="panel panel-body job-panel">
              <span className="col-xs-12 make-center job-post">{value.designation}</span>
              <span className="col-xs-12 make-center job-company">{value.company}</span>
              <hr className="job-separator" />
              <span className="job-location"><i className="fa fa-map-marker" /> {value.location}</span>
              <span className="pull-right">
                <button className="btn-xs apply-btn" onClick={(event) => this.handleViewJob(event, value)}>APPLY NOW</button>
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              type={this.props.location.state.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>
        </div>


          <div className="text-center" id="job-search" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1526001777/com.jpg)`}}>
            <h1>Got a dream job in mind? Search for it. </h1>
            <br /><br />
            <div className="col-12 search">
                <SearchBox onSearch={this.handleSearch} type='jobs'/>
            </div>
          </div>

          <div className="list-container">
            <div className="container job-content">
              <div className="col-xs-12 joblist-content">
                {this.state.jobs.length ? this.renderJobs() : null}
              </div>

            </div>
          </div>
        </div>
      )
    }
  }
}


export default JobsPage;
