import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navbar from './Navbar';

class HomePage extends Component {
    constructor(props){
      super(props);
      this.state = {
        isLoggedIn:  false
      }

      this.handleTabPage = this.handleTabPage.bind(this);
    }

    // componentDidMount() {
    //
    // }

    handleTabPage(tab) {
      // console.log(tab);
      if (tab === 'join') {
        this.props.history.push('/signup');
      } else if (tab === 'login') {
        this.props.history.push('/login');
      }
    }

    render() {
      let bg = 'https://res.cloudinary.com/jobboard/image/upload/v1525989587/background.jpg';
        return (
          <div>
              <Navbar
                  onSearch={this.handleIt}
                  status={this.state.isLoggedIn}
                  type={this.state.isEmployer}
                  data={this.props.location.state}
                  chooseTab={this.handleTabPage}/>
            <div id="home-page-content" className="text-center">
              <div id="home-page-header">
                <Particles
                  params={{
                    particles: {
                      number: {
                        value: 200
                      },
                        line_linked: {
                            enable: true,
                            color: "#fff",
                            width: 1
                        }
                    }
                  }}
                  style={{
                    position: 'absolute',
                    background: 'black',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    backgroundImage: `url(${bg})`
                  }}
                />
                {/* <canvas className="background" ></canvas> */}
                <h1 id="website">JOBSEEK</h1>
                <h1>The Easiest Way To Get Your New Job</h1>
                <h5>Find Jobs, Employment & Career Opportunities</h5>
                <br />
                <h3>Apply to jobs · Talk with recruiters directly · Get Hired</h3>
                <br/><br /><br /><br /><br/><br /><br />
                <h4>Increase your chances of getting hired by almost <span id="highlight">95%</span></h4>
              </div>

              <div id="home-page-working" className="col-xs-12">
                <h1>How It Works</h1>
                <h5>Each month, more than 10000 job seekers turn to our website in their search for work, making over 160,000 applications every day.</h5>
                <br /><br /><br /><br />
                <div className="col-xs-12 how-to">
                  <div className="col-md-4 each">
                    <div className="how-to-icon">
                      <i className="fa fa-user-o" />
                    </div>
                      <h3>Create an account</h3>
                      <p>Update your profile and search for a job. We have the right job for you.</p>
                  </div>
                  <div className="col-md-4 each">
                    <div className="how-to-icon">
                      <i className="fa fa-search-plus" />
                    </div>
                      <h3>Search & Specify your job</h3>
                      <p>Browse profiles, reviews, and proposals then interview top candidates.</p>
                  </div>
                  <div className="col-md-4 each">
                    <div className="how-to-icon">
                      <i className="fa fa-th-list" />
                    </div>
                      <h3>Search & Specify your job</h3>
                      <p>Browse profiles, reviews, and proposals then interview top candidates.</p>
                  </div>
                </div>
              </div>

              <div id="site-stats" className="col-xs-12" style={{backgroundImage: `url(https://res.cloudinary.com/jobboard/image/upload/v1525862295/stats.jpg)`}} >
                <h1>JobSeek Site Stats</h1>
                <h5>Here we list our site stats and how many people we’ve helped find a job and companies have found recruits.</h5>
                <br /><br /><br />
                <div className="col-xs-12 stats">
                  <div className="col-md-3 each stat">
                    <h1>40</h1>
                    <h4>Jobs Posted</h4>
                  </div>
                  <div className="col-md-3 each stat">
                    <h1>70</h1>
                    <h4>Jobs filled</h4>
                  </div>
                  <div className="col-md-3 each stat">
                    <h1>100</h1>
                    <h4>Companies</h4>
                  </div>
                  <div className="col-md-3 each">
                    <h1>50</h1>
                    <h4>Members</h4>
                  </div>
                </div>
              </div>

              <div id="need-help" className="text-justify col-xs-12">
                  <div className="col-md-5 col-md-offset-1" id="need-help-header">
                    <h2>Still need help ?</h2>
                    <h5>Let us know about your issue and a Professional will reach you out.</h5>
                  </div>
                  <div className="col-md-6" id="need-help-box">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control input-lg need-help"
                        placeholder="Enter a valid email address"
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-lg search-btn"><i className="fa fa-search fa-lg" /></button>
                      </span>
                    </div>
                  </div>
              </div>

              <div id="about-page" className="col-xs-12 text-center">
                <img src="https://res.cloudinary.com/jobboard/image/upload/v1526005697/logo-new.png" alt='jobseek-logo' style={{width:100}} />
                <h5 >One Washington Square, San Jose 95192, California</h5>
                <h5>+1 510 458 1477</h5>
                <h5>info@jobseek.com</h5>
              </div>

              <div className="text-center footer col-xs-12">
                <h5>© 2018 JobSeek All rights reserved. Design by Raghav, Ajay and Mangesh</h5>
              </div>
            </div>
          </div>
        )
    }
}

export default HomePage;
