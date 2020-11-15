import React from 'react';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { useIdentityContext } from '../contexts/IdentityContext';
import {Grid, Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  const { auth, provider } = useAuthContext();
  const { user, setUser } = useIdentityContext();

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(r => {
        console.log(`${setUser} -- from signInWithPopup`)
        setUser(r.user);
      });
  }

  return (
    <Form style={{marginTop: "20vh"}} className="center-container" onSubmit={e => e.preventDefault()}>
      <Grid style={{width: "30vw", textAlign: "left" }}>
        <Grid.Row>
          <Grid.Column>
            <h1>Wakanda Forever</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input fluid type="email" label='Email Address' placeholder='Email' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input fluid type="password" label='Password' placeholder='Password' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button fluid primary>Login</Button>
          </Grid.Column>
          <Grid.Column>
            <Button fluid onClick={loginWithGoogle}>Log in with Google</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default LoginScreen;