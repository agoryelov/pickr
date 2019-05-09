import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase'

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

class SignInFormBase extends Component {

  firebase = new Firebase();

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    
    this.firebase.signIn(email, password).then(() => {
      console.log('Hello');
      this.props.history.push(ROUTES.HOME);
    });
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const email = this.state.email;
    const password = this.state.password;
    const error = this.state.error;

    const isInvalid = email === '' || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input name="email" value={email} onChange={this.onChange} type="email" placeholder="Email" />
        <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
        <button disabled={isInvalid} type="submit">Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInForm = withRouter(SignInFormBase);

export default SignInPage;