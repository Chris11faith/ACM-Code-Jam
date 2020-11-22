import React from 'react';
import LoadingComponent from './Loading';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import {Grid, Message, Header, Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  const history = useHistory();
  const { auth, googleProvider } = useAuthContext();

  const [ loading, setLoading ] = React.useState(false);

  const loginWithGoogle = () => {
    setLoginError(null);
    setLoading(true);

    auth
      .signInWithPopup(googleProvider)
      .then(_ => {
        history.push('/');
      })
      .catch(_ => {
        setLoading(false)
      })
  }

  const loginWithEmailPassword = (e) => {
    e.preventDefault();

    setLoading(true);
    setLoginError(null);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        history.push('/');
      })
      .catch(e => {
        if ( e.code === "auth/user-not-found" ||
            e.code === "auth/wrong-password") {
          setLoginError('Wrong Email/Password entered')
        } else {
          setLoginError(e.message);
        }
        setLoading(false)
      });
  }

  const [loginError, setLoginError] = React.useState(null);
  let loginMessage;
  if (loginError) {
    loginMessage =
      <Grid.Row>
        <Grid.Column>
          <Message negative>{loginError}</Message>
        </Grid.Column>
      </Grid.Row>
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

  const formValid = emailRequired && passwordRequired;

  return (
    loading ? <LoadingComponent/> :
    <Grid centered verticalAlign="middle" style={{height: "100vh"}}>
      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={loginWithEmailPassword}>
            <Grid container>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">Wakanda Forever</Header>
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
              {loginMessage}
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Button size='big' disabled={!formValid} type="submit" fluid primary>Login</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button size='big' type="button" fluid onClick={loginWithGoogle}>Log in with Google</Button>
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoginScreen;
