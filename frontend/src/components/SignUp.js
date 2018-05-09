import React, {Component} from 'react';
import Navbar from './Navbar';
// import {Route} from 'react-router-dom';
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
            recruiterSignUp: false
            // isLoggedIn: true
        }
        // this.state = {
        //   email: '',
        //   firstname: '',
        //   lastname: '',
        //   password: ''
        // }

        this.handleJobSeekerSignUp = this.handleJobSeekerSignUp.bind(this);
        this.handleEmployerSignUp = this.handleEmployerSignUp.bind(this);
        // this.handleJobSeekerLogin = this.handleJobSeekerLogin.bind(this);
        // this.handleEmployerLogin = this.handleEmployerLogin.bind(this);
    }

    componentDidMount() {
        // console.log(this.props);
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
                    let profile = data.firstname.toLowerCase() + data.lastname.toLowerCase();
                    // console.log(profile);
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
    }

    handleEmployerSignUp(event) {
        event.preventDefault();
        // console.log(this.state);
        // var flag = 0;
        // for(var key in this.state) {
        //   if (this.state[key]) {
        //     flag+=1;
        //     // console.log('Flag', flag);
        //   }
        // }
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
        // this.setState({isEmployer: true}, () => {
        //   if (flag === 6 && this.state.isEmployer === true) {
        //     const {firstname, lastname, email, password, company, designation, isEmployer} = this.state;
        //     var user = {
        //       firstname,
        //       lastname,
        //       email,
        //       company,
        //       designation,
        //       password,
        //       isEmployer
        //     }
        //
        //     // console.log(user);
        //
        //     API.addUser(user).then((res) => {
        //       // console.log(data);
        //       if (res.status === 200) {
        //         console.log('Employer set');
        //       } else {
        //         console.log(res);
        //       }
        //     }).catch((err) => {
        //       console.log(err);
        //     });
        //   }
        // });
    }

    renderJobSeekerSignUp() {
        return (
            <div className="one">
                <div>
                    <div className="container1">
                        {/*<h2 className="heading">SignUp as a Job Seeker</h2>*/}
                        <form className="large-form" onSubmit={this.handleJobSeekerSignUp}>
                            <div className="form-group form-step">
                                <div className="signup1">
                                    {/* <label>
                                                First Name: <input
                                                type="text"
                                                name="fname"
                                                // value={this.state.firstname}
                                                onChange={(event) => this.setState({firstname: event.target.value})}
                                            />
                                            </label>*/}
                                    <div className="form-group">
                                        <input type="text" name="fname" className="form-control input-lg"
                                               placeholder="First Name"
                                               onChange={(event) => this.setState({firstname: event.target.value})}/>
                                    </div>
                                    {/*<label>
                                                Last Name: <input
                                                type="text"
                                                name="lname"
                                                // value={this.state.lastname}
                                                onChange={(event) => this.setState({lastname: event.target.value})}
                                            />
                                            </label>*/}
                                    <div className="form-group">
                                        <input type="text" name="lname" className="form-control input-lg"
                                               placeholder="Last Name"
                                               onChange={(event) => this.setState({lastname: event.target.value})}/>
                                    </div>
                                    {/*<label>
                                                Email: <input
                                                type="email"
                                                name="email"
                                                // value={this.state.email}
                                                onChange={(event) => this.setState({email: event.target.value})}
                                            />
                                            </label>*/}
                                    <div className="form-group">
                                        <input type="email" name="email" className="form-control input-lg"
                                               placeholder="Email"
                                               onChange={(event) => this.setState({email: event.target.value})}/>
                                    </div>
                                    {/*<label>
                                                Password: <input
                                                type="password"
                                                name="pwd"
                                                // value={this.state.password}
                                                onChange={(event) => this.setState({password: event.target.value})}
                                            />
                                            </label>*/}
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control input-lg"
                                               placeholder="Password"
                                               onChange={(event) => this.setState({password: event.target.value})}/>
                                    </div>
                                    <br/>
                                    <div>
                                        <input type="checkbox">
                                        </input><label>Click to agree to our policy & terms </label>

                                    </div>
                                    <button className="btn btn-primary" type="submit">Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    renderRecruiterSignUp() {
        return (
            <div className="two">
                <div>
                    <div className="container1">

                        {/*<h2 className="heading">SignUp as a Recruiter</h2>*/}
                        <form onSubmit={this.handleEmployerSignUp}>
                            <div className="signup1">
                                {/* <label className="col-form-label">
                                            First Name: <input
                                            type="text"
                                            name="fname"
                                            // value={this.state.firstname}
                                            onChange={(event) => this.setState({firstname: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="text" name="fname" className="form-control input-lg"
                                           placeholder="First Name"
                                           onChange={(event) => this.setState({firstname: event.target.value})}/>
                                </div>
                                <br/>
                                {/*<label c>
                                            Last Name: <input
                                            type="text"
                                            name="lname"
                                            // value={this.state.lastname}
                                            onChange={(event) => this.setState({lastname: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="text" name="lname" className="form-control input-lg"
                                           placeholder="Last Name"
                                           onChange={(event) => this.setState({lastname: event.target.value})}/>
                                </div>
                                <br/>
                                {/* <label className="col-form-label">
                                            Work Email: <input
                                            type="email"
                                            name="email"
                                            // value={this.state.email}
                                            onChange={(event) => this.setState({email: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control input-lg"
                                           placeholder="Email"
                                           onChange={(event) => this.setState({email: event.target.value})}/>
                                </div>
                                <br/>
                                {/*<label className="col-form-label">
                                            Password: <input
                                            type="password"
                                            name="pwd"
                                            // value={this.state.password}
                                            onChange={(event) => this.setState({password: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control input-lg"
                                           placeholder="Password"
                                           onChange={(event) => this.setState({password: event.target.value})}/>
                                </div>
                                <br/>
                                {/*<label className="col-form-label">
                                            Company: <input
                                            type="text"
                                            name="company"
                                            // value={this.state.company}
                                            onChange={(event) => this.setState({company: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="text" name="company" className="form-control input-lg"
                                           placeholder="Company"
                                           onChange={(event) => this.setState({company: event.target.value})}/>
                                </div>
                                <br/>
                                {/*<label>
                                            Designation: <input
                                            type="text"
                                            name="job"
                                            // value={this.state.designation}
                                            onChange={(event) => this.setState({designation: event.target.value})}
                                        />
                                        </label>*/}
                                <div className="form-group">
                                    <input type="text" name="job" className="form-control input-lg" placeholder="Job"
                                           onChange={(event) => this.setState({designation: event.target.value})}/>
                                </div>
                                <div>
                                    <input type="checkbox">
                                    </input><label>Click to agree to our policy & terms </label>

                                </div>
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    renderSignup() {
        return (
            <div>
                <Navbar
                    onSearch={this.handleIt}
                    status={this.state.isLoggedIn}
                    type={this.state.isEmployer}
                    data={this.props.location.state}
                    chooseTab={this.handleTabPage}/>
                {/*<div className="image">*/}

                <div>
                    <div className="ib seeker_image"><h1  onClick={() => this.setState({recruiterSignUp: false})}>Job Seeker </h1></div>
                    <div className="ib recruiter_image">  <h1  onClick={() => this.setState({recruiterSignUp: true})}>Recruiter </h1></div>
                </div>
                {this.state.recruiterSignUp ? this.renderRecruiterSignUp() : this.renderJobSeekerSignUp()}


            </div>
        )
    }

    render() {
        // console.log(this.state.isLoggedIn);
        // if (this.state.isLoggedIn) {
        //   return this.renderLogin();
        // } else {
        return this.renderSignup();
        // }
    }
}

export default SignUp;
