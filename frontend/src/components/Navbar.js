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
      redirect: '',
      profile: false,
      dashboard: false,
      jobs: false,
      companies: false,
      people: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
  }

  componentWillMount(){
    console.log('Navbar', this.props);
    // console.log(this.props.location);
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
    if (tab === 'profile') {
      this.setState({
        profile: true,
        dashboard: false,
        jobs: false,
        companies: false,
        people: false
      })
    } else if (tab === 'dashboard') {
      this.setState({
        profile: false,
        dashboard: true,
        jobs: false,
        companies: false,
        people: false
      })
    } else if (tab === 'people') {
      this.setState({
        profile: false,
        dashboard: false,
        jobs: false,
        companies: false,
        people: true
      })
    } else if (tab === 'jobs') {
      this.setState({
        profile: false,
        dashboard: false,
        jobs: true,
        companies: false,
        people: false
      })
    } else if (tab === 'companies') {
      this.setState({
        profile: false,
        dashboard: false,
        jobs: false,
        companies: true,
        people: false
      })
    }
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
      <nav className="navbar navbar-fixed-top">
        <div className="container navbar-container">
          <div className="navbar-header">
            <button className="btn navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" onClick={() => <Redirect to="/" />}>
              <img src="https://res.cloudinary.com/jobboard/image/upload/v1526005869/logo-white.png" alt="JobSeek" style={{width: 90, height: 90}} />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="nav navbar-nav navbar-right">
              <li><a className="hvr-underline-from-center logout-links" onClick={() => this.handleTabs('join')}>Join</a></li>
              <li>&nbsp;</li>
              <li><a className="hvr-underline-from-center logout-links" onClick={() => this.handleTabs('login')}>Login</a></li>
            </ul>
          </div>
        </div>
    </nav>
    )
  }

  renderJobSeekerLoginMenu() {
    return (
      // <nav>
      //   <div>
      //     <a onClick={() => this.handleTabs('profile')}>Profile</a>&nbsp;
      //     <a onClick={() => this.handleTabs('dashboard')}>Dashboard</a>&nbsp;
      //     <a onClick={() => this.handleTabs('people')}>People</a>&nbsp;
      //     <a onClick={() => this.handleTabs('jobs')}>Jobs</a>&nbsp;
      //     <a onClick={() => this.handleTabs('companies')}>Companies</a>&nbsp;
      //     <a onClick={() => this.handleTabs('logout')}>Logout</a>&nbsp;
      //   </div>
      // </nav>
      <nav className="navbar">
        <div className="navbar-container">
          <div className=" navbar-header">
            <button className="btn navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className=" navbar-brand" onClick={() => this.setState({redirect: true})}>
              <img src="https://res.cloudinary.com/jobboard/image/upload/v1526005697/logo-new.png" alt="JobSeek" style={{width: 40, height: 40}} />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="nav navbar-nav">
              <li><a className="pro-tab add" onClick={() => this.handleTabs('profile')}>Profile</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('dashboard')}>Dashboard</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('people')}>People</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('jobs')}>Jobs</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('companies')}>Companies</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="pro-tab add" onClick={() => this.handleTabs('logout')}>Logout</a></li>
            </ul>
          </div>
        </div>
    </nav>
    )
  }

  renderEmployerLoginMenu(){
    return (
      // <nav>
      //   <div>
      //     <a onClick={() => this.handleTabs('profile')}>Profile</a>&nbsp;
      //     <a onClick={() => this.handleTabs('dashboard')}>Dashboard</a>&nbsp;
      //     <a onClick={() => this.handleTabs('people')}>People</a>&nbsp;
      //     <a onClick={() => this.handleTabs('jobs')}>Jobs</a>&nbsp;
      //     <a onClick={() => this.handleTabs('companies')}>Companies</a>&nbsp;
      //     <a onClick={() => this.handleTabs('postajob')}>Post a Job</a>&nbsp;
      //     <a onClick={() => this.handleTabs('logout')}>Logout</a>&nbsp;
      //   </div>
      // </nav>
      <nav className="navbar">
        <div className="navbar-container">
          <div className=" navbar-header">
            <button className="btn navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className=" navbar-brand" onClick={() => this.setState({redirect: true})}>
              <img src="https://res.cloudinary.com/jobboard/image/upload/v1526005697/logo-new.png" alt="JobSeek" style={{width: 40, height: 40}} />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="nav navbar-nav">
              <li><a className="pro-tab add" onClick={() => this.handleTabs('profile')}>Profile</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('dashboard')}>Dashboard</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('people')}>People</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('jobs')}>Jobs</a></li>
              <li><a className="pro-tab add"  onClick={() => this.handleTabs('companies')}>Companies</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="pro-tab add" onClick={() => this.handleTabs('postajob')}><i className="fa fa-plus" /> Post a Job</a></li>
              <li><a className="pro-tab add" onClick={() => this.handleTabs('logout')}>Logout</a></li>
            </ul>
          </div>
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
