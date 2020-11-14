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
        <p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p><p>The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top and bottom edges.</p>
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