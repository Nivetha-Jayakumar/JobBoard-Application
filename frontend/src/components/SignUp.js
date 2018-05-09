import React, {Component} from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
// import ProfilePage from './ProfilePage';
import * as API from '../api/API';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            isEmployer: false,
            company: '',
            designation: '',
            error: '',
            recruiterSignUp: false,
            type: 'Job Seeker',
            check: 'Job Seeker'
            // isLoggedIn: true
        }

        this.handleJobSeekerSignUp = this.handleJobSeekerSignUp.bind(this);
        this.handleEmployerSignUp = this.handleEmployerSignUp.bind(this);
        this.handleTabPage = this.handleTabPage.bind(this);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    handleTabPage(tab) {
      // console.log(tab);
      if (tab === 'join') {
        this.props.history.push('signup');
      } else if (tab === 'login') {
        this.props.history.push('login');
      }
    }

    handleJobSeekerSignUp(event) {
        event.preventDefault();
        // console.log(this.state);
        // console.log(this.props.history);
        let {firstname, lastname, email, password, isEmployer} = this.state;
        if (firstname && lastname && email && password) {
            var user = {firstname, lastname, email, password, isEmployer};
            // console.log(user);
            API.addUser(user).then((data) => {
                // console.log(data);
                if (data !== 400) {
                    // let profile = data.firstname.toLowerCase() + data.lastname.toLowerCase();
                    // console.log(profile);
                    // this.props.history.push({
                    //     pathname: `/in/${profile}`,
                    //     state: data
                    // });
                    this.props.history.push('/login');
                } else {
                    this.setState({error: 'Please enter unique credentials'});
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            this.setState({error: 'Please enter all the details'});
        }
    }

    handleEmployerSignUp(event) {
        event.preventDefault();

        this.setState({isEmployer: true}, () => {
            console.log(this.state);
            let {firstname, lastname, email, password, company, designation, isEmployer} = this.state;
            if (firstname && lastname && email && password && company && designation && isEmployer) {
                var user = {firstname, lastname, email, password, company, designation, isEmployer};
                API.addUser(user).then((data) => {
                    // console.log(data);
                    if (data !== 400) {
                        let profile = data.firstname.toLowerCase() + data.lastname.toLowerCase();
                        this.props.history.push({
                            pathname: `/in/${profile}`,
                            state: data
                        });
                    } else {
                        this.setState({error: 'Please enter unique credentials'});
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                this.setState({error: 'Please enter all the details'});
            }
        });
    }

    changeType() {
      // console.log(this.state.type);
      this.state.type === 'Job Seeker' ? this.setState({type: 'Recruiter'}) : this.setState({type: 'Job Seeker'});

    }

    renderSignUp() {
        return (
            <div className="" id="signup-main">
              {/* <div> */}
                {/*  */}
                <div id="signup-container" className="col-xs-12" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1525877372/signup-bg.jpg)`}}>
                  <br />
                  <div className="text-center col-md-4 col-md-offset-4">
                    {this.state.error ?
                      <span className="alert alert-danger">
                        <i className="fa fa-close" /> {this.state.error}
                      </span> : null}
                      <div>&nbsp;</div>

                      <div className="col-xs-12 text-center signup-image">
                        <br />
                        <h3>Signup as <span
                            id="choose"
                            onClick={() => this.setState({check: this.state.type})}
                            onMouseOver={this.changeType.bind(this)}>
                            {this.state.check}
                          </span>
                        </h3>
                        <br />
                        <hr />
                       </div>

                       {this.state.check === 'Recruiter' ?
                       <form className="form-horizontal login-form panel panel-body" onSubmit={this.handleEmployerSignUp}>
                         <div className="col-xs-12 text-center signup-image">
                           <img
                             src="https://res.cloudinary.com/jobboard/image/upload/v1525874077/signup.gif"
                             alt="login"
                             style={{width: 150}}
                            />
                          </div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="First name"
                              required
                              onChange={(event) => this.setState({firstname: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-address-card-o" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="Last name"
                              required
                              onChange={(event) => this.setState({lastname: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-address-card-o" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="email"
                              className="form-control input-lg"
                              placeholder="Email"
                              required
                              onChange={(event) => this.setState({email: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-tags" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="password"
                              className="form-control input-lg"
                              placeholder="Password"
                              required
                              onChange={(event) => this.setState({password: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-low-vision" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="Company"
                              required
                              onChange={(event) => this.setState({company: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-building-o" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="Designation"
                              required
                              onChange={(event) => this.setState({designation: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-suitcase" /></span>
                          </div>
                          <br />
                         <button className="col-xs-12 btn btn-lg login-btn" type="submit">Sign Up</button>
                         <div>&nbsp;</div>
                         <span>Already have an account?</span>&nbsp;<Link id="signup-link" to="/login">Log In</Link>
                       </form> :
                       <form className="form-horizontal login-form panel panel-body" onSubmit={this.handleJobSeekerSignUp}>
                         <div className="col-xs-12 text-center signup-image">
                           <img
                             src="https://res.cloudinary.com/jobboard/image/upload/v1525876562/signup-jobseeker.gif"
                             alt="login"
                             style={{width: 150}}
                            />
                          </div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="First name"
                              required
                              onChange={(event) => this.setState({firstname: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-address-card-o" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="text"
                              className="form-control input-lg"
                              placeholder="Last name"
                              required
                              onChange={(event) => this.setState({lastname: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-address-card-o" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="email"
                              className="form-control input-lg"
                              placeholder="Email"
                              required
                              onChange={(event) => this.setState({email: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-tags" /></span>
                          </div>
                          <br />
                          <div className="input-group col-xs-12 login-input">
                            <input
                              type="password"
                              className="form-control input-lg"
                              placeholder="Password"
                              required
                              onChange={(event) => this.setState({password: event.target.value})}
                            />
                            <span className="input-group-addon"><i className="fa fa-low-vision" /></span>
                          </div>
                          <br />
                          <br />
                         <button className="col-xs-12 btn btn-lg login-btn" type="submit">Sign Up</button>
                         <div>&nbsp;</div>
                         <span>Already have an account?</span>&nbsp;<Link id="signup-link" to="/login">Log In</Link>
                       </form>
                     }

                  </div>
                </div>
              {/* </div> */}
            </div>
        )
    }


    render() {
      return (
        <div>
            <Navbar
                onSearch={this.handleIt}
                status={this.state.isLoggedIn}
                type={this.state.isEmployer}
                data={this.props.location.state}
                chooseTab={this.handleTabPage}/>

            {this.renderSignUp()}
        </div>
      )
    }
}

export default SignUp;
