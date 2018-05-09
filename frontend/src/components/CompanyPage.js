import React, { Component } from 'react';
import Navbar from './Navbar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import Overview from './Overview';
// import axios from 'axios';
// import SearchBox from './SearchBox';
import * as API from '../api/API';


class CompanyPage extends Component {

  constructor(props) {
    super(props);

    this.state = this.props.location.state;
    this.state.redirect = false;
    this.state.isValid = false;
    this.state.isLoggedIn = this.props.location.state.data.isLoggedIn;
    this.state.section = 'overview';
    this.state.message = '';
    this.state.title = '';
    this.state.job = '';
    this.state.status = 'Full-time';
    this.state.description = '';
    this.state.pros = '';
    this.state.cons = '';
    this.state.benefits = '';
    this.state.rating = '';

    this.state.jobs = [];

    this.handleSections = this.handleSections.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    console.log(this.state);
    // console.log(this.props);
    let company = this.state.company.name;
    // if (this.props.location.state) {
    //   company = this.props.location.state.search;
    //   this.setState({name, isLoggedIn: this.props.location.state.isLoggedIn});
    // } else {
    //   company = this.props.match.params.name;
    //   this.setState({company});
    // }
    // console.log(company);

    // API.getCompany(company).then((data) => {
    //   console.log(data);
    //   if (data !== 400) {
    //     this.setState({
    //       about: data.about,
    //       type: data.type,
    //       founder: data.founder,
    //       ceo: data.ceo,
    //       reviews: data.reviews,
    //       isValid: true
    //     });
    //   } else {
    //     this.setState({isValid: false});
    //   }
    // }).catch((err) => {
    //   // console.log(err);
    //   this.setState({isValid: false});
    // });

    API.getCompanyJobs(company).then((data) => {
      if (data !== 400) {
        this.setState({jobs: data, isValid: true});
        // this.setState({jobs: data});
      } else {
        this.setState({isValid: false});
      }
      // console.log(data);
    }).catch((err) => {
      // console.log(err);
      this.setState({isValid: false});
    })

  }

  // handleTabPage(tab) {
  //   // console.log('In profile', tab);
  //   let profile = this.props.location.state.data.firstname;
  //   // console.log(profile,tab);
  //   // tab = tab.toLowerCase();
  //   // // console.log(tab);
  //   if (tab === 'logout') {
  //     API.logout(this.props.location.state.tokens[0]).then((response) => {
  //       if (response === 200) {
  //         this.setState({redirect: true});
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   } else if (tab === 'profile') {
  //     this.props.history.push({
  //       pathname: `/in/${profile}`,
  //       state: this.props.location.state
  //     })
  //   } else {
  //     this.props.history.push({
  //       pathname: `/${tab}`,
  //       state: this.props.location.state
  //     })
  //   }
  // }

  handleTabPage(tab) {
    // console.log(tab);
    let profile = this.state.data.firstname.toLowerCase() + this.state.data.lastname.toLowerCase();
    // console.log(profile);
    // tab = tab.toLowerCase();
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
        state: this.state.data
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state.data
      })
    }
  }

  handleSections(section) {
    // console.log(section);
    // let company = this.state.company;
    if (section === 'overview') {
      this.setState({section: 'overview'});
    } else if (section === 'jobs') {
      this.setState({section: 'jobs'});
    } else if (section === 'reviews') {
      this.setState({section: 'reviews'});
    } else if (section === 'writereview') {
      this.setState({section: 'writereview'});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    let data = {
      job: this.state.job,
      status: this.state.status,
      title: this.state.title,
      pros: this.state.pros,
      cons: this.state.cons,
      benefits: this.state.benefits,
      rating: this.state.rating
    }

    // console.log(data);
    //
    API.postReview(this.state.company.name, data).then((res) => {
      if (res === 200) {
        // this.setState({section: 'reviews'});
        this.setState({message: 'Your review has been posted.'})
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  renderOverview() {
    return (
      <div>
        <div className="col-md-8 col-md-offset-2 about-company-content">
          <h4 className="text-center">About</h4>
          <p className="about-company">{this.state.company.about}</p>
        </div>
      </div>
    )
  }

  renderJobs() {
    if (!this.state.jobs.length) {
      return (
        // <div>
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="alert alert-info">
               <i className="fa fa-info-circle fa-lg" /> There are no open jobs at {this.state.company.name} right now.
               Please check again later.
            </div>
          </div>
        // </div>
      )
    } else {
      return (
        <div className="col-xs-12">
          {this.state.jobs.map((value, index) => (
            <div key={index} className="row each-job">
              <div className="col-xs-12 header">
                {/* <div className="col-xs-4 col-md-1 img">Image</div> */}
                <div className="col-xs-12 col-md-10 col-md-offset-1 post"><p>{value.designation} <Link to={{pathname: '/applyjob', state: {data: this.props.location.state.data, job: value}}} className="view-job" >View job <i className="fa fa fa-share-square-o" /></Link></p></div>
                {/* <div className="col-xs-8 col-md-5 post"><p>{value.designation}</p></div><div className="col-xs-8 col-xs-offset-4 col-md-2 col-md-offset-0 view-job">Hello</div> */}
                <div className="col-xs-12 col-md-10 col-md-offset-1 small-desc">Small Description to explain about the company</div>
              </div>
              <div className="col-xs-12 description">
                {/* <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">{value.company} - {value.location}</div> */}
                {/* <div className="col-xs-12">&nbsp;</div> */}
                <div className="col-xs-4 col-md-offset-1 col-md-3 "><i className="fa fa-check" /> {value.status}</div>
                <div className="col-xs-4 col-md-offset-0 col-md-3 "><i className="fa fa-map-marker" /> {value.location}</div>
                <div className="col-xs-4 col-md-offset-0 col-md-3 "><i className="fa fa-paw" /> {value.applied.length} applicants</div>
                {/* <div className="col-xs-11 col-md-offset-0 col-md-3 col-xs-offset-4"><i className="fa fa-users" /> <i>Test</i> employees</div> */}
              </div>
            </div>
          ))}
        </div>
      )
    }
  }

  renderReviews() {
    let count = this.state.company.reviews.length;
    let sum = 0, average;

    this.state.company.reviews.map((value, index) => {
      sum = sum + parseInt(value.rating);
      // console.log(sum);
    });

    average = sum/count;
    console.log(this.state.comapany);
    // console.log(average);
    if (this.state.company.reviews.length) {
      return (
        <div>
          <div className="col-md-8 col-md-offset-2 review-company-content">
            <div>
              <h4 className="text-center">{this.state.company.reviews.length} Reviews</h4>
              <p className="text-center">Ratings: {average}</p>
            </div>
            <hr />
            <div className="reviews">
              {this.state.company.reviews.map((value, index) => (
                <div key={index} className="row each-review">
                  <div className="col-xs-12 review-header">
                    <div className="col-xs-4 col-md-1 img">Image</div>
                    <div className="col-xs-8 col-md-10 post"><p>"{value.title}"</p></div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 small-desc review-status">- {value.status} {value.job} | {value.postedOn}</div>
                  </div>
                  <div className="col-xs-12 review-description">
                    <br />
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros"><b>Pros</b></div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros">{value.pros}</div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">&nbsp;</div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros"><b>Cons</b></div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros">{value.cons}</div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">&nbsp;</div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros"><b>Benefits</b></div>
                    <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 pros">{value.benefits}</div>
                  </div>
                  <div>&nbsp;</div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="alert alert-info">
             Surprisingly, there are no reviews posted for this company.
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => this.setState({section: 'writereview'})}><i className="fa fa-plus fa-sm" /> Post a review</button>
          </div>
        </div>
      )
    }

  }

  renderWriteReview() {
    return (
      <div>
        <div className="col-md-8 col-md-offset-2 postreview-company-content">
          <br />
          {this.state.message ?
            <div className="text-justify alert alert-success">
              <i className="fa fa-check" /> {this.state.message}
            </div> :
          null}
          <h3 className="text-center">We value your opinion.</h3>
          <hr />
          <br />
          <form className="form-horizontal" id="review-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="col-sm-4 control-label">Review title: </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control input-sm"
                  required
                  onChange={(event) => this.setState({title: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Review description: </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control input-sm"
                  required
                  rows="5"
                  cols="50"
                  onChange={(event) => this.setState({description: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Your designation: </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control input-sm"
                  required
                  onChange={(event) => this.setState({job: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Job status: </label>
              <div className="col-sm-6 col-md-3">
                 <select value={this.state.status} className="form-control input-sm" onChange={(event) => this.setState({status: event.target.value})}>
                   <option value="Full-time">Full-time</option>
                   <option value="Part-time">Part-time</option>
                   <option value="Intern">Intern</option>
                 </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Pros: </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control input-sm"
                  cols="50"
                  rows="5"
                  required
                  onChange={(event) => this.setState({pros: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Cons: </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control input-sm"
                  cols="50"
                  rows="5"
                  required
                  onChange={(event) => this.setState({cons: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Benefits: </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control input-sm"
                  cols="50"
                  rows="5"
                  required
                  onChange={(event) => this.setState({benefits: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">How would you rate this company?: </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control input-sm"
                  required
                  min="1"
                  max="5"
                  maxLength="1"
                  onChange={(event) => this.setState({rating: event.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-5">
                <button type="submit" className="btn btn-md btn-primary">Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  renderCompany() {
    // let company = this.state.company;
    // console.log(this.state);
    return (
      <div>
      <div className="container">
        <div className="navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.data.isEmployer}
            chooseTab={this.handleTabPage} />
        </div>
      </div>

      <div className="text-center company-cover" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1525839201/workplace.jpg)`}}>

      </div>

      <div className="main" id="companypage">
        <div className="container panel panel-body company">

          <div className="text-center companypage-logo">
            <img
              className="avatar"
              src={this.state.company.image}
              alt={this.state.company.name}
              style={{width: 250}}
            />
          </div>

          <div className="text-center">
            {/* <h2>{this.state.company.name}</h2> */}
            <div className="col-xs-12">
              <p><i className="fa fa-map-marker" /> {this.state.company.location}</p>
            </div>
            <br />
            <div className="col-xs-10 col-md-10 col-xs-offset-1 tabs">

              <div className="col-xs-2 col-md-2 col-xs-offset-1 tab" onClick={() => this.handleSections('overview')}>
                <div className="col-xs-12 icon">
                  <i className="fa fa-camera-retro fa-lg" />
                </div>
                <div className="col-xs-12 tab-name hidden-xs">
                  <p>Overview</p>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 tab" onClick={() => this.handleSections('jobs')}>
                <div className="col-xs-12 icon">
                  <i className="fa fa-suitcase fa-lg" />
                </div>
                <div className="col-xs-12 tab-name hidden-xs">
                  <p>Jobs</p>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 tab" onClick={() => this.handleSections('reviews')}>
                <div className="col-xs-12 icon">
                  <i className="fa fa-eye fa-lg" />
                </div>
                <div className="col-xs-12 tab-name hidden-xs">
                  <p>Reviews</p>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 tab" onClick={() => this.handleSections('writereview')}>
                <div className="col-xs-12 icon">
                  <i className="fa fa-pencil-square-o fa-lg" />
                </div>
                <div className="col-xs-12 tab-name hidden-xs">
                  <p>Post a review</p>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 tab" onClick={() => this.handleSections('photos')}>
                <div className="col-xs-12 icon">
                  <i className="fa fa-pencil-square-o fa-lg" />
                </div>
                <div className="col-xs-12 tab-name hidden-xs">
                  <p>Photos</p>
                </div>
              </div>

            </div>
          </div>
          <div>&nbsp;</div>

          {this.state.section === 'overview' ? this.renderOverview() : null}
          {this.state.section === 'jobs' ? this.renderJobs() : null}
          {this.state.section === 'reviews' ? this.renderReviews() : null}
          {this.state.section === 'writereview' ? this.renderWriteReview() : null}
          {this.state.section === 'photos' ? this.renderPhotos() : null}

        </div>
      </div>
      </div>

    )
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (this.state.isValid === true) {
      return this.renderCompany();
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default CompanyPage;
