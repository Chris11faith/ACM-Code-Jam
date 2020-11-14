import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar,Button, Message } from 'semantic-ui-react'
import './SideNav.css';

const SideNav = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Menu.Item as='a'>
        <Icon name='add' />
        Add
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
        <br/>
        <Icon name='camera' />
        Channels 
      </Menu.Item>
      <Menu.Item as='a'>
      <Button size='massive'>Logout</Button>
        <p className = "Name">Kevin Ziebarth</p>
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  
)

export default SideNav;