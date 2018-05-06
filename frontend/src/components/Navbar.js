import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// import SearchBox from './SearchBox';
// import * as API from '../api/API';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      type: 'jobs',
      isLoggedIn: false,
      isEmployer: false,
      redirect: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
  }

  componentWillMount(){
    // console.log('Navbar', this.props);
    this.setState({isLoggedIn: this.props.status, isEmployer: this.props.type});
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    if (this.state.search) {
      this.props.onSearch({search: this.state.search, type: this.state.type});
    } else {
      return;
    }

    // this.props.onSearch({search: string, type: this.state.type});
  }

  handleTabs(tab) {
    // console.log(tab);
    this.props.chooseTab(tab);
  }

  handleRedirect(page) {
    // console.log(page);
    if (page === 'join') {
      this.setState({redirect: 'signup'});
    } else if (page === 'login') {
      this.setState({redirect: 'login'});
    }
  }

  renderLogoutMenu(){
    return (
      <nav>
        <div>
          <button onClick={() => this.handleRedirect('join')}>Join</button>
          <button onClick={() => this.handleRedirect('login')}>Login</button>
        </div>
      </nav>
    )
  }

  renderJobSeekerLoginMenu() {
    return (
      <nav>
        <div>
          <a onClick={() => this.handleTabs('profile')}>Profile</a>&nbsp;
          <a onClick={() => this.handleTabs('dashboard')}>Dashboard</a>&nbsp;
          {/* <a onClick={() => this.handleTabs('recruit')}>Recruit</a>&nbsp; */}
          <a onClick={() => this.handleTabs('jobs')}>Jobs</a>&nbsp;
          <a onClick={() => this.handleTabs('companies')}>Companies</a>&nbsp;
          <a onClick={() => this.handleTabs('logout')}>Logout</a>&nbsp;
        </div>
      </nav>
    )
  }

  renderEmployerLoginMenu(){
    return (
      <nav>
        <div>
          <a onClick={() => this.handleTabs('profile')}>Profile</a>&nbsp;
          <a onClick={() => this.handleTabs('dashboard')}>Dashboard</a>&nbsp;
          {/* <a onClick={() => this.handleTabs('recruit')}>Recruit</a>&nbsp; */}
          <a onClick={() => this.handleTabs('jobs')}>Jobs</a>&nbsp;
          <a onClick={() => this.handleTabs('companies')}>Companies</a>&nbsp;
          <a onClick={() => this.handleTabs('postajob')}>Post a Job</a>&nbsp;
          <a onClick={() => this.handleTabs('logout')}>Logout</a>&nbsp;
        </div>
      </nav>

    )
  }

  render() {
    if (this.state.redirect === 'signup') {
      return <Redirect to="/signup" />
    } else if (this.state.redirect === 'login') {
      return <Redirect to="/login" />
    } else if (this.state.isLoggedIn && this.state.isEmployer) {
      return this.renderEmployerLoginMenu();
    } else if (this.state.isLoggedIn && !this.state.isEmployer) {
      // return this.renderLogoutMenu();
      return this.renderJobSeekerLoginMenu();
    } else {
      return this.renderLogoutMenu();
    }
  }
}


export default Navbar;
