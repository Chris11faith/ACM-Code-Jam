import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';

const Loading = () => {
  return(
    <Grid style={{width: "100vw", height: "100vh"}} verticalAlign="middle" centered>
      <Grid.Row>
        <Grid.Column>
          <Loader size="massive" active>Loading</Loader>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Loading;
