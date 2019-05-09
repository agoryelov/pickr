import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase'

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {

  firebase = new Firebase();

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      error: null,
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    
    this.firebase.signUp(email, password)
    .then((authUser) => {
      this.firebase.user(authUser.user.uid).set({
        username,
        email,
      });
    })
    .then(() => {
      this.setState({
        username: '',
        email: '',
        password: '',
        error: null,
      });
      this.props.history.push(ROUTES.HOME);
    });
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const error = this.state.error;

    const isInvalid = username === '' || email === '' || password === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Username" />
        <input name="email" value={email} onChange={this.onChange} type="email" placeholder="Email" />
        <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
        <button disabled={isInvalid} type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;