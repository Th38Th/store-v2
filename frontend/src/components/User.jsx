import React from "react";
import Person from "@mui/icons-material/Person";
import PersonOutline from "@mui/icons-material/PersonOutline";
import "../styles/User.css";
import { Box, Card } from "@mui/material";

function User({user, variant}) {
    let isGuest = !user.username;
    let classes = `user-data ${variant}`
    
    return (<Box className={classes}>
      {!isGuest && <><Person/>{user.username}</>}
      {isGuest && <><PersonOutline></PersonOutline>Anonymous</>}
    </Box>)
}

export default User