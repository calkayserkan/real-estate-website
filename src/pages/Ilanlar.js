import React, { useEffect, useState } from "react";
import Map from "../components/ilanlar/Map";
import IlanList from "../components/ilanlar/IlanList";
import { useSelector } from "react-redux";
import { Box, Tab, Tabs, Card, Grid } from "@mui/material";

function Ilanlar() {
  const [value, setValue] = useState("two");
  const {ilanlar} = useSelector(state=> state.ilanlar)
  const [aktifIlanlar,setAktifIlanlar] = useState()
  
  const ilanHandle = () =>{
    setAktifIlanlar(ilanlar.filter((ilan)=>ilan.ilanda === true))
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    ilanHandle()
  },[ilanlar])

  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Card elevation={10} sx={{borderRadius:{xs:0,md:5},mx:{xs:0,md:5},mt:{xs:0,md:3}}}>
            <Map ilanData={aktifIlanlar} value={value}></Map>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{mt:10,mb:-5}}>
      <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label=""
          >
            <Tab value="one" label="Satılık" />
            <Tab value="two" label="Tümü" />
            <Tab value="three" label="Kiralık" />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{my:15,display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <IlanList ilanData={aktifIlanlar} value={value}></IlanList>
      </Grid>
    </Grid>
  );
}

export default Ilanlar;
