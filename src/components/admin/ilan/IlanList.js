import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Tabs, Tab, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import ilanEkle4 from "../../../assets/plus.png";
import Modal from "../../modal/Modal";
import Ilan from "./components/Ilan";

function IlanList() {
  const [value, setValue] = useState("two");
  const { open, data } = useSelector((state) => state.modal);
  const { ilanlar } = useSelector((state) => state.ilanlar);
  const [satilikIlanlar, setSatilikIlanlar] = useState([]);
  const [kiralikIlanlar, setKiralikIlanlar] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateAddIlan = () => {
    navigate("/admin/ilanEkle");
  };
  const ilanFilter = () => {
    setSatilikIlanlar(ilanlar.filter((ilan) => ilan.tip === "Satılık"));
    setKiralikIlanlar(ilanlar.filter((ilan) => ilan.tip === "Kiralık"));
  };
  useEffect(() => {
    ilanFilter();
  }, [ilanlar]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | İlanlar</title>
      </Helmet>

      {open && <Modal name={open} data={data} />}
      <Grid
        container
        item
        xs={11}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "start",
          gap: 5,
          mt: 5,
        }}
      >
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
        <Card
          sx={{
            width: {
              xs: "100%",
              sm: "35vw",
              md: "24vw",
              lg: "22.5vw",
              xl: "17.5vw",
            },
            height: { xs: "30%", sm: "50%", md: "50%", lg: "50%", xl: "45%" },
            borderRadius: 5,
            boxShadow: "0px 0px 15px rgba(0,0,0,0.25)",
            "&:hover": {
              boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
            },
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 5 },
              py: { xs: 5, sm: 0 },
            }}
            onClick={navigateAddIlan}
          >
            <Grid
              sx={{
                width: {
                  xs: "17.5vw",
                  sm: "20vw",
                  md: "15vw",
                  lg: "13vw",
                  xl: "10vw",
                },
                height: "auto",
              }}
            >
              <CardMedia component="img" image={ilanEkle4}></CardMedia>
            </Grid>
            <Typography variant="h5">Yeni İlan Ekle</Typography>
          </CardActionArea>
        </Card>
        {value === "two"
          ? ilanlar.map((ilan) => <Ilan key={ilan.id} ilan={ilan}></Ilan>)
          : null}

        {value === "one"
          ? satilikIlanlar.map((ilan) => (
              <Ilan key={ilan.id} ilan={ilan}></Ilan>
            ))
          : null}
        {value === "three"
          ? kiralikIlanlar.map((ilan) => (
              <Ilan key={ilan.id} ilan={ilan}></Ilan>
            ))
          : null}
      </Grid>
    </>
  );
}

export default IlanList;
