import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { useIdentityContext } from '../contexts/IdentityContext';
import {Grid, Message, Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  const { auth, googleProvider } = useAuthContext();
  const { user, setUser } = useIdentityContext();

  const loginWithGoogle = () => {
    setLoginError(null);
    auth
      .signInWithPopup(googleProvider)
  }

  const loginWithEmailPassword = (e) => {
    e.preventDefault();

    setLoginError(null);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
        if ( e.code === "auth/user-not-found" ||
            e.code === "auth/wrong-password") {
          setLoginError('Wrong Email/Password entered')
        } else {
          setLoginError(e.message);
        }
      })
  }

  const [loginError, setLoginError] = React.useState(null);
  let loginMessage;
  if (loginError) {
    loginMessage = <Message negative>{loginError}</Message>
  }

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

  const emailRequired = !!email;
  const passwordRequired = !!password;

  const formValid = emailRequired && passwordRequired

  return (
    <Form style={{marginTop: "20vh"}} className="center-container" onSubmit={loginWithEmailPassword}>
      <Grid style={{width: "50vw", textAlign: "left" }}>
        <Grid.Row>
          <Grid.Column>
            <h1>Wakanda Forever</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={emailTouched && !emailRequired && "Email is required"} onChange={onEmailChanged} value={email} fluid type="email" label='Email Address' placeholder='Email' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input error={passwordTouched && !passwordRequired && "Password is required"} onChange={onPasswordChanged} value={password} fluid type="password" label='Password' placeholder='Password' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {loginMessage}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button disabled={!formValid} type="submit" fluid primary>Login</Button>
          </Grid.Column>
          <Grid.Column>
            <Button type="button" fluid onClick={loginWithGoogle}>Log in with Google</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link to='/signUp'>
              <Button type="button" fluid primary>Sign Up</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default LoginScreen;
