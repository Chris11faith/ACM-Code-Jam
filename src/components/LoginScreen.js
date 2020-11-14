import React from 'react';
import {Grid, Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  return (
    <Form className="center-container" onSubmit={e => e.preventDefault()}>
      <Grid style={{width: "30vw", textAlign: "left" }} columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Form.Input fluid label='Email Address' placeholder='Email' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input fluid label='Password' placeholder='Password' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button block primary>Login</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default LoginScreen;