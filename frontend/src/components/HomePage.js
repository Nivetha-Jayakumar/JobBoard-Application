import React, {Component} from 'react';

class HomePage extends Component {
    render() {
        return (
            <div id="home-page-content" className="text-center">
              <div id="home-page-header">
                <h1>The Easiest Way To Get Your New Job</h1>
                <h5>Find Jobs, Employment & Career Opportunities</h5>
                <br />
                <h3>Apply to jobs · Talk with recruiters directly · Get Hired</h3>
                <br/><br /><br /><br /><br/><br /><br />
                <h4>Increase your chances of getting hired by almost <span id="highlight">95%</span></h4>
              </div>

              <div id="home-page-working" className="col-xs-12">
                <h1>How It Works</h1>
                <h5 className="">Each month, more than 10000 job seekers turn to our website in their search for work, making over 160,000 applications every day.</h5>
                <div className="col-xs-12 how-to">
                  <div className="col-md-4">
                    <div className="how-to-icon">
                      <i className="fa fa-user-o" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default HomePage;
