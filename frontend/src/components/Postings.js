import React, { Component } from 'react';
import * as API from '../api/API';

class Postings extends Component {
  constructor(){
    super();
    this.state = {
      company: '',
      jobs: [],
      overview: false,
      isValid: false
    }
  }

  componentWillMount() {
    // console.log(this.props);
    let company = this.props.location.state.company;
    this.setState({company});
    // if (!name) {
    //   name = this.props.match.params.name;
    // }
    // this.setState({company: name});
    //
    API.getCompanyJobs(company).then((data) => {
      if (data !== 400) {
        // console.log(data);
        // console.log(data[0]);
        this.setState({jobs: data, isValid: true});
      } else {
        this.setState({isValid: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({isValid: false});
    })
  }

  renderJobs() {
    if (!this.state.jobs.length) {
      return <h3>No jobs available now</h3>
    } else {
      return (
        <div>
          <h3>Jobs open in {this.state.company}</h3>
          {this.state.jobs.map((value, index) => (
            <div key={index}>
              <p>Job: {value.designation}</p>
              <p>Status: {value.status}</p>
              <p>Posted by: {value.postedBy[0].name}</p>
              <p>Posted on: {value.postedOn}</p>
              <p>Minimum requirements: {value.requirements}</p>
              <p>Job Type: {value.type}</p>
              <hr />
            </div>
          ))}
        </div>
      )
    }
  }

  render() {
    if (this.state.isValid === true) {
      return this.renderJobs();
    } else {
      return null;
    }
  }
}

export default Postings;
