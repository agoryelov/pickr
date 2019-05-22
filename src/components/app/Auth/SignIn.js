import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../../firebase'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/**
 * Renders the Sign In form component, accessible if the user is not logged in
 */
class SignInFormBase extends Component {
  // Call access to the Firebase database.
  firebase = new Firebase();

  //Grab props from parent
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    }
  }

  //Login logic for returning users, redirects to HOME on success
  onSubmit = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    this.firebase.signIn(email, password).then(() => {
      this.props.history.push(ROUTES.HOME);
    });
  }

  //Updates state to keep track of form's inputs realtime
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const email = this.state.email;
    const password = this.state.password;
    const error = this.state.error;

    const isInvalid = email === '' || password === '';

    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper style={{ textAlign: 'center', padding: '2em', margin: '2em 2em 0 2em' }}>
            <form onSubmit={this.onSubmit}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={8}>
                  <Grid container direction="column-reverse" justify="center" alignItems="center" spacing={8}>
                    <Grid item>
                      <Typography style={{ color: 'grey' }} variant="h5">Login</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email-input">
                      Email
                    </InputLabel>
                    <Input name="email" id="email-input" type="email" onChange={this.onChange} required />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password-input">
                      Password
                    </InputLabel>
                    <Input name="password" id="password-input" type="password" onChange={this.onChange} required />
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '2em' }}>
                  <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button component={Link} to={ROUTES.SIGN_UP} variant="contained" fullWidth>Create</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(SignInFormBase);