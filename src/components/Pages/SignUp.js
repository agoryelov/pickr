import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MaterialLink from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const SignUpPage = () => (
  <div>
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
        <Grid container justify='center'>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper style={{textAlign: 'center', padding: '2em', margin: '2em 2em 0 2em'}}>
              <form onSubmit={this.onSubmit}>
                <Grid container spacing={24} justify = "center">
                  <Grid item xs={8}>
                    <Grid container direction="column-reverse" justify="center" alignItems="center" spacing={8}>
                      <Grid item>
                        <Typography style={{color: 'grey'}} variant="h5">Sign Up</Typography>
                      </Grid>
                    </Grid>                  
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="username-input">
                        Username
                      </InputLabel>
                      <Input name="username" id="username-input" type="text" onChange={this.onChange} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="email-input">
                        Email
                      </InputLabel>
                      <Input name="email" id="email-input" type="email" onChange={this.onChange} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="password-input">
                        Password
                      </InputLabel>
                      <Input name="password" id="password-input" type="password" onChange={this.onChange} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{marginTop: '2em'}}>
                    <Button type="submit" color="primary" variant="contained" fullWidth>Create</Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

/*
<form onSubmit={this.onSubmit}>
<input name="username" value={username} onChange={this.onChange} type="text" placeholder="Username" />
<input name="email" value={email} onChange={this.onChange} type="email" placeholder="Email" />
<input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
<button disabled={isInvalid} type="submit">Sign Up</button>

{error && <p>{error.message}</p>}
</form>*/

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;