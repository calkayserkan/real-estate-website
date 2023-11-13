import { List, ListItem } from "@mui/material";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
// import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ButtonList() {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate();

  const Navigation = (path) => {
    navigate(path);
  };
  return (
    <List component="nav">
      <ListItem>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText  secondary={user.email} primary="Yönetici"/>
      </ListItem>
      <ListItemButton onClick={(e)=> Navigation("/admin")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={(e)=> Navigation("/admin/ilanlar")}>
        <ListItemIcon>
          <HolidayVillageIcon />
        </ListItemIcon>
        <ListItemText primary="İlanlar" />
      </ListItemButton>
      {/* <ListItemButton  href="/admin/profile">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Profil Ayarları" />
      </ListItemButton> */}
    </List>
  );
}

export default ButtonList;
