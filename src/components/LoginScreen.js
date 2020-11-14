import React from 'react';
import {Button, Form} from 'semantic-ui-react';

const LoginScreen = () => {
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <div>
        <Form.Input fluid label='Email Address' placeholder='Email' />
      </div>
      <div>
        <Form.Input fluid label='Password' placeholder='Password' />
      </div>
      <div>
        <Button primary>Login</Button>
      </div>
    </Form>
  );
};

export default LoginScreen;