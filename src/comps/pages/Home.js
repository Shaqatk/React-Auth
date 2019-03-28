import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };

  }

    checkAuthentication = async() => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  state={
      Username:''
  }

  async componentDidMount() {
    this.checkAuthentication();
    const idToken= JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
        Username: idToken.idToken.claims.name
    });
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

   login = async() => {
    this.props.auth.login('/');
  }

   logout = async() => {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    console.log(this.state);
    const Name= this.state.Username;
    const mainContent = this.state.authenticated ? (
     <div>
         <p className="lead">Welcome {Name} to the movie searcher <Link to="/member"> CLICK HERE </Link> to enter </p>
         <button className="btn btn-light btn-lg" onClick={this.logout} >Logout</button>
     </div>) :(
         <div>
        <p className="lead">To enter movie search portal please create an account</p>
         <button className="btn btn-light btn-lg" onClick={this.login} >Login</button>
         </div>
    );

    return (
      <div className="jumbotron text-center" >
        <h1 className="display-4 text-dark">Movie Searcher Portal</h1>
        {mainContent}
      </div>
    );
  }
});