import { Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StyledCardDetaylar = (props) => (
  <Card
    elevation={0}
    sx={{
      width: {xs:"80%",sm:"15vw"},
      height: "15vh",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      boxShadow: "0px 0px 20px rgba(0,0,0,.3)",
      background:
        "linear-gradient(to right bottom, #BBD2C5, #536976, #292E49 90%)",
      color: "white",
    }}
  >
    {props.children}
  </Card>
);
const StyledCardGoruntulenme = (props) => (
  <Card
    elevation={0}
    sx={{
      width: {xs:"80%",sm:"15vw"},
      height: "15vh",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      boxShadow: "0px 0px 20px rgba(0,0,0,.3)",
      background:
        "linear-gradient(to right bottom, #90AAA0, #33745D 20% ,#00412A 55%, #00201A 85%)",
      color: "white"
    }}
  >
    {props.children}
  </Card>
);
const StyledCardDurum = (props) => (
  <Card
    elevation={0}
    sx={{
      width: {xs:"80%",sm:"15vw"},
      height: "15vh",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      boxShadow: "0px 0px 20px rgba(0,0,0,.3)",
      background:
        "linear-gradient(to right bottom, rgba(150,200,150,1),rgba(100,150,100,1) 20%, rgba(50,100,50,1)50%, rgba(0,50,0,1) 90%)",
      color: "white",
    }}
  >
    {props.children}
  </Card>
);
const StyledGrid = (props) => (
  <Grid
    item
    xs={11}
    sx={{
      display: "flex",
      flexDirection: {xs:"column",sm:"row"},
      justifyContent: {xs:"space-around",sm:"space-between"},
      alignItems: {xs:"space-around",sm:"center"},
      flexWrap: {xs:"nowrap",sm:"wrap"},
      borderRadius: 3,
      boxShadow: "0px 0px 15px rgba(0,0,0,.3)",
      backgroundColor: "white",
      gap:{xs:2.5,sm:0}
    }}
  >
    {props.children}
  </Grid>
);

function Dash() {
  const { ilanlar } = useSelector((state) => state.ilanlar);
  const [ total,setTotal] = useState(0)
  const [ satilik,setSatilik] = useState(0)
  const [ kiralik,setKiralik] = useState(0)
  const [ bosta,setBosta] = useState(0)
  const [ satilan,setSatilan] = useState(0)
  const [ kiralanan,setKiralanan] = useState(0)
  const [ totalViews,setTotalViews] = useState(0)
  const [ satilikViews,setSatilikViews] = useState(0)
  const [ kiralikViews,setKiralikViews] = useState(0)

  const counts = () => {
    const satilikIlan = ilanlar.filter((ilan) => ilan.tip === "Satılık")
    const kiralikIlan = ilanlar.filter((ilan) => ilan.tip === "Kiralık")
    const bostaIlan = ilanlar.filter((ilan) => ilan.durum === "Boşta")
    const satilanIlan = ilanlar.filter((ilan) => ilan.durum === "Satıldı")
    const kiralananIlan = ilanlar.filter((ilan) => ilan.durum === "Kiralandı")

    setTotal(ilanlar.length);
    setSatilik(satilikIlan.length)
    setKiralik(kiralikIlan.length)
    setBosta(bostaIlan.length)
    setSatilan(satilanIlan.length)
    setKiralanan(kiralananIlan.length)

    var totalCount = 0
    var satilikCount = 0
    var kiralikCount = 0

    ilanlar.map((ilan)=>{
      totalCount = (totalCount + ilan.goruntulenme)
    })
    satilikIlan.map((ilan)=>{
      satilikCount = (satilikCount + ilan.goruntulenme)
    })
    kiralikIlan.map((ilan)=>{
      kiralikCount = (kiralikCount + ilan.goruntulenme)
    })

    setTotalViews(totalCount)
    setSatilikViews(satilikCount)
    setKiralikViews(kiralikCount)
  }

  useEffect(()=>{
    counts()
  },[ilanlar])

  return (
    <>
      <Grid
        container
        item
        xs={12}
        sx={{ my: 5, justifyContent: "center", gap: 5  }}
      >
        <StyledGrid>
          <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"20%",md:"24%"},
              borderLeft: {xs:"0px solid white",sm:"15px solid #BBD2C5"},
              borderTop: {xs:"15px solid #BBD2C5",sm:"0px solid white"},
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: {xs:"center",sm:"start"},
              alignItems: "center",
              textAlign: "center",
              color: "black",
            }}
          >
            <Typography
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "-webkit-linear-gradient(0deg,#BBD2C5, #292E49)",
                ml:2,
                fontSize:{xs:"3rem",sm:"2rem",md:"3rem"}
                
              }}
            >
              İlanlar
            </Typography>
          </Grid>
          <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"70%",lg:"75%"},
              display: "flex",
              flexDirection: {xs:"column",sm:"row"},
              justifyContent: {xs:"center",sm:"space-evenly"},
              alignItems: {xs:"center",sm:"space-evenly"},
              gap:{xs:2.5,sm:0},
              mb: {xs:2.5,sm:0}
            }}
          >
            <StyledCardDetaylar>
              <Typography variant="h6">Toplam İlan</Typography>
              <Typography variant="h4">{total}</Typography>
            </StyledCardDetaylar>
            <StyledCardDetaylar>
              <Typography variant="h6">Satılık İlanlar</Typography>
              <Typography variant="h4">{satilik}</Typography>
            </StyledCardDetaylar>
            <StyledCardDetaylar>
              <Typography variant="h6">Kiralık İlanlar</Typography>
              <Typography variant="h4">{kiralik}</Typography>
            </StyledCardDetaylar>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"15%",md:"20%"},
              borderLeft: {xs:"0px solid white",sm:"15px solid #90AAA0"},
              borderTop: {xs:"15px solid #90AAA0",sm:"0px solid white"},
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: {xs:"center",sm:"start"},
              alignItems: "center",
              textAlign: "center",
              color: "black",
            }}
          >
            <Typography
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "-webkit-linear-gradient(0deg,#33745D, #200)",
                ml:2,
                fontSize:{xs:"2rem",sm:"1rem",md:"1.9rem"}
              }}
            >
              Görüntülenme
            </Typography>
          </Grid>
          <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"70%",lg:"75%"},
              display: "flex",
              flexDirection: {xs:"column",sm:"row"},
              justifyContent: {xs:"center",sm:"space-evenly"},
              alignItems: {xs:"center",sm:"space-evenly"},
              gap:{xs:2.5,sm:0},
              mb: {xs:2.5,sm:0}
            }}
          >
            <StyledCardGoruntulenme>
              <Typography variant="h6">Toplam</Typography>
              <Typography variant="h4">{totalViews}</Typography>
            </StyledCardGoruntulenme>
            <StyledCardGoruntulenme>
              <Typography variant="h6">Satılık</Typography>
              <Typography variant="h4">{satilikViews}</Typography>
            </StyledCardGoruntulenme>
            <StyledCardGoruntulenme>
              <Typography variant="h6">Kiralık</Typography>
              <Typography variant="h4">{kiralikViews}</Typography>
            </StyledCardGoruntulenme>
          </Grid>
        </StyledGrid>

        <StyledGrid>
        <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"20%",md:"24%"},
              borderLeft: {xs:"0px solid white",sm:"15px solid rgba(150,200,150,1)"},
              borderTop: {xs:"15px solid rgba(150,200,150,1)",sm:"0px solid white"},
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: {xs:"center",sm:"start"},
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "-webkit-linear-gradient(0deg,rgba(150,200,150,1), rgba(0,50,0,1))",
                ml:2,
                fontSize:{xs:"3rem",sm:"2.2rem",md:"2.5rem"}
              }}
            >
              Durum
            </Typography>
          </Grid>
          <Grid
            sx={{
              flexBasis: {xs:"100%",sm:"70%",lg:"75%"},
              display: "flex",
              flexDirection: {xs:"column",sm:"row"},
              justifyContent: {xs:"center",sm:"space-evenly"},
              alignItems: {xs:"center",sm:"space-evenly"},
              gap:{xs:2.5,sm:0},
              mb: {xs:2.5,sm:0}
            }}
          >
            <StyledCardDurum>
              <Typography variant="h6">Boşta</Typography>
              <Typography variant="h4">{bosta}</Typography>
            </StyledCardDurum>
            <StyledCardDurum>
              <Typography variant="h6">Satıldı</Typography>
              <Typography variant="h4">{satilan}</Typography>
            </StyledCardDurum>
            <StyledCardDurum>
              <Typography variant="h6">Kiralandı</Typography>
              <Typography variant="h4">{kiralanan}</Typography>
            </StyledCardDurum>
          </Grid>
        </StyledGrid>
      </Grid>
    </>
  );
}

export default Dash;
