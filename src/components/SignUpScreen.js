import React from 'react';
import LoadingComponent from './Loading';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { Grid, Message, Button, Form } from 'semantic-ui-react';

const SignUpScreen = () => {
  const { auth } = useAuthContext();
  const history = useHistory();

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

  const [loading, setLoading] = React.useState(false);
  const [ alertMsg, setAlertMsg] = React.useState(null);

  const signUpUser = (e) => {
    e.preventDefault();
    setLoading(true);

    auth.createUserWithEmailAndPassword(email, password)
      .then(_ => {
        history.push('/login');
      })
      .catch(e => {
        if (e.code === "auth/email-already-in-use") {
          setLoading(false);
          setAlertMsg('That email already exists')
        }
      });
  }

  let alertView;
  if (alertMsg) {
    alertView = <Message negative>{alertMsg}</Message>
  }

  const confirmPasswordIsPassword = confirmPassword === password;
  const emailRequired = !!email;
  const passwordGreaterThan8 = password.length > 8;

  const formValid =
    confirmPasswordIsPassword &&
    emailRequired &&
    passwordGreaterThan8;
  
  return (
    loading ? <LoadingComponent/>
    : <Form style={{display: "flex", width: "100%", alignSelf: "center", justifyContent: "center"}} onSubmit={signUpUser}>
      <Grid style={{width: "50vw", minWidth: "300px"}}>
        <Grid.Row>
          <Grid.Column>
            <h1>Wakanda Forever</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={emailTouched && !emailRequired && "Email is required"} required onChange={onEmailChanged} value={email} fluid type="email" label="Email Address" placeholder="Email" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={passwordTouched && !passwordGreaterThan8 && "Password must be longer than 8 characters!"} required onChange={onPasswordChanged} value={password} fluid type="password" label="Password" placeholder="Password" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={confirmPasswordTouched && !confirmPasswordIsPassword && "Passwords do not match"} required onChange={onConfirmPasswordChanged} value={confirmPassword} fluid type="password" label="Confirm Password" placeholder="Confirm Password" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button size="big" disabled={!formValid} type="submit" fluid primary>Sign Up</Button>
            {alertView}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link to="/login">
              <Button fluid type="button">Back to Login</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

export default SignUpScreen;
