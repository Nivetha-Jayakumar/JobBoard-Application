import React, { Component } from 'react';
import {Redirect} from 'react-router';
// import {findDOMNode} from 'react-dom';
import Navbar from './Navbar';
// import SearchBox from './SearchBox';
import * as API from '../api/API';

class People extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.query = '';
    this.state.people = [];
    this.state.redirect = false;


    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleViewProfile = this.handleViewProfile.bind(this);
  }

  componentWillMount() {
    // console.log(this.state);
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

  handleTabPage(tab) {
    // console.log('In profile', tab);
    let profile = this.state.firstname.toLowerCase() + this.state.lastname.toLowerCase();
    tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.state.tokens[0]).then((response) => {
        console.log(response);
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state
      })
    }
  }

  handleSearch(event) {
    // console.log(event.target.value);
    if (event.target.value) {
      this.setState({query: event.target.value}, () => {
        if (this.state.query && this.state.query.length) {
          API.getAllUsers(this.state.query, this.state._id).then((users) => {
            if (users) {
              this.setState({people: users});
            } else {
              this.setState({people: []})
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      });
    } else {
      this.setState({people: []})
    }
  }

  renderPeople() {
    return (
      <div className="">
        <h3 className="text-center">We found {this.state.people.length} people for your search</h3>
        {this.state.people.map((value, index) => (
          <div key={index} className="col-sm-4 text-center people-content">
            <a onClick={(event) => this.handleViewProfile(event, value)}>
            <div className="panel text-center panel-body people-panel">
              <span className="col-xs-12 text-center user-avatar"><img src={value.avatar} alt={value.firstname}/></span>
              <span>&nbsp;</span>
              <span className="col-xs-12 make-center user-name">{value.firstname} {value.lastname}</span>
              {value.designation === 'N/A' ? null : <span className="col-xs-12 make-center job-company">{value.designation}</span>}
              <span className="col-xs-12">&nbsp;</span>
              <hr className="job-separator" />
              {value.location ? <span className="job-location"><i className="fa fa-map-marker" /> {value.location}</span> : <span>&nbsp;</span> }
              {/* <span className="pull-right">
                <button className="btn-xs apply-btn" onClick={(event) => this.handleViewJob(event, value)}>APPLY NOW</button>
              </span> */}
            </div></a>
          </div>
        ))}
      </div>
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    } else {
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


          <div id="people-main" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1526000595/people.jpg)`}}>
            <h1 className="text-center">Meet · Greet · Connect </h1>
            <br /><br /><br /><br />
            <div className="col-xs-12 col-md-8 col-md-offset-2  input-group add-on">
                <input
                  id="peoplesearch"
                  type="search"
                  className="form-control input-lg"
                  placeholder="Search"
                  autoFocus
                  onChange={this.handleSearch}
                />
            </div>
          </div>


          <div className="people-search">
            <div className="col-xs-12 peoplelist-content">
              {this.state.people.length ? this.renderPeople() : null}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default People;
