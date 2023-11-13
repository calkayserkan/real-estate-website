import React ,{useEffect, useState} from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Route, Routes } from "react-router-dom";
import Dash from "./Dash";
import { Helmet } from "react-helmet";
import ButtonList from "./ButtonList";
import IlanList from "./ilan/IlanList";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIlan from "./ilan/AddIlan";
// import Profile from "./Profile";
import { logout } from "../../firebase/firebase";
import { logout as logoutHandle } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  //site yolunu alarak appbar isimlendirmesini sağlıyor
  const path = window.location.pathname
  const [pageName, setPageName] = useState("")

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/admin-l", {
      replace: true,
    });
  };

  useEffect(() => {
    if(path === "/admin"){
      setPageName("Dashboard")
    }
    if(path === "/admin/test"){
      setPageName("Test")
    }
    if(path === "/admin/ilanlar"){
      setPageName("İlanlar")
    }
    if(path === "/admin/ilanEkle"){
      setPageName("Yeni İlan Ekle")
    }
    if(path === "/admin/ilanDuzenle"){
      setPageName("İlanı Düzenle")
    }
    if(path === "/admin/profile"){
      setPageName("Profil Ayarları")
    }
  },[path,pageName])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | Dashboard</title>
      </Helmet>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="absolute"
            open={open}
            sx={{ backgroundColor: "white" }}
          >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
                backgroundColor: "rgba(0,0,0,.9)",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="white"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {pageName}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                  <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <ButtonList/>
          </Drawer>

          {/*içerik alanı*/}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: { xs: "93.5vh"},
              mt: { xs: "56px", sm: "64px" },
              overflow: "auto",
              display:"flex",
              flexDirection:"row",
              justifyContent: "center",
            }}
          >
            <Routes>
              <Route path="/" element={<Dash></Dash>}></Route>
              <Route path="/ilanlar" element={<IlanList></IlanList>}></Route>
              <Route path="/ilanEkle" element={<AddIlan></AddIlan>}></Route>
              {/* <Route path="/profile" element={<Profile></Profile>}></Route> */}
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Dashboard;
