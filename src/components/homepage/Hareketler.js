import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import bgImage from "../../assets/hareketler.webp";

import {gsap} from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

function Hareketler() {
  const  [hovered, setHovered] = useState(false);
  const boxRef = useRef();
  const cardRef = useRef();

  const onMouseEnter= (e) => {
    setHovered(true)
  }
  const onMouseLeave= (e) => {
    setHovered(false)
  }
  useEffect(() => {
    gsap.from(boxRef.current,{
      height:"0vh",
    })
    gsap.from(cardRef.current,{
      display:"none",
    })

    gsap.to(boxRef.current,{
      height:"60vh",
    })
    gsap.to(cardRef.current,{
      display:"flex"
    })

    gsap.to(boxRef.current,{
      height:"60vh",
      duration:.5,
      ease:"easeIn",
      scrollTrigger:{
        trigger: boxRef.current,
        scrub:5,
        start:"top 100%",
        end:"+=750",
    }})
    gsap.to(cardRef.current,{
      display:"flex",
      duration:1,
      ease:"easeIn",
      scrollTrigger:{
        trigger: cardRef.current,
        scrub:5,
        start:"top 100%",
        end:"+=750",
    }})
  }, []);

  return (
    <Box
    ref={boxRef}
      sx={{
        mt:{xs:20,sm:20},
        width: "100vw",
        display: "flex",
        marginTop:"5vh",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.05)",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        boxShadow: "0px 5px 25px rgba(0,0,0,0.4)",
        ...((hovered)&&{
          backgroundSize: "105vw"
        })
      }}
    >
      <Grid
        ref={cardRef}
        container
        rowSpacing={{xs:7.5,sm:12.5}}
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        columnSpacing={{ xs: -5, sm: -5, md: 5 , lg:15 , xl:25}}
        sx={{
          background: "rgba( 255, 255, 255, 0.1 )",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.5)",
          backdropFilter: "blur(5.5px)",
          display:"none"
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="black">
            Son 1 Yılda
          </Typography>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={5.9}>
            <Typography variant="h3"
            sx={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "-webkit-linear-gradient(rgba(0, 255, 0, 1), rgba(255, 255, 255, 1))",
            }}
            >
              +75
            </Typography>
            <Typography variant="h6" color="white">
              Satılan Daireler
            </Typography>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid xs={6}>
            <Typography
              variant="h3"
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "-webkit-linear-gradient(rgba(255, 0, 0, 1), rgba(255, 255, 255, 1))",
              }}
            >
              +100
            </Typography>
            <Typography variant="h6" color="white">
              Kiralanan Daireler
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Hareketler;
