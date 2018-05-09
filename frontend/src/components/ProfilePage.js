import React, { Component } from 'react';
import Navbar from './Navbar';
// import EditProfile from './EditProfile';
import {Redirect} from 'react-router';
import { Button } from 'react-bootstrap';
import * as API from '../api/API';
import '../App.css';

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.redirect = false;
    this.state.file = null;
    this.state.editable = false;
    this.state.addSkill = false;
    this.state.addProject = false;
    this.state.addEducation = false;
    this.state.addWork = false;
    this.state.skillset = {};
    this.state.addUniversity = '';
    this.state.addMajor = '';
    this.state.addDegree = '';
    this.state.addGPA = '';
    this.state.addAchievements = '';
    this.state.gradMonth = 'January';
    this.state.gradYear = '2019';
    this.state.addTitle = '';
    this.state.addDescription = '';
    this.state.addRole = '';
    this.state.addLink = '';
    this.state.addCompany = '';
    this.state.addJob = '';
    this.state.addJobDesc = '';
    this.state.addFromYear = '2017';
    this.state.addToYear = 'Present';
    this.state.sendMessage = false;
    this.state.message = '';


    // this.login = this.login.bind(this);
    this.handleIt = this.handleIt.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpdateSkills = this.handleUpdateSkills.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleAddWork = this.handleAddWork.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.gotToEdit = this.gotToEdit.bind(this);
    this.handleUploadCover = this.handleUploadCover.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount() {
    // console.log('Profilepage Component Mounted');
    // console.log(this.props.location.state);
    // console.log(this.state);
    // console.log(this.state.cover);
    // console.log(this.props.match.params);
  }

  handleIt(string) {
    // console.log('HandleIt');
    this.props.onSearch(string);
    // this.setState({redirect: 'companies', search: string})
  }

  gotToEdit() {
    this.setState({editable: true});
  }

  handleLogout(event) {
    event.preventDefault();
    // console.log(this.state.email);
    API.logout(this.state.tokens[0]).then((response) => {
      if (response === 200) {
        this.setState({redirect: true});
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSendMessage(event) {
    event.preventDefault();
    this.setState({sendMessage: false});

    // console.log(this.state.message);
    // console.log(this.state.profile.firstname);
    // console.log(this.state.data.firstname);
    let data = {
      from: this.state.data.firstname + ' ' + this.state.data.lastname,
      to: this.state.profile.firstname + ' ' + this.state.profile.lastname,
      message: this.state.message
    }
    // console.log(data);

    API.sendMessage(data, this.state.profile._id);
  }


  handleTabPage(tab) {
    // console.log('In profile', tab);
    if (this.state.data) {
      let profile = this.state.data.firstname.toLowerCase() + this.state.data.lastname.toLowerCase();
      // console.log(profile);
      if (tab === 'logout') {
        API.logout(this.state.data.tokens[0]).then((response) => {
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
        // this.setState(this.state.data, () => this.render());
      } else {
        this.props.history.push({
          pathname: `/${tab}`,
          state: this.state.data
        })
      }
    } else {
      let profile = this.state.firstname.toLowerCase() + this.state.lastname.toLowerCase();
      // tab = tab.toLowerCase();
      // console.log(tab);
      if (tab === 'logout') {
        API.logout(this.state.tokens[0]).then((response) => {
          if (response === 200) {
            this.setState({redirect: true});
          }
        }).catch((err) => {
          console.log(err);
        })
      } else if (tab === 'profile') {
        this.props.history.push({
          pathname: `/in/${profile}`,
          state: this.state
        })
      } else {
        this.props.history.push({
          pathname: `/${tab}`,
          state: this.state
        })
      }
    }
  }

  handleUpdateSkills(event) {
    event.preventDefault();
    // console.log(this.state.skillset);
    let skills = this.state.skillset;

    API.updateSkills(skills, this.state._id).then((response) => {
      this.setState({skills: response.skills, addSkill: false})
    }).catch((err) => {
      console.log(err);
    });
  }

  handleEditProfile(event) {
    event.preventDefault();
    let profile = this.state.firstname.toLowerCase() + this.state.lastname.toLowerCase();
    // console.log('Edit profile');
    this.props.history.push({
      pathname: `/in/${profile}/editprofile`,
      state: this.state
    });
  }

  handleUpdateProfile() {
    // console.log(this.state);
    let id = this.props.location.state._id;
    let userProfile = {
      company: this.state.company,
      designation: this.state.designation,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }
    // console.log(userProfile);
    // API.updateProfile(userProfile, id);
    API.updateProfile(userProfile, id).then((updatedProfile) => {
      // console.log(updatedProfile);
      this.setState({
        company: updatedProfile.company,
        designation: updatedProfile.designation,
        email: updatedProfile.email,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpload(event){
    event.preventDefault();
    let id = this.state._id;
    this.setState({file: event.target.files[0]}, () => {
      API.uploadImage(this.state.file, id).then((response) => {
        this.setState({avatar: response.url})
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  handleUploadCover(file) {
    // console.log(file);
      API.uploadCover(file, this.state._id).then((response) => {
        this.setState({cover: response.url})
        // console.log(response.url);
      }).catch((err) => {
        console.log(err);
      })
  }

  handleAddEducation(event) {
    event.preventDefault();

    let education = {
      university: this.state.addUniversity,
      major: this.state.addMajor,
      degree: this.state.addDegree,
      gpa: this.state.addGPA,
      gradDate: this.state.gradMonth + ' ' + this.state.gradYear
    }

    // console.log(education);
    API.updateEducation(education, this.state._id).then((response) => {
      this.setState({
        education: response.education,
        addEducation: false
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  handleAddProject(event){
    event.preventDefault();
    // console.log(this.state);
    let project = {
      title: this.state.addTitle,
      description: this.state.addDescription,
      role: this.state.addRole,
      link: this.state.addLink
    }

    API.updateProject(project, this.state._id).then((response) => {
      // console.log(response);
      this.setState({
        projects: response.projects,
        addProject: false
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  handleAddWork(event){
    event.preventDefault();
    console.log(this.state);
    let work = {
      company: this.state.addCompany,
      role: this.state.addJob,
      description: this.state.addJobDesc,
      years: this.state.addFromYear + ' - ' + this.state.addToYear
    }

    // console.log(work);

    API.updateWork(work, this.state._id).then((response) => {
      this.setState({
        experience: response.experience,
        addWork: false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  renderAddEducation() {
    return (
      <form className="form-horizontal" onSubmit={this.handleAddEducation}>
        <br />
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">University: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Your university"
              onChange={(event) => this.setState({addUniversity: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Degree: </label>
          <div className="col-sm-4">
            <select value={this.state.addDegree} className="form-control" onChange={(event) => this.setState({addDegree: event.target.value})}>
              <option value="">Choose your major</option>
              <option value="Bachelors">Bachelor's</option>
              <option value="Masters">Master's</option>
              <option value="Associate">Associate degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Major: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Your major"
              onChange={(event) => this.setState({addMajor: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">GPA: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="/4.00"
              onChange={(event) => this.setState({addGPA: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Graduation date: </label>
          <div className="col-sm-2 col-xs-6">
            <select value={this.state.gradMonth} className="form-control" onChange={(event) => this.setState({gradMonth: event.target.value})}>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          </div>
          <div className="col-sm-2 col-xs-6">
             <select value={this.state.gradYear} className="form-control" onChange={(event) => this.setState({gradYear: event.target.value})}>
               <option value="2022">2022</option>
               <option value="2021">2021</option>
               <option value="2020">2020</option>
               <option value="2019">2019</option>
               <option value="2018">2018</option>
               <option value="2017">2017</option>
               <option value="2016">2016</option>
               <option value="2015">2015</option>
               <option value="2014">2014</option>
               <option value="2013">2013</option>
               <option value="2012">2012</option>
               <option value="2011">2011</option>
               <option value="2010">2010</option>
               <option value="2009">2009</option>
               <option value="2008">2008</option>
               <option value="2007">2007</option>
               <option value="2006">2006</option>
               <option value="2005">2005</option>
               <option value="2004">2004</option>
               <option value="2003">2003</option>
               <option value="2002">2002</option>
               <option value="2001">2001</option>
               <option value="2000">2000</option>
             </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-2">
            <a onClick={(event) => this.setState({addEducation: false})}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="submit" className="btn btn-xs btn-primary">Save</Button>
          </div>
        </div>
      </form>
    )
  }


  renderAddProject() {
    return (
      <form className="form-horizontal" onSubmit={this.handleAddProject}>
        <br />
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Project title: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Title"
              onChange={(event) => this.setState({addTitle: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Description: </label>
          <div className="col-sm-4">
            <textarea
              className="form-control" cols="50" rows="3"
              placeholder="Some words on the project"
              onChange={(event) => this.setState({addDescription: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Your contribution: </label>
          <div className="col-sm-4">
            <textarea
              className="form-control" cols="50" rows="3"
              placeholder="What did you do?"
              onChange={(event) => this.setState({addRole: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Project link: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Add a link"
              onChange={(event) => this.setState({addLink: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-2">
            <a onClick={(event) => this.setState({addProject: false})}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="submit" className="btn btn-xs btn-primary">Save</Button>
          </div>
        </div>
      </form>

    )
  }

  renderAddWork() {
    return (
      <form className="form-horizontal" onSubmit={this.handleAddWork}>
        <br />
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Company: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Company"
              onChange={(event) => this.setState({addCompany: event.target.value})}
             />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Role: </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Role"
              onChange={(event) => this.setState({addJob: event.target.value})}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label hidden-xs">Description: </label>
          <div className="col-sm-4">
            <textarea
              className="form-control" cols="50" rows="3"
              placeholder="What did you do?"
              onChange={(event) => this.setState({addJobDesc: event.target.value})}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 col-xs-3 control-label">From: </label>
          <div className="col-sm-2 col-xs-9">
             <select value={this.state.addFromYear} className="form-control" onChange={(event) => this.setState({addFromYear: event.target.value})}>
               <option value="2017">2017</option>
               <option value="2016">2016</option>
               <option value="2015">2015</option>
               <option value="2014">2014</option>
               <option value="2013">2013</option>
               <option value="2012">2012</option>
               <option value="2011">2011</option>
               <option value="2010">2010</option>
               <option value="2009">2009</option>
               <option value="2008">2008</option>
               <option value="2007">2007</option>
               <option value="2006">2006</option>
               <option value="2005">2005</option>
               <option value="2004">2004</option>
               <option value="2003">2003</option>
               <option value="2002">2002</option>
               <option value="2001">2001</option>
               <option value="2000">2000</option>
             </select>
          </div>

          <label className="col-sm-2 col-xs-3 control-label">To: </label>
          <div className="col-sm-2 col-xs-9">
             <select value={this.state.addToYear} className="form-control" onChange={(event) => this.setState({addToYear: event.target.value})}>
               <option value="Present">Present</option>
               <option value="2017">2017</option>
               <option value="2016">2016</option>
               <option value="2015">2015</option>
               <option value="2014">2014</option>
               <option value="2013">2013</option>
               <option value="2012">2012</option>
               <option value="2011">2011</option>
               <option value="2010">2010</option>
               <option value="2009">2009</option>
               <option value="2008">2008</option>
               <option value="2007">2007</option>
               <option value="2006">2006</option>
               <option value="2005">2005</option>
               <option value="2004">2004</option>
               <option value="2003">2003</option>
               <option value="2002">2002</option>
               <option value="2001">2001</option>
               <option value="2000">2000</option>
             </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-2">
            <a onClick={(event) => this.setState({addWork: false})}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="submit" className="btn btn-xs btn-primary">Save</Button>
          </div>
        </div>
      </form>

    )
  }

  renderViewProfile() {
    return (
      <div>
      <div className="container navbar">
        <Navbar
          onSearch={this.handleIt}
          status={this.state.data.isLoggedIn}
          data={this.props.location.state.data}
          chooseTab={this.handleTabPage} />
      </div>

      <div className="cover-image" style={{backgroundImage: `url(${this.state.profile.cover})`}}>

      </div>


      <div className="profile-view container">

        <div className="container panel panel-body profile-content">

            <div className="text-center avatar-image">
              <img
                className="avatar"
                src={this.state.profile.avatar}
                alt={this.state.profile.firstname}
                style={{width: 260}}
              />
            </div>
            <div className="text-center profile-name">
                  <h2 className="col-xs-12 name">{this.state.profile.firstname} {this.state.profile.lastname}</h2>
                  <span className="lfg">
                    {this.state.profile.linkedin ? <a href={this.state.profile.linkedin} target='_blank'><i className="fa fa-linkedin" />&nbsp;&nbsp;</a> : null}
                    {this.state.profile.fb ? <a href={this.state.profile.fb} target='_blank'><i className="fa fa-facebook-f" />&nbsp;&nbsp;</a> : null}
                    {this.state.profile.github ? <a href={this.state.profile.github} target="_blank"><i className="fa fa-github" />&nbsp;&nbsp;</a> : null}</span>
            </div>

            <br />
            <div className="text-center skills">
                {this.state.profile.experience.length ? <p>Worked at {this.state.profile.experience[0].company}</p> : null}
                {this.state.profile.skills ? <p>Experience working with {this.state.profile.skills}</p> : null}
            </div>
            <br />

            <br /><br />
            {this.state.sendMessage ?
              <div className="col-md-6 col-md-offset-3 message-panel">
                  <div className="col-xs-12">
                    <textarea
                      className="form-control input-lg"
                      placeholder="Message"
                      rows="6"
                      autoFocus
                      onChange={(event) => this.setState({message: event.target.value})}
                     />
                   </div>
                   <div>&nbsp;</div>
                   <div className="col-xs-12">
                     <a onClick={() => this.setState({sendMessage: false})}>Cancel</a>&nbsp;&nbsp;
                     <button className="btn btn-md send" onClick={this.handleSendMessage}>Send</button>
                   </div>
              </div> :
              <div className="text-center send-message">
                <button className="btn btn-lg" onClick={() => this.setState({sendMessage: true})}>
                  <i className="fa fa-paper-plane" /> Send a message
                </button>
              </div>}

          </div>

          <hr />
          <div className="panel panel-body profile-body">

          {this.state.profile.experience.length ?
          <div id="experience">
            <h4 className="make-center profile-section-headers">EXPERIENCE</h4><br />
            <div className="">
              <span>{this.state.profile.experience.map((value, index) => (
                <div key={index} className="col-xs-12 panel panel-body list">
                  <div className="col-md-2 text-center hidden-xs proj-img">
                    <i className="fa fa-graduation-cap fa-4x" />
                  </div>
                  <div className="col-md-6 col-xs-12 proj-desc">
                    <p>{value.company}</p>
                    <h4>{value.role}</h4>
                  </div>
                  <br />
                </div>
              ))}</span>
            </div>
          </div> : null }


            {this.state.profile.education.length ?
            <div id="education">
              <h4 className="make-center profile-section-headers">EDUCATION</h4><br />
              <div className="">
                  <span>{this.state.profile.education.map((value, index) => (
                    <div key={index} className="col-xs-12 panel panel-body list">
                      <div className="col-md-2 text-center hidden-xs grad-cap">
                        <i className="fa fa-graduation-cap fa-4x" />
                      </div>
                      <div className="col-md-6 col-xs-12 grad-univ">
                        <p>{value.university.toUpperCase()} · {value.gradDate.toUpperCase()}</p>
                        <h4>{value.degree}, {value.major}</h4>
                      </div>
                      <div>&nbsp;</div>
                    </div>
                  ))}</span>
              </div>
            </div> : null }<br />

            {this.state.profile.projects.length ?
            <div id="projects">
              <h4 className="make-center profile-section-headers">PROJECTS</h4><br />
              <div className="">
                <span>{this.state.profile.projects.map((value, index) => (
                  <div key={index} className="col-xs-12 panel panel-body list">
                    <div className="col-md-2 text-center hidden-xs proj-img">
                      <i className="fa fa-graduation-cap fa-4x" />
                    </div>
                    <div className="col-md-6 col-xs-12 proj-desc">
                      <h4>{value.title} &nbsp; <a href={value.link} target="_blank"><i className="fa fa fa-share-square-o"/></a></h4>
                      <p>{value.description}</p>
                      <p>{value.role}</p>
                    </div>
                  </div>
                ))}</span>
              </div>
            </div> : null }<br />

          </div>

        </div>
      </div>
    )
  }



  renderProfile() {
    return (
      <div>
      <div className="container navbar">
        <Navbar
          onSearch={this.handleIt}
          status={this.state.isLoggedIn}
          data={this.props.location.state}
          type={this.props.location.state.isEmployer}
          chooseTab={this.handleTabPage} />
      </div>

      <div className="cover-image" style={{backgroundImage: `url(${this.state.cover})`}}>
        {this.state.cover ? null : <span className="hidden-sm pull-right add-cover-image">
          <label className="select-btn">
            <i className="fa fa-plus-square-o" /> Add cover photo
            <input type="file" name="cover-photo" onChange={(event) => this.handleUploadCover(event.target.files[0])} />
          </label>
        </span>}
      </div>

      <div className="main">
      <div className="profile-view container">

        <div className="container panel panel-body profile-content">

          <div className="text-center avatar-image">
            <img
              className="avatar"
              src={this.state.avatar}
              alt={this.state.firstname}
              style={{width: 260}}
            />
          </div>

          <div className="text-center profile-name">
              <h2 className="col-xs-12 name">{this.state.firstname} {this.state.lastname}</h2>
              <span className="lfg">
                {this.state.linkedin ? <a href={this.state.linkedin} target='_blank'><i className="fa fa-linkedin" />&nbsp;&nbsp;</a> : null}
                {this.state.fb ? <a href={this.state.fb} target='_blank'><i className="fa fa-facebook-f" />&nbsp;&nbsp;</a> : null}
                {this.state.github ? <a href={this.state.github} target='_blank'><i className="fa fa-github" />&nbsp;&nbsp;</a> : null}
              </span>
          </div>


              <div className="text-center skills">
                <br />
                {/* {this.state.experience.length ? <p>Worked at {this.state.experience.company}</p> : null} */}
                {this.state.about ? <p>{this.state.about}</p> : null}
                {this.state.skills ?
                  <p>Experience with {this.state.skills}</p> :
                  <a onClick={(event) => this.setState({addSkill: true})}>+ Add a skill</a>}<br />
                {this.state.addSkill ? <textarea className="col-xs-6 form-control" cols="50" rows="3" placeholder="Enter skills separated by comma" onChange={(event) => this.setState({skillset: event.target.value})}/> : null}
                {this.state.addSkill ? <div><a onClick={(event) => this.setState({addSkill: false})}>Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn btn-xs btn-primary" onClick={this.handleUpdateSkills}>Save</Button></div> : null}<br />
              </div>

              <div className="text-center tags">
                {this.state.designation !== 'N/A' ? <p className="tags col-xs-4"><i className="fa fa-suitcase" /> {this.state.designation}</p> : null}
                {this.state.location ? <p className="tags col-xs-4"><i className="fa fa-map-marker" /> {this.state.location}</p> : null}
                {this.state.education.length ? <p className="tags col-xs-4"><i className="fa fa-graduation-cap" /> {this.state.education[0].university}</p> : null}
              </div>
              <br />
              <span className="pull-right make-center edit">
                <a onClick={this.handleEditProfile}>Edit profile <i className="fa fa-pencil-square-o"/></a>
              </span>

            </div>
          {/* </div> */}

          <hr />

          <div className=" panel panel-body profile-body">
            <div id="education">
              <h4 className="profile-section-headers">EDUCATION</h4><br />
              <a onClick={(event) => this.setState({addEducation: true})}><i className="fa fa-plus-square-o"/> Add an education</a>
                {this.state.education.length ?
                  // <div className="list">
                  <span>
                    {this.state.education.map((value, index) => (
                    <div key={index} className="panel panel-body list">
                      <div className="col-xs-2 text-center grad-cap">
                        <i className="fa fa-graduation-cap fa-2x" />
                      </div>
                      <div className="col-xs-10 grad-univ">
                        <p className="view-gradschool">{value.university.toUpperCase()} · {value.gradDate.toUpperCase()}</p>
                        <h4>{value.degree}, {value.major}</h4>
                        <p>GPA: {value.gpa}</p>
                        <p>{value.achievements}</p>
                      </div>
                    </div>
                  ))}</span> : null}<br />
                  {this.state.addEducation ? <div>{this.renderAddEducation()}</div> : null}

            </div><br />

            <div id="projects">
              <h4 className="profile-section-headers">PROJECTS</h4><br />
              <a onClick={(event) => this.setState({addProject: true})}><i className="fa fa-plus-square-o"/> Add a project</a>
              {/* <div className="list"> */}
                {this.state.projects.length ?
                <span>{this.state.projects.map((value, index) => (
                  <div key={index} className="panel panel-body list">
                    <div className="col-md-2 text-center hidden-xs proj-img">
                      <i className="fa fa-graduation-cap fa-4x" />
                    </div>
                    <div className="col-md-6 col-xs-12 proj-desc">
                      <h4>{value.title} &nbsp; {value.link ? <a href={value.link} target="_blank"><i className="fa fa fa-share-square-o"/></a> : null}</h4>
                      <p>{value.description}</p>
                      <p>{value.role}</p>
                    </div>
                  </div>
                ))}</span> : null}<br />
                {this.state.addProject ? <div>{this.renderAddProject()}</div> : null}
              {/* </div> */}
            </div><br />

            <div id="experience">
              <h4 className="profile-section-headers">EXPERIENCE</h4><br />
              {/* <div className="list"> */}
              <a onClick={(event) => this.setState({addWork: true})}><i className="fa fa-plus-square-o" /> Add work experience</a>
                {this.state.experience.length ?
                <span>{this.state.experience.map((value, index) => (
                  <div key={index} className="panel panel-body list">
                    <div className="col-md-2 text-center hidden-xs proj-img">
                      <i className="fa fa-graduation-cap fa-4x" />
                    </div>
                    <div className="col-md-6 col-xs-12 proj-desc">
                      <p>{value.company}</p>
                      <h4>{value.role} <span id="year">({value.years})</span></h4>
                      <p>{value.description}</p>
                    </div>
                  </div>
                ))}</span> : null}<br />
                {this.state.addWork ? <div>{this.renderAddWork()}</div> : null}
              {/* </div> */}
            </div>
          </div>

        </div>
      </div>

      </div>


    )
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (this.state.profile) {
      return (
        this.renderViewProfile()
      )
    }

    if (!this.state.isLoggedIn) {
      return (
        <div>
          <p>Please <button onClick={this.setState({redirect: true})}>login</button> to continue</p>
        </div>
      )
    } else {
      // if(!this.state.isEmployer) {
      //   return this.renderJobSeekerProfile();
      // } else {
      //   return this.renderEmployerProfile();
      // }
      return this.renderProfile();
    }
  }
}



export default ProfilePage;
