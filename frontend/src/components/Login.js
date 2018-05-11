import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import * as API from '../api/API';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleTabPage = this.handleTabPage.bind(this);
    }

    componentWillMount() {
        // console.log('Login page');
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

    handleLogin(event) {
        event.preventDefault();
        // console.log(event.target.value);
        if (this.state.email && this.state.password) {
            let {email, password} = this.state;
            // API.getUser({email, password});
            // console.log(email, password);
            API.getUser({email, password}).then((data) => {
                // console.log(data);
                if (data === 400) {
                    this.setState({error: 'Please check your credentials'});
                    // this.props.history.push({
                    //   pathname: '/',
                    //   state: ''
                    // });
                } else if(data !== undefined) {
                    // this.setState({isLoggedIn: true, isEmployer: true});
                    data.isLoggedIn = true;
                    // console.log(data.isLoggedIn);
                    let profile = data.firstname.toLowerCase() + data.lastname.toLowerCase();
                    console.log(profile);
                    this.props.history.push({
                        pathname: `/in/${profile}`,
                        state: data
                    })
                } else {
                  this.setState({error: 'User not found'});
                }
            })
        }
    }

    render() {
        return (
            <div className="" id="main">
                <Navbar
                    onSearch={this.handleIt}
                    status={this.state.isLoggedIn}
                    type={this.state.isEmployer}
                    data={this.props.location.state}
                    chooseTab={this.handleTabPage}/>

                <div id="login-container" className="col-xs-12" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1525996473/back.jpg)`}}>
                  <br />
                  <div className="text-center col-md-4 col-md-offset-4">
                    {this.state.error ?
                      <span className="alert alert-danger">
                        <i className="fa fa-close" /> {this.state.error}
                      </span> : null}
                      <div>&nbsp;</div>
                    <form className="form-horizontal login-form panel panel-body" onSubmit={this.handleLogin}>
                      <div className="col-xs-12 text-center login-image">
                        <h2>Log In</h2>
                        <hr />
                        <br />
                        <img
                          src="https://res.cloudinary.com/jobboard/image/upload/v1525871624/login.gif"
                          alt="login"
                          style={{width: 150}}
                         />
                      </div>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <div className="input-group col-xs-12 login-input">
                        <input
                          type="email"
                          className="form-control input-lg"
                          placeholder="Email"
                          autoFocus
                          onChange={(event) => this.setState({email: event.target.value})}
                        />
                        <span className="input-group-addon"><i className="fa fa-user-o" /></span>
                      </div>
                      <br/>
                      <div className="input-group login-input">
                        <input
                          type="password"
                          className="form-control input-lg"
                          placeholder="Password"
                          onChange={(event) => this.setState({password: event.target.value})}
                        />
                        <span className="input-group-addon"><i className="fa fa-low-vision" /></span>
                      </div>

                      <br/><br/>
                      <button className="col-xs-12 btn btn-lg login-btn" type="submit">Login</button>
                      <div>&nbsp;</div>
                      <span>Don't have an account?</span>&nbsp;<Link id="signup-link" to="/signup">SignUp</Link>
                    </form>
                    <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
