import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import * as API from '../api/API';
import {Link} from 'react-router-dom';

class CompaniesList extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false,
      companies: [],
      error: '',
      search: '',
      searchCompany: {},
      isHidden: true,
      pages : 0,
      currentPage : 1
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleViewJob = this.handleViewJob.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.companies);
    // console.log(this.props.location.state);
    API.getAllCompanies().then((data) => {
      // console.log(data);
      this.setState({
        companies: data,
        pages : Math.ceil(data.length / 6)
      });
    });
  }

  handleSearch(company) {
    // console.log(string);
    this.setState({search: company});
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

  handlePage = (events) => {
    events.preventDefault();
    let pg = Number(events.target.innerHTML)
    console.log("Inside handle page : ",events.target.innerHTML);
    if(events.target.innerHTML == 'Last'){
      pg = this.state.pages
    }else if(events.target.innerHTML == 'First'){
      pg = 1;
    }
    console.log("Page Value : ",pg);
    this.setState({
        currentPage : pg
    });
    //this.forceUpdate();
  }
  gotoCompany(company) {
    // console.log(company);
    this.props.location.state.search = company;

    this.props.history.push({
      pathname: `/companies/${company}`,
      state: this.props.location.state
    });
  }

  handleViewJob(event, company) {
    event.preventDefault();
    // gotoCompany(company);
    this.props.history.push({
      pathname: `/companies/${company.name}`,
      state: {
        data: this.props.location.state,
        company
      }
    })

  }

  renderSearchCompany() {
    return (
      <div className="">
        <h2 className="text-center">Search results for "{this.state.search}"</h2>
        {/* <h3 className="col-xs-12">{this.state.companies.length} companies found</h3> */}
        {/* {this.state.companies.map((value, index) => ( */}
          <div className="col-sm-4 job-content">
            <div className="panel panel-body job-panel">
              <span className="col-xs-12 text-center company-logo"><img src={this.state.searchCompany.image} alt={this.state.searchCompany.name} /></span>
              <span className="col-xs-12 make-center job-post">{this.state.searchCompany.name}</span>
              <span className="col-xs-12 make-center job-company">{this.state.searchCompany.location}</span>
              <hr className="job-separator" />
              <span className="job-location"><i className="fa fa-users" /> {this.state.searchCompany.size} employees</span>
              <span className="pull-right">
                <button className="btn-xs apply-btn" onClick={(event) => this.handleViewJob(event, this.state.searchCompany)}>VIEW PAGE</button>
              </span>
            </div>
          </div>
        {/* ))} */}
      </div>
    )
  }


  renderCompanies() {

    let userMessage;
        let i;
        var one = null,two = null,three = [],four = null,five = null;

        if(this.state.pages > 0){
            if(this.state.currentPage === 1){
                one = (
                    <li className="disabled" value = {1} ><a onClick = {this.handlePage}>First</a></li>
                );
            }else{
                one = (
                    <li value = {1} ><a onClick = {this.handlePage}>First</a></li>
                )
            }
            if(this.state.current > 5){
                i = this.state.current - 4;
            }else{
                i = 1;
            }
            if(i !== 1){
                two = (
                    <li className="disabled"><a>...</a></li>
                )
            }
            for(;i <= (Number(this.state.currentPage) + 4) && i <= this.state.pages; i++){
                if(i === Number(this.state.currentPage)){
                    // console.log("Inside Active loop : " + i);
                    three[three.length] = (
                        <li className="active">
                            <a value = {i}>{i}</a>
                        </li>
                    )
                }else{
                    console.log("In else part : " + this.state.currentPage + " i value : " + i);
                    three[three.length] = (
                        <li onClick = {this.handlePage}>
                            {/*<a href={"/user/" + i}>{i}</a>*/}
                            <a>{i}</a>
                        </li>
                    )
                }
                if(i === Number(this.state.current) + 4 && i < this.state.pages){
                    four = (
                        <li className="disabled"><a>...</a></li>
                    );
                }
            }
            if(this.state.current === this.state.pages){
                five = (
                    <li className="disabled"><a>Last</a></li>
                )
            }else{
                five = (
                    <li><a onClick = {this.handlePage}>Last</a></li>
                )
            }
            userMessage = (
              <div className="col-xs-12 text-center">
                <ul className="pagination text-center">
                    {one}
                    {two}
                    {three}
                    {four}
                    {five}
                </ul>
              </div>

            )
        }

        var count = this.state.companies.length;

        let result = this.state.companies.slice((6 * this.state.currentPage) - 6,this.state.currentPage*6);
        //console.log("Answer : ",JSON.stringify(result));
    return (
      <div className="">
        <h3 className="text-center">Most followed companies</h3>
        <h4 className="col-xs-12">{this.state.companies.length} companies</h4>
        <div id="joblist-content">
        {result.map((value, index) => (
          <div key={index} className="col-sm-4 job-content item active">
            <div className="panel panel-body job-panel">
              <span className="col-xs-12 text-center company-logo"><img src={value.image} alt={value.name} /></span>
              <span className="col-xs-12 make-center job-post">{value.name}</span>
              <span className="col-xs-12 make-center job-company">{value.location}</span>
              <hr className="job-separator" />
              <span className="job-location"><i className="fa fa-users" /> {value.size}</span>
              <span className="pull-right">
                <button className="btn-xs apply-btn" onClick={(event) => this.handleViewJob(event, value)}>VIEW PAGE</button>
              </span>
            </div>
          </div>
        ))}
      </div>
      {userMessage}
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

          <div>&nbsp;</div>
          <div className="text-center" id="company-search">
            <h1>Over 100+ Fortune 500 companies use JobSeek.</h1>
            <br /><br />
            <div className="col-12 search">
                <SearchBox onSearch={this.handleSearch}/>
            </div>
          </div>

        <div className="list-container">
          <div className="container company-content">
            <div className="row companylist-content">
              {/* {this.state.jobs.length ? this.renderJobs() : null} */}
              {Object.keys(this.state.searchCompany).length ? this.renderSearchCompany() : this.renderCompanies()}
            </div>
          </div>
        </div>
        </div>

      )
    }
  }
}

export default CompaniesList;
