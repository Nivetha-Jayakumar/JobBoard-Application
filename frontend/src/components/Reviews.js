import React, { Component } from 'react';
// import axios from 'axios';
import * as API from '../api/API';

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      isValid: false,
      reviews: []
    }
  }

  componentWillMount() {
    // const url = 'http://localhost:4000';
    console.log('Company in reviews', this.props.location.state);
    let name = this.props.location.state.company;
    if (!name) {
      name = this.props.match.params.name;
    }
    this.setState({company: name})
    // axios.get(`${url}/reviews/${name}`).then((res) => {
    //   if (!res.data) {
    //     console.log('No data');
    //   } else {
    //     this.setState({
    //       reviews: res.data,
    //       isValid: true
    //     });
    //   }
    // }).catch((err) => {
    //   console.log(err);
    //   this.setState({isValid: false})
    // })
    API.getReviews(name).then((data) => {
      if (data !== 400) {
        this.setState({
          reviews: data,
          isValid: true
        });
      } else {
        this.setState({isValid: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({isValid: false});
    })
  }

  renderReviews() {
    return (
      <div>
        <h3>Reviews for {this.state.company}</h3>
        {this.state.reviews.map((value, index) => (
          <div key={index}>
            <h4>Review {index+1}</h4>
            <p>Job: {value.job}</p>
            <p>Status: {value.status}</p>
            <p>Title: {value.title}</p>
            <p>Pros: {value.pros}</p>
            <p>Cons: {value.cons}</p>
            <p>Benefits: {value.benefits}</p>
            <p>Salary: {value.salary}</p>
            <p>Rating: {value.rating}</p>
            <p>Posted on: {value.postedOn}</p>
            <hr />
          </div>
        ))}
      </div>
    )
  }

  render() {
    if (this.state.isValid === true) {
      return this.renderReviews();
    } else {
      return null;
    }
  }
}

export default Reviews;
