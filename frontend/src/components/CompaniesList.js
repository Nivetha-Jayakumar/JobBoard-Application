import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import * as API from '../api/API';

class CompaniesList extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false,
      companies: [],
      error: '',
      searchCompany: {},
      isHidden: true
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.companies);
    // console.log(this.props.location.state);
    API.getAllCompanies().then((data) => {
      // console.log(data);
      this.setState({companies: data});
    });
  }

  handleSearch(company) {
    // console.log(string);
    company = company.charAt(0).toUpperCase() + company.slice(1).toLowerCase();
    this.props.location.state.search = company;
    API.getCompany(company).then((data) => {
        // this.props.history.push({
        //   pathname: `/companies/${company}`,
        //   state: this.props.location.state
        // });
        // console.log(data);
        this.setState({searchCompany: data});
        // this.setState({searchCompany: data}, () => console.log(this.state.companies));
        // console.log(data);
    }).catch((err) => {
      this.setState({error: err});
      console.log('Unable to find the company', err);
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

  gotoCompany(company) {
    // console.log(company);
    this.props.location.state.search = company;

    this.props.history.push({
      pathname: `/companies/${company}`,
      state: this.props.location.state
    });
  }

  renderSearchCompany() {
    return (
      <div className="col-xs-12">
        <div className="row each-company">
          <div className="col-xs-12 header">
            <div className="col-xs-4 col-md-1 img">Image</div>
            <div className="col-xs-8 col-md-11 post"><p>{this.state.searchCompany.name} <Link to={{pathname: `/companies/${this.state.searchCompany.name}`, state: {company: this.state.searchCompany, data: this.props.location.state}}} className="view-job" >View company <i className="fa fa fa-share-square-o" /></Link></p></div>
            <div className="col-xs-4 col-xs-offset-4 col-md-3 col-md-offset-1 small-desc"><i className="fa fa-map-marker" /> {this.state.searchCompany.location}</div>
            <div className="col-xs-4 col-md-4 pull-left small-desc"><i className="fa fa-users" /> {this.state.searchCompany.size} <span className="hidden-xs">employees</span></div>
          </div>
          <div className="col-xs-12 description">
            <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">{this.state.searchCompany.short_description}</div>
          </div>
        </div>
      </div>
    )
  }

  renderCompanies() {
    return (
      <div className="col-xs-12">
        {this.state.companies.map((value, index) => (
          <div key={index} className="row each-company">
            <div className="col-xs-12 header">
              <div className="col-xs-4 col-md-1 img">Image</div>
              <div className="col-xs-8 col-md-11 post"><p>{value.name} <Link to={{pathname: `/companies/${value.name}`, state: {company: value, data: this.props.location.state}}} target="" className="view-job" >View company <i className="fa fa fa-share-square-o" /></Link></p></div>
              <div className="col-xs-4 col-xs-offset-4 col-md-3 col-md-offset-1 small-desc"><i className="fa fa-map-marker" /> {value.location}</div>
              <div className="col-xs-4 col-md-4 pull-left small-desc"><i className="fa fa-users" /> {value.size} <span className="hidden-xs">employees</span></div>
            </div>
            <div className="col-xs-12 description">
              <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">{value.short_description}</div>
              {/* <div className="col-xs-12">&nbsp;</div>
              <div className="col-xs-11 col-md-offset-1 col-md-3 col-xs-offset-4"><i className="fa fa-check" /> {value.status}</div>
              <div className="col-xs-11 col-md-offset-0 col-md-3 col-xs-offset-4"><i className="fa fa-paw" /> {value.applied.length} applicants</div>
              <div className="col-xs-11 col-md-offset-0 col-md-3 col-xs-offset-4"><i className="fa fa-users" /> <i>Test</i> employees</div> */}
            </div>
          </div>
        ))}
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
              type={this.props.location.state.isEmployer}
              chooseTab={this.handleTabPage} />
          </div>

          {/* <br /> */}
          <div className="text-center">
            <h3>Over 100+ Fortune 500 companies use JobSeek.</h3>
          </div>

          <div className="container company-content">
            <div className="col-12 search">
                <SearchBox onSearch={this.handleSearch}/>
            </div>
            <br /><br />
            <div className="col-xs-12 companylist-content">
              {/* {this.state.jobs.length ? this.renderJobs() : null} */}
              {Object.keys(this.state.searchCompany).length ? this.renderSearchCompany() : this.renderCompanies()}
            </div>

          </div>

        </div>
      )
    }
  }
}

export default CompaniesList;
