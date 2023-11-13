import React, { useEffect, useRef } from 'react'

import Typography from "@mui/material/Typography";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {gsap} from "gsap";

import image3 from "../../assets/image3.webp";

function NameCard() {

  const cardRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
   
    gsap.from(cardRef.current,{
      opacity:0,
    })
    gsap.from(imageRef.current,{
      opacity:0,
    })

    gsap.to(cardRef.current,{
      opacity:0,
    })
    gsap.to(imageRef.current,{
      opacity:0,
    })

    gsap.to(cardRef.current,{
      opacity:1,
      delay:3,
      duration:2,
    })
    gsap.to(imageRef.current,{
      opacity:1,
      delay:1,
      duration:2,
    })
  }, []);
  return (
    <Card sx={{ width: "100vw", height: "80vh", borderRadius: 0}} elevation={0} className="nameCard">
        <CardMedia
          component="img"
          height="100%"
          sx={{}}
          image={image3}
          alt="Paella dish"
          ref={imageRef}
        />
        <CardContent
          sx={{
            position: "absolute",
            bottom: {xs:"15vh",sm:"14vh",md:"13vh",lg:"12vh",xl:"10vh"},
            left: "22.5vw",
            width: "50vw",
            borderRadius: "15px",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.25)",
          }}
          ref={cardRef}
        >
          <Typography color="rgba(0,0,0,0.7)" sx={{ fontSize: {xs:"4vw",sm:"3vw"} ,textAlign:"center"}}>
            Promax Emlak Gayrimenkul Danışmanlık
          </Typography>
        </CardContent>
      </Card>
  )
}

export default NameCard