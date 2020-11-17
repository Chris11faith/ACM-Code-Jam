import styled from 'styled-components';
import {Button, Form} from 'semantic-ui-react';

export const StyledContainer = styled(Form)`
  margin: 1.5em;
  padding: 2em;
  border: solid #dedede 3px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledSaveButton = styled(Button)`
  align-self: flex-end;
  width: 200px;
  height: 50px;
  margin: 1em 0 1em 0 !important;
`;