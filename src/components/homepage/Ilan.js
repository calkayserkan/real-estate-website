import React, { useEffect, useRef, useState} from "react";
import "../../App.css";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import bgImage from "../../assets/map_with_point_1_.webp";
import { Box, Button } from "@mui/material";
import { gsap, Power3 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Ilan() {
  const textRef = useRef();
  const textRef2 = useRef();
  const textRef3 = useRef();
  const buttonRef = useRef();
  const bgRef = useRef();
  const shadowRef = useRef();
  const [ww, setWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
}

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    if(ww>=600){
      tl.from(
        bgRef.current,
        {
          width:0,
          ease: Power3.easeOut,
          duration: 1.2,
          stagger: {
            amount: 3,
          },
          scrollTrigger: {
            trigger: bgRef.current,
            scrub: 5,
            start: "top 100%",
            end: "+=750",
          },
        },
        "+=5"
      ).from([textRef.current, textRef2.current, textRef3.current], {
        y: 150,
        ease: Power3.easeOut,
        delay: 3,
        duration: 1.2,
        stagger: {
          // satırların bekleme süresi için
          amount: 0.5,
        },
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=500",
        },
      }).from(shadowRef.current, {
        boxShadow:"0px 0px 0px white",
        ease: Power3.easeOut,
        delay: 0,
        duration: 2,
        scrollTrigger: {
          trigger: shadowRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=750",
        },
      });
      tl2.from(buttonRef.current, {
        opacity: 0,
        ease: Power3.easeIn,
        delay: 1.6,
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=350",
        },
      });
    }


    if(ww<600){
      tl.from(
        bgRef.current,
        {
          height:0,
          ease: Power3.easeOut,
          duration: 1.2,
          stagger: {
            amount: 3,
          },
          scrollTrigger: {
            trigger: bgRef.current,
            scrub: 5,
            start: "top 100%",
            end: "+=750",
          },
        },
        "+=5"
      ).from([textRef.current, textRef2.current, textRef3.current], {
        y: 150,
        ease: Power3.easeOut,
        delay: 3,
        duration: 1.2,
        stagger: {
          // satırların bekleme süresi için
          amount: 0.5,
        },
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=500",
        },
      }).from(shadowRef.current, {
        boxShadow:"0px 0px 0px white",
        ease: Power3.easeOut,
        delay: 0,
        duration: 2,
        scrollTrigger: {
          trigger: shadowRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=750",
        },
      });
      tl2.from(buttonRef.current, {
        opacity: 0,
        ease: Power3.easeIn,
        delay: 1.6,
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 5,
          start: "top 100%",
          end: "+=350",
        },
      });
    }
    
    // return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Grid
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      ref={shadowRef}
      sx={{
        height: "75vh",
        display:"flex",
        justifyContent: {xs:"start",sm:"end"},
        alignItems: {xs:"start",sm:"center"},
        marginY: { xs: 35, md: 35 },
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "start",
        boxShadow:"0px 0px 15px rgb(0,0,0,0.3)",
      }}
      id="ilan"
    >
      <Grid
        xs={12}
        sm={9}
        md={8}
        lg={7}
        xl={6}
        ref={bgRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", sm: "end" },
          overflow: "hidden",
          background:{
            xs:"linear-gradient(0deg, transparent,rgba(255,255,255,.5) 15%, rgba(255,255,255,.9) 50%, rgba(255,255,255,1) 75%)",
            sm:"linear-gradient(90deg, transparent,rgba(255,255,255,.5) 15%, rgba(255,255,255,.9) 50%, rgba(255,255,255,1) 75%)",
          },
          height: "100%",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            ref={textRef}
            sx={{
              fontSize: { xs: "45px", sm: "40px", lg: "45px", xl: "60px" },
              lineHeight: { xs: "50px", md: "65px" },
              marginRight: { xs: 0, sm: 5 },
              textAlign: "center",
            }}
          >
            Mevcut İlanlarımıza
          </Typography>
        </Box>
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            ref={textRef2}
            sx={{
              fontSize: { xs: "45px", sm: "40px", lg: "45px", xl: "60px" },
              lineHeight: { xs: "50px", md: "65px" },
              marginRight: { xs: 0, sm: 5 },
            }}
          >
            Göz Atmak
          </Typography>
        </Box>
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            ref={textRef3}
            sx={{
              fontSize: { xs: "45px", sm: "40px", lg: "45px", xl: "60px" },
              lineHeight: { xs: "50px", md: "65px" },
              marginRight: { xs: 0, sm: 5 },
            }}
          >
            İster misiniz?
          </Typography>
        </Box>
        <Button
          ref={buttonRef}
          variant="outlined"
          href="/ilanlar"
          sx={{
            color: "black",
            borderColor: "black",
            "&:hover": { color: "rgba(0,0,150,.75)" },
            mt: 2,
            width: "150px",
            fontSize:"1.5rem",
            marginRight: { xs: 0, sm: 5 },
          }}
        >
          İlanlar
        </Button>
      </Grid>
    </Grid>
  );
}

export default Ilan;
