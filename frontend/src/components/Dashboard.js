import React, { Component } from 'react';
import {Redirect} from 'react-router';
// import AppliedUsers from './AppliedUsers';
import Navbar from './Navbar';
import * as API from '../api/API';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      emailID: this.props.location.state.email,
      views: this.props.location.state.views,
      jobs: [],
      error: '',
      messages: this.props.location.state.messages,
      isHidden: true,
      isEmployer: this.props.location.state.isEmployer,
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false
    }
    // this.toggleView = this.toggleView.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleInbox = this.handleInbox.bind(this);
  }

  componentWillMount(){
    // console.log(this.props.location.state);
    // this.setState({isHidden: false});
    // console.log(this.state);
    if (this.state.isEmployer) {
      API.getMyPostedJobs(this.state.emailID).then((data) => {
        // console.log(data);
        if (data !== 404) {
            this.setState({jobs: data});
        }
      }).catch((err) => {
        this.setState({error: err});
      });
    } else {
      API.getMyAppliedJobs(this.state.emailID).then((response) => {
        // console.log(response);
        this.setState({jobs: response})
      }).catch((err) => {
        this.setState({error: err})
      });
      // this.setState({jobs: this.props.location.state.myjobs})
    }

  }

  handleInbox(event) {
    event.preventDefault();
    // console.log(this.props.location.state);
    this.props.history.push({
      pathname: `/inbox`,
      state: this.props.location.state
    })
  }

  // toggleView() {
  //   this.setState(prevState => ({
  //     isHidden: !prevState.isHidden
  //   }));
  // }

  handleTabPage(tab) {
    // console.log(this.state);
    // let data = this.state;
    let profile = this.props.location.state.firstname.toLowerCase() + this.props.location.state.lastname.toLowerCase();
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
        state: this.props.location.state
      })
    } else if (tab === 'recruit') {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.props.location.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.props.location.state
      })
    }
  }

  renderEmployerDashboard(){
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


        <div className="container dashboard-content">
          {/* <div className="col-xs-12 panel panel-default text-center success-rate">
            <div className="panel-heading" id="success-rate-header">Your success rate</div>
            <div className="panel-body" id="show-success-rate"> %</div>
          </div> */}

          <div className="col-xs-12 panel panel-default col-md-6 gap">
            <div className="panel-heading text-center" ><h4>Jobs posted</h4></div>
            <div className="panel-body text-center col-xs-12" id="posted-jobs-list">
              {this.state.jobs.length ?
                // <div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="">Status</th>
                      <th className="">Job</th>
                      <th className="">Applicants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jobs.map((value, index) => (
                      <tr key={index}>
                        {value.status === 'Open' ? <td><span className="badge badge-success">Open</span></td> : <td><span className="badge badge-danger">Closed</span></td> }
                        <td className="posted-job">{value.designation}</td>
                        {value.applied.length ? <td><span className="badge badge-info">{value.applied.length}</span> <a onClick={() => this.handleTabPage('recruit')}><i className="fa fa-external-link pull-right" /></a></td> :
                        <td><span className="badge badge-info">0</span> <a className="disabled-link"><i className="fa fa-external-link pull-right" /></a></td> }
                      </tr>
                    ))}
                  </tbody>
                </table> : <p className="alert alert-info"><i className="fa fa-info-circle fa-lg" /> You have not posted a job yet.</p>
              }

            </div>
          </div>

          <div className="col-xs-12 panel panel-default col-md-6 profile-views gap">
            <div className="panel-heading text-center"><h4>Profile views</h4></div>
            <div className="panel-body text-center"><p>{this.state.views}</p></div>
          </div>

          <div id="rejects">

          </div>

          <div id="success-rate">

          </div>
        </div>
      </div>
    )
  }


  render() {
    // console.log(this.state.jobs);
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.jobs && !this.state.error && this.state.isEmployer) {
      return this.renderEmployerDashboard();
    } else if (this.state.error) {
      return (
        <div>
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
            <h3>No jobs posted yet</h3>
        </div>
      );
    } else if (this.state.jobs && !this.state.error && !this.state.isEmployer) {
      let applied = this.state.jobs.length;
      let accepted = 0;
      this.state.jobs.map((value, index) => {
        if (value.status === 'Accepted') {
          accepted += 1;
        }
      });

      let success_rate = parseInt((accepted / applied) * 100);
      // console.log(success_rate);
      if (isNaN(success_rate)) {
        success_rate = 0;
      }

      let inbox = 0;
      this.state.messages.map((value, index) => {
        if (!value.isRead) {
          inbox += 1
        }
      })
      // document.getElementById("data").innerHTML = success_rate;

      return (
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              chooseTab={this.handleTabPage} />
          </div>

          {/* <div className="cover">

          </div> */}

          <div className="container dashboard-content">
            <div className="col-xs-12 panel panel-default text-center success-rate">
              <div className="panel-heading" id="success-rate-header"><h4>Your projected success rate</h4></div>
              <div className="panel-body" id="show-success-rate">{success_rate} %</div>
            </div>

            <div className="col-xs-12 panel panel-default col-md-6 applied-jobs gap">
              <div className="panel-heading text-center" ><h4>Jobs applied</h4></div>
              <div className="panel-body text-center" id="jobs-list">
                {this.state.jobs.length ?
                  <span>
                  {this.state.jobs.map((value, index) => (
                    <div key={index} className="row">
                      <p className="col-xs-8 col-md-8">{value.job} - {value.company}</p>
                      {value.status === 'Pending' ? <p className="col-xs-3 badge badge-info">{value.status}</p> : null }
                      {value.status === 'Accepted' ? <p className="col-xs-3 badge badge-success">{value.status}</p> : null }
                      {value.status === 'Rejected' ? <p className="col-xs-3 badge badge-danger">{value.status}</p> : null }
                    </div>
                  ))}</span> : <p className="alert alert-info"><i className="fa fa-info-circle fa-lg" /> You have not applied to any jobs yet.</p>
                }

              </div>
            </div>

            <div className="col-xs-12 panel panel-default col-md-6 pull-right profile-views gap">
              <div className="panel-heading text-center"><h4>Profile views</h4></div>
              <div className="panel-body text-center views"><p>{this.state.views}</p></div>
            </div>

            <div className="col-xs-12 col-md-6 text-center panel panel-body inbox-panel" onClick={this.handleInbox}>
              <h4>Inbox</h4>
              <hr />
              <h4>{this.props.location.state.messages.length} total messages</h4>
              {inbox === 0 ? null : <h4>{inbox} unread message(s)</h4>}
            </div>

            {/* <div id="success-rate">

            </div> */}
          </div>
        </div>
      )
    }
  }
}

export default Dashboard;
