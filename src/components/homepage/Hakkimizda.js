import React, { useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";
import ScrollTrigger from 'gsap/ScrollTrigger';
import bgImage2 from "../../assets/image2.webp";

import {gsap} from "gsap";
gsap.registerPlugin(ScrollTrigger)


function Hakkimizda() {
  const imageRef = useRef();
  const textRef = useRef();



  useEffect(()=>{
    gsap.from(imageRef.current,{
      opacity: 0,
      x:-500,
    })
    gsap.to(imageRef.current,{
      opacity: 0,
      x:-500,
    })
    gsap.to(imageRef.current,{
      opacity: 1,
      x:0,
      duration:2,
      ease:"easeIn",
      scrollTrigger:{
        trigger: imageRef.current,
        scrub:5,
        start:"top 100%",
        end:"+=750",
      }

    })

    gsap.from(textRef.current,{
      opacity: 0,
    })
    gsap.to(textRef.current,{
      opacity: 0,
    })
    gsap.to(textRef.current,{
      opacity: 1,
      scrollTrigger:{
        trigger: textRef.current,
        scrub:5,
        start:`top 80%`,
        end:"+=750",
      }

    })
  },[])  
  return (
    <Box sx={{ width: "100vw", height: "100vh",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}} id="hakkimizda">
        <Grid container xs={12} sx={{gap:{xs:"50px",sm:"0"}}}>
          <Grid
            xs={12} sm={7} md={7} lg={7} xl={7}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            ref={imageRef}
          >
            <CardMedia
              component="img"
              sx={{
                maxWidth: {xs: 300 , sm: 350 , md: 500 , lg: 600 , xl: 750},
                height: {xs: 250 , sm: 350 , md: 300 , lg: 400 , xl:500},
                borderRadius: "25px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
              }}
              image={bgImage2}
              alt="Paella dish"
            />
          </Grid>
          <Grid
            container
            xs={12} sm={5} md={5} lg={5} xl={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
            }}
            ref={textRef}
          >
            <Grid xs={12}>
              <Typography sx={{fontSize:{xs:"1.4rem",sm:"1.6rem",md:"1.9rem",lg:"2.2rem",xl:"2.5rem"}}}>
                Bizi Neden Tercih Etmelisiniz?
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography sx={{fontSize:{xs:".9rem",sm:"1.1rem",md:"1.4rem",lg:"1.7rem",xl:"2rem"}}}>
                Alanında Uzman Danışmanlar
              </Typography>
              <Typography sx={{fontSize:{xs:".9rem",sm:"1.1rem",md:"1.4rem",lg:"1.7rem",xl:"2rem"}}}>
                Her İhtiyaca Yönelik İlanlar 
              </Typography>
              <Typography sx={{fontSize:{xs:".9rem",sm:"1.1rem",md:"1.4rem",lg:"1.7rem",xl:"2rem"}}}>
                7/24 Destek
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  )
}

export default Hakkimizda