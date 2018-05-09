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
    }

    componentWillMount() {
        // console.log('Login page');
        // console.log(this.props);
    }

    handleLogin(event) {
        event.preventDefault();
        // console.log(event.target.value);
        if (this.state.email && this.state.password) {
            let {email, password} = this.state;
            // API.getUser({email, password});
            API.getUser({email, password}).then((data) => {
                // console.log(data);
                if (!data) {
                    this.setState({error: 'Please check your credentials'});
                    // this.props.history.push({
                    //   pathname: '/',
                    //   state: ''
                    // });
                } else {
                    // this.setState({isLoggedIn: true, isEmployer: true});
                    data.isLoggedIn = true;
                    // console.log(data.isLoggedIn);
                    let profile = data.firstname.toLowerCase() + data.lastname.toLowerCase();
                    console.log(profile);
                    this.props.history.push({
                        pathname: `/in/${profile}`,
                        state: data
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="image">
                <Navbar
                    onSearch={this.handleIt}
                    status={this.state.isLoggedIn}
                    type={this.state.isEmployer}
                    data={this.props.location.state}
                    chooseTab={this.handleTabPage}/>
                <div>
                    <div className="container1 signup1 bg">
                        {this.state.error}
                        <h1 className="company">WELCOME TO JOB BOARD</h1>
                        <form onSubmit={this.handleLogin}>
                            {/*<Panel bsStyle="primary"></Panel>*/}
                            {/* <label>
                 <input

                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => this.setState({email: event.target.value})}

              />
            </label>*/}
                            <div className="form-group">
                                <input type="email" name="email" className="form-control input-lg" placeholder="Email"
                                       onChange={(event) => this.setState({email: event.target.value})}/>
                            </div>
                            <br/>
                            {/*<label>
              <input
                type="password"
                name="pwd"
                placeholder="Password"
                onChange={(event) => this.setState({password: event.target.value})}
              />
            </label>*/}
                            <div className="form-group">
                                <input type="password" name="password" className="form-control input-lg"
                                       placeholder="Password"
                                       onChange={(event) => this.setState({password: event.target.value})}/>
                            </div>
                            <br/><br/>
                            <button className="btn btn-primary" type="submit">Login</button>
                        </form>
                        <br/>
                        <span>Don't have an account?</span>&nbsp;<Link to="/signup">SignUp</Link>
                        {/* Don't have an account?<a onClick={() => this.setState({redirect: true})}>SignUp</a> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
