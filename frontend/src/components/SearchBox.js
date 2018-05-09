import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
      // type: 'jobs'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log('In search box', this.props);

  }

  comnponentWillMount() {
    // console.log('Search Page');
    // console.log(this.props);
  }

  componentDidMount() {
    // console.log('Search component mounted');
    // console.log(this.props);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('After submit start', this.state);
    let string = this.state.search;
    // console.log(`Inside Search component ${string}`);
    // console.log(this.state);
    if (!string) {
      return;
    }

    // this.props.onSearch({search: string, type: this.state.type});
    this.props.onSearch(string);

    // this.setState({search: '', type: 'jobs'}, () => console.log('After submit end', this.state));
  }

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleSubmit}> */}
          {/* <input
            id="searchbar"
            className="form-control input-lg"
            autoFocus type='search'
            placeholder="Ex: Software Engineer"
            onChange={(event) => this.setState({search: event.target.value})} />
          <button className="btn btn-default" onClick={this.handleSubmit}><i className="fa fa-search"/></button> */}
          <div className="input-group searchbox-component">
            <input
              id="searchbar"
              className="form-control input-lg"
              placeholder="Search"
              type="search"
              autoFocus
              onChange={(event) => this.setState({search: event.target.value})}
             />
            <span className="input-group-btn">
              <button className="btn btn-lg search-btn" onClick={this.handleSubmit}><i className="fa fa-search fa-lg" /></button>
            </span>
          </div>
          {/* <select value={this.state.type} onChange={(event) => this.setState({type: event.target.value})}>
            <option value="jobs">Jobs</option>
            <option value="companies">Companies</option>
          </select>
          <input type='submit' value='Search' /> */}
        {/* </form> */}
      </div>
    )
  }

}

export default SearchBox;
