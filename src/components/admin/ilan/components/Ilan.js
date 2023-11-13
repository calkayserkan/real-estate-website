import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteIlan, updateIlan } from "../../../../firebase/firebase";
import image from "../../../../assets/inf.webp";
import { modal } from "../../../../utils/modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const label = { inputProps: { "aria-label": "Color switch demo" } };
function Ilan({ ilan }) {
  const { ilanlar } = useSelector((state) => state.ilanlar);
  const [ilanda, setIlanda] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cardIndex, setCardIndex] = useState("");
  const onMouseEnter = (id) => {
    setHovered(true);
    setCardIndex(id);
  };
  const onMouseLeave = (e) => {
    setHovered(false);
  };
  const switchState = async (e, id) => {
    const ilanId = ilanlar.find((ilan) => ilan.id === id);
    setIlanda(e.target.checked);
    await updateIlan(ilanId.id, {
      ilanda,
    });
  };
  return (
    <>
      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "35vw",
            md: "24vw",
            lg: "22.5vw",
            xl: "17.5vw",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 5,
          boxShadow: "0px 0px 15px rgba(0,0,0,0.25)",
          "&:hover": {
            boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
          },
          ...(ilan.durum === "Boşta" && {
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 90%, rgba(200,200,0,.6))",
          }),
          ...(ilan.durum === "İptal" && {
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 90%, rgba(200,0,0,.5))",
          }),
          ...(ilan.durum === "Satıldı" && {
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 90%, rgba(0,200,0,.5))",
          }),
          ...(ilan.durum === "Kiralandı" && {
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 90%, rgba(0,200,0,.5))",
          }),
        }}
        key={ilan.id}
        onMouseEnter={(e) => onMouseEnter(ilan.id)}
        onMouseLeave={onMouseLeave}
      >
        <CardMedia
          component="img"
          height="150"
          image={ilan.imageURL === "" ? image : ilan.imageURL}
          alt="green iguana"
          sx={{
            boxShadow: "0px 0px 15px rgba(0,0,0,.75)",
            transition: "all .4s ease-in-out",
            ...(hovered &&
              ilan.id === cardIndex && {
                transform: "translateY(-35px)",
              }),
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              marginBottom: -4,
              textAlign: "center",
              transform: "translateY(-45px)",
              transitionDelay: "250ms",
              opacity: 0,
              ...(hovered &&
                ilan.id === cardIndex && {
                  opacity: 1,
                }),
            }}
          >
            {ilan.semt}/Çınarcık
          </Typography>
          <Box sx={{display: "flex",flexDirection: "row",justifyContent:"space-between",alignItems:"center"}}>
            <Typography gutterBottom variant="h5" component="div" sx={{m:0}}>
              {ilan.fiyat} TL
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              {ilan.goruntulenme}<RemoveRedEyeIcon /> 
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {ilan.adres}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            {ilan.odaSayisi} {ilan.tip}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            <strong>Ev Sahibi:</strong> {ilan.evSahibi}
            <br />
            <strong>Numara:</strong> {ilan.evSahibiNo}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2.1,
          }}
        >
          <Switch
            {...label}
            checked={ilan.ilanda}
            color="success"
            onChange={(e) => switchState(e, ilan.id)}
          />
          <Box sx={{display:"flex",gap:1}}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "rgba(44,56,76)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,1)",
              },
            }}
            onClick={() => modal("update-ilan-modal", ilan)}
          >
            Düzenle
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "rgba(200,0,0)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(150,0,0,1)",
              },
            }}
            onClick={()=> deleteIlan(ilan.id)}
          >
            Sil
          </Button>

          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default Ilan;
