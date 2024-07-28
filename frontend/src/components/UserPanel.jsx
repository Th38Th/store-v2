import React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Form from "../components/Form"
import { useAuth } from "./AuthProvider"

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
  
  /*UserTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };*/
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function UserPanel() {
    const { username, isLoggedIn, logout } = useAuth();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
    <div>
        {isLoggedIn && 
        <div>
            Logged in as {username}
            <button className="nav-button"
            onClick={logout}>LOGOUT</button>
        </div>}
        {!isLoggedIn &&
        <div>
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="LOGIN" {...a11yProps(0)}/>
                <Tab label="REGISTER" {...a11yProps(1)}/>
            </Tabs>
        </Box>
        <UserTabPanel value={value} index={0}>
            <Form method="login"/>
        </UserTabPanel>
        <UserTabPanel value={value} index={1}>
            <Form method="register"/>
        </UserTabPanel>
        </div>}
    </div>
    );
}