import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import axios from 'axios';


const SideBar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let history = useHistory()
  const removeToken = () =>{
      localStorage.clear()
      history.push('/login')
  }
  let user = localStorage.getItem('token')
  let fname = localStorage.getItem('fname')
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='d-flex justify-content-center align-content-center flex-wrap'>
        {
          user ? <Avatar sx={{ bgcolor: deepOrange[500] }} className='profile'>USER</Avatar>:
          <Avatar sx={{ bgcolor: deepPurple[500] }} className='profile'>ADMIN</Avatar>
        }
      </div>
          <h4 className='d-flex justify-content-center align-content-center flex-wrap mb-3'>{fname}</h4>
      
      <List className='ms-3'>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      <Divider />
      <Divider />
        <ListItemButton onClick={removeToken}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
  return (
    <div>
    {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)} className='profile-icon'>  {
        user ? <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>:
        <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
      }
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
    </div>
  )
}

export default SideBar
