import React, { useState, useEffect, useRef } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../../App.css";

import {gsap} from "gsap";



const pages2 = [
  { id: 1, name: "HAKKIMIZDA", ref: "hakkimizda" },
  { id: 2, name: "İLANLAR", ref: "ilan" },
  { id: 3, name: "İLETİŞİM", ref: "iletisim" },
];

function Appbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const barRef = useRef();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
   
    gsap.from(barRef.current,{
      opacity:0,
    })
    gsap.to(barRef.current,{
      opacity:0,
    })
    gsap.to(barRef.current,{
      opacity:1,
      delay:2,
      duration:2,
    })
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={4}
      ref={barRef}
      sx={{
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(16px)",
        color: "grey",
        mt: 3,
        width: "80vw",
        height: "6vh",
        left: 0,
        marginLeft: "10vw",
        borderRadius: ".75rem",
        boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mustafa Büyükgedik
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              mt: { xs: -1.5,sm:-1 },
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
              Büyükgedik
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.values(pages2).map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Button
                    href={`#${page.ref}`}
                    sx={{ color: "grey", fontSize: ".8rem" }}
                  >
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {Object.values(pages2).map((value) => (
              <Button
                key={value.id}
                href={`#${value.ref}`}
                sx={{ color: "grey", display: "block" }}
              >
                {value.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
