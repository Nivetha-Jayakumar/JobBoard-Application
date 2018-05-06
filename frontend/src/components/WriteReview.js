import React, { Component } from 'react';
// import axios from 'axios';
import * as API from '../api/API';

class WriteReview extends Component {

  constructor() {
    super();
    this.state = {
      job: '',
      status: '',
      title: '',
      pros: '',
      cons: '',
      benefits: '',
      salary: '',
      rating: '',
      isValid: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // const url = 'http://localhost:4000';
    let name = this.props.location.state.company;
    if(!name) {
      name = this.props.match.params.name;
    }

    // console.log(name);

    API.getCompany(name).then((data) => {
      if (data !== 400) {
        this.setState({isValid: true});
      } else {
        this.setState({isValid: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({isValid: false});
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var flag = 0;
    for(var key in this.state) {
      if (this.state[key]) {
        flag+=1;
      }
    }
    // console.log('State values', this.state);
    if (flag===9) {
      var data = this.state;
      // console.log('Data is', data);
      let name = this.props.location.state;
      if (!name) {
        name = this.props.match.params.name;
      }

      API.postReview(name, data).then((res) => {
        if (res === 200) {
          this.props.history.push({
            pathname: `/${name}/reviews`,
            state: name
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log('Not enough data');
    }
  }

  renderWriteReview() {
    // console.log('Rendered');
    return (
      <div>
        <h1>Post a review for {this.props.location.state.company}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Designation:
            <input
              type="text"
              name="job"
              value={this.state.job}
              onChange={(event) => this.setState({job: event.target.value})}
            />
          </label><br/>
          <label>
            Job status:
            <input
              type="text"
              name="status"
              value={this.state.status}
              onChange={(event) => this.setState({status: event.target.value})}
            />
          </label><br/>
          <label>
            Review Title: <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(event) => this.setState({title: event.target.value})}
            />
          </label><br/>
          <label>
            Pros: <input
              type="text"
              name="pros"
              value={this.state.pros}
              onChange={(event) => this.setState({pros: event.target.value})}
            />
          </label><br/>
          <label>
            Cons: <input
              type="text"
              name="cons"
              value={this.state.cons}
              onChange={(event) => this.setState({cons: event.target.value})}
            />
          </label><br/>
          <label>
            Benefits: <input
              type="text"
              name="benefits"
              value={this.state.benefits}
              onChange={(event) => this.setState({benefits: event.target.value})}
            />
          </label><br/>
          <label>
            Salary: <input
              type="text"
              name="salary"
              value={this.state.salary}
              onChange={(event) => this.setState({salary: event.target.value})}
            />
          </label><br/>
          <label>
            Rating: <input
              type="text"
              name="rating"
              value={this.state.rating}
              onChange={(event) => this.setState({rating: event.target.value})}
            />
          </label><br/><br/>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }

  render() {
    if (this.state.isValid === true) {
      return this.renderWriteReview();
    } else {
      // console.log('Not rendered');
      return null;
    }
  }
}

export default WriteReview;
