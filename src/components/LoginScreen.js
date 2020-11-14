import React from 'react';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import {Grid, Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  const { auth, provider } = useAuthContext();
  const loginWithGoogle = () => {
    auth.signInWithPopup(provider).then(console.log);
  }
  
  return (
    <Form style={{marginTop: "20vh"}} className="center-container" onSubmit={e => e.preventDefault()}>
      <Grid style={{width: "30vw", textAlign: "left" }} columns={1}>
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
        <Grid.Row>
          <Grid.Column>
            <Button fluid primary>Login</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{marginTop: "2em"}}>
          <Grid.Column>
            <Button onClick={loginWithGoogle}>Log in with Google</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default LoginScreen;