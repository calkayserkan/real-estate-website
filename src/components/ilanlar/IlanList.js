import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Ilan from "./Ilan";

function IlanList({ilanData,value}) {
  const [showTotal,setShowTotal] = useState([])
  const [satilikIlan,setSatilikIlan] = useState([])
  const [kiralikIlan,setKiralikIlan] = useState([])

  const showIlan = () => {
    if(ilanData !== undefined){
      setShowTotal(ilanData.filter((ilan) => ilan.durum === "Boşta"));
      setSatilikIlan(ilanData.filter((ilan) => ilan.durum === "Boşta" && ilan.tip === "Satılık"));
      setKiralikIlan(ilanData.filter((ilan) => ilan.durum === "Boşta" &&  ilan.tip === "Kiralık"));
    }
  }
  useEffect(() => {
    showIlan();
  }, [ilanData]);

  return (
    <Grid
      container
      item
      xs={11}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      
        {value === "two"
          ? showTotal.map((ilan) => <Ilan key={ilan.id} ilan={ilan}></Ilan>)
          : null}

        {value === "one"
          ? satilikIlan.map((ilan) => (
              <Ilan key={ilan.id} ilan={ilan}></Ilan>
            ))
          : null}
        {value === "three"
          ? kiralikIlan.map((ilan) => (
              <Ilan key={ilan.id} ilan={ilan}></Ilan>
            ))
          : null}
    </Grid>
  );
}

export default IlanList;
