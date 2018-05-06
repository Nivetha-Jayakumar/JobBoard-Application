import React, { Component } from 'react';
// import axios from 'axios';
import * as API from '../api/API';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      about: '',
      type: '',
      founder: '',
      ceo: '',
      isValid: false
    }
  }

  componentWillMount() {
    // console.log('Overview Component loaded');
    // const url='http://localhost:4000';
    let name = this.props.location.state.company;
    // console.log('Location', name);
    if (!name) {
      name = this.props.match.params.name;
      // console.log('Params', name);
    }
    API.getCompany(name).then((data) => {
      if (data !== 400) {
        this.setState({
          about: data.about,
          type: data.type,
          founder: data.founder,
          ceo: data.ceo,
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

  renderOverview() {
    return (
      <div>
        <h3>About: </h3>
        <p>{this.state.about}</p>
        <h3>Company type:</h3>
        <p>{this.state.type}</p>
        <h3>Founder(s):</h3>
        <p>{this.state.founder}</p>
        <h3>CEO:</h3>
        <p>{this.state.ceo}</p>
      </div>
    )
  }

  render() {
    if(this.state.isValid === true) {
      return this.renderOverview()
    } else {
      return null;
    }
  }
}

export default Overview;
