import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import axios from 'axios';
// import SearchBox from './components/SearchBox';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';
import People from './components/People';
import Dashboard from './components/Dashboard';
import Recruit from './components/Recruit';
// import Profile from './components/Profile';
import PostAJob from './components/PostAJob';
import ApplyJob from './components/ApplyJob';
import JobsPage from './components/JobsPage';
import CompaniesList from './components/CompaniesList';
import CompanyPage from './components/CompanyPage';
import WriteReview from './components/WriteReview';
// import Overview from './components/Overview';
import Reviews from './components/Reviews';
import Postings from './components/Postings';
// import * as API from './api/API';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isLoggedIn: false,
      isEmployer: false
    }

    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    // console.log('App page');
    // console.log(this.props);
  }

  // componentWillUnmount() {
  //   console.log(this.state);
  // }

  // handleLogin(string) {
    // console.log('Inside APP');
    // console.log(string);
    // const {username, email, password} = string;
    // // console.log(username, password);
    // if (email) {
    //   // console.log('Email is present');
    //   API.getUser({email, password}).then((data) => {
    //     if (!data) {
    //       this.setState({isLoggedIn: false});
    //       this.props.history.push({
    //         pathname: '/',
    //         state: ''
    //       });
    //     } else {
    //       this.setState({isLoggedIn: true, isEmployer: true});
    //       data.isLoggedIn = true;
    //       // console.log(data.isLoggedIn);
    //       this.props.history.push({
    //         pathname: `/in/${data.firstname}`,
    //         state: data
    //       })
    //     }
    //   })
    // } else if (username) {
    //   // console.log('Username is present');
    //   API.getUser({username, password}).then((data) => {
    //     if (!data) {
    //       this.setState({isLoggedIn: false});
    //       this.props.history.push('/');
    //       // return console.log('No data');
    //     }
    //     this.setState({isLoggedIn: true, isEmployer: false});
    //     data.isLoggedIn = true;
    //     // console.log('Pushing');
    //     this.props.history.push({
    //       pathname: `/in/${data.username}`,
    //       state: data
    //     })
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
  // }


  // handleSearch(search, category) {
  //   // console.log(string);
  //   // let {search} = string;
  //   // let category = string.type;
  //   // console.log(search, category);
  //   if (search.charAt(0) !== search.charAt(0).toUpperCase()) {
  //     search = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
  //   }
  //   // search = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
  //   // console.log('Changed case', company);
  //   this.setState({search});
  //
  //   if (category === 'jobs') {
  //     API.getAllJobs(search).then((data) => {
  //       if (data !== 404) {
  //         // console.log(data);
  //         if (this.props.history.location.pathname === "/") {
  //           this.props.history.push({
  //             pathname: `jobs/${search}`,
  //             state: search
  //           })
  //         } else {
  //           this.props.history.push({
  //             pathname: `/jobs/${search}`,
  //             state: search
  //           })
  //         }
  //       } else {
  //         console.log('No jobs');
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   } else if (category === 'companies') {
  //     API.getCompany(search).then((data) => {
  //       // console.log(data);
  //       // console.log('Search props', this.props);
  //       // console.log(this.props.history.location);
  //       // if (this.props.history.location.pathname === "/") {
  //         this.props.history.push({
  //           // pathname: `companies/${search}`,
  //           pathname: `/companies`,
  //           state: search
  //         });
  //       // } else {
  //       //   this.props.history.push({
  //       //     pathname: `/companies/${search}`,
  //       //     state: search
  //       //   })
  //       // }
  //     }).catch((err) => {
  //       console.log('Unable to find the company', err);
  //     })
  //   }
  // }


  render() {
    var companyurl, profileurl;
    if (this.state.search) {

      companyurl = `/companies/${this.state.search}`;
      // joburl = `/jobs/${this.state.search}`;
      // console.log('Using default url', companyurl);
    } else {
      companyurl = `/companies/:name`;
      // joburl = `/jobs/:name`;
      // console.log('Using custom url', companyurl);
    }
    // console.log('Company URL', companyurl);
    // if (this.state.isLoggedIn) {
      profileurl = `/in/:profile`;
    // }


    // console.log(companyurl);
    // console.log(joburl);
    // console.log(profileurl);
    // console.log('URL outside if', url);
      return (
        <div>
          {/* <div> */}
            {/* <SearchBox onSearch={this.handleSearch} /> */}
            {/* <Navbar onSearch={this.handleSearch} /> */}
          {/* </div> */}
          <Route exact path="/" render={(props) => (
            <div>
              <div>
                <Navbar {...props} onSearch={this.handleSearch} type={this.state.isEmployer} status={this.state.isLoggedIn}/>
              </div>
              <br />
              <div>
                {/* <SignUp {...props} onLogin={this.handleLogin} /> */}
                <HomePage />
              </div>
            </div>
          )} />

          {/* <Route path={profileurl} component={ProfilePage} /> */}
          {/* <Route exact path="/signup" render={(props) => <SignUp {...props} />} /> */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path={profileurl} render={(props) => <ProfilePage {...props} onSearch={this.handleSearch} />} />
          <Route exact path={profileurl + "/editprofile"} component={EditProfile} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/jobs" component={JobsPage} />
          {/* <Route exact path="/jobs" render={(props) => <JobsPage {...props} onSearch={this.handleSearch} />} /> */}
          {/* <Route exact path={profileurl + "/"} component={Profile} /> */}
          <Route exact path="/postajob" component={PostAJob} />
          <Route exact path="/applyjob" component={ApplyJob} />
          <Route exact path="/recruit" component={Recruit} />
          <Route exact path="/people" component={People} />

          <Route exact path='/companies' component={CompaniesList} />

          <Route path={companyurl} component={CompanyPage} />
          {/* <Route path={companyurl} render={(props) => <CompanyPage {...props} />} /> */}
          <Route exact path={companyurl + "/writereview"} component={WriteReview} />
          {/* <Route exact path={companyurl + "/"} component={Overview} /> */}
          <Route exact path={companyurl + "/reviews"} component={Reviews} />
          <Route exact path={companyurl + "/postings"} component={Postings} />
        </div>
      );


  }
}

export default withRouter(App);
