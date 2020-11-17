import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { Grid, Button, Form } from 'semantic-ui-react';

const SignUpScreen = () => {
  const { auth } = useAuthContext();

  const [emailTouched, setEmailTouched] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const onEmailChanged = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  }


  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  }

  const [confirmPasswordTouched, setConfirmPasswordTouched] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const onConfirmPasswordChanged = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
  }

  const signUpUser = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password);
  }

  const confirmPasswordIsPassword = confirmPassword === password;
  const emailRequired = !!email;
  const passwordGreaterThan8 = password.length > 8;

  const formValid =
    confirmPasswordIsPassword &&
    emailRequired &&
    passwordGreaterThan8;
  
  return (
    <Form style={{marginTop: "20vh"}} className="center-container" onSubmit={signUpUser}>
      <Grid style={{width: "50vw", textAlign: "left" }}>
        <Grid.Row>
          <Grid.Column>
            <h1>Wakanda Forever</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={emailTouched && !emailRequired && "Email is required"} required onChange={onEmailChanged} value={email} fluid type="email" label='Email Address' placeholder='Email' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={passwordTouched && !passwordGreaterThan8 && "Password be longer than 8 characters!"} required onChange={onPasswordChanged} value={password} fluid type="password" label='Password' placeholder='Password' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={confirmPasswordTouched && !confirmPasswordIsPassword && "Passwords do not match"} required onChange={onConfirmPasswordChanged} value={confirmPassword} fluid type="password" label='Confirm Password' placeholder='Confirm Password' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button disabled={!formValid} type="submit" fluid primary>Sign Up</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link to='/login'>
              <Button fluid type="button">Back to Login</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

export default SignUpScreen;
