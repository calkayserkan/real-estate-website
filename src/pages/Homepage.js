import React from 'react'
import { Grid } from "@mui/material";
import Appbar from "../components/homepage/Appbar";
import NameCard from "../components/homepage/NameCard";
import Hakkimizda from "../components/homepage/Hakkimizda";
import Hareketler from "../components/homepage/Hareketler";
import Ilan from "../components/homepage/Ilan";
import Iletisim from "../components/homepage/Iletisim";
function Homepage() {
  return (
    <Grid>
      <Appbar></Appbar>
      <NameCard></NameCard>
      <Hakkimizda></Hakkimizda>
      <Hareketler></Hareketler>
      <Ilan></Ilan>
      <Iletisim></Iletisim>
    </Grid>
  )
}

export default Homepage