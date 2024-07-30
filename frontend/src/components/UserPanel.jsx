import { useState } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Form from "../components/Form"
import Button from "@mui/material/Button"
import api from "../api"
import { Popover } from "@mui/material"
import User from "../components/User"
import "../styles/UserPanel.css"
import { useSelector, useDispatch } from "react-redux"
import { setIsLoggedIn, setUserName } from "../stores/AuthSlice"

function UserTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function UserPanel() {
  const dispatch = useDispatch();
  const username = useSelector((state)=>state.auth.username);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    api.logout();
    dispatch(setIsLoggedIn(false));
    dispatch(setUserName(false));
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
  <div className="user-panel">
    <Button aria-describedby={id} 
      className="user-panel-head"
      onClick={handleClick}
      variant="text">
      <User user={{username}}/>
      <i className="arrow down"></i>
    </Button>
    <Popover
    id={id}
    className="user-panel-popover"
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}>
      {isLoggedIn && 
          <Button className="nav-button"
          onClick={handleLogout}>LOGOUT</Button>}
        {!isLoggedIn &&
        <>
          <Tabs value={value} onChange={handleChange}>
              <Tab label="LOGIN" {...a11yProps(0)}/>
              <Tab label="REGISTER" {...a11yProps(1)}/>
          </Tabs>
          <UserTabPanel value={value} index={0}>
              <Form method="login"/>
          </UserTabPanel>
          <UserTabPanel value={value} index={1}>
              <Form method="register"/>
          </UserTabPanel>
      </>}
    </Popover>
  </div>
  );
}