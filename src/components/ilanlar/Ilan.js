import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../../assets/inf.webp";
import { updateIlanFd } from "../../firebase/firebase";

function Ilan({ilan}) {
  const [hovered, setHovered] = useState(false);
  const [cardIndex, setCardIndex] = useState("");

  const onMouseEnter = (index) => {
    setHovered(true);
    setCardIndex(index);
  };

  const onMouseLeave = (e) => {
    setHovered(false);
  };

  const buttonCounter = async(id) => {
    const goruntulenme = (ilan.goruntulenme + 1)  
    await updateIlanFd(id,{
      goruntulenme
    })
      // window.open(ilan.link,'_blank');
      window.location.href = `${ilan.link}`;
  };

  return (
    <>
        <Card
          sx={{
            width: {
              xs: "100%",
              sm: "80vw",
              md: "42vw",
              lg: "42vw",
              xl: "29vw",
            },
            borderRadius: 5,
            boxShadow: "0px 0px 15px rgba(0,0,0,0.25)",
            "&:hover": {
              boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
            },
          }}
          key={ilan.id}
          onMouseEnter={(e) => onMouseEnter(ilan.id)}
          onMouseLeave={onMouseLeave}
        >
          <CardMedia
            component="img"
            height="200"
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
              variant="h5"
              sx={{
                marginBottom:-4,
                textAlign: "center",
                transform: "translateY(-45px)",
                transitionDelay:"250ms",
                opacity: 0,
                ...(hovered && ilan.id === cardIndex )&&{
                  opacity: 1,
                }
              }}
            >
              {ilan.semt}/Çınarcık
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {ilan.fiyat} TL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ilan.adres}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              {ilan.m2} m²
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              {ilan.odaSayisi} {ilan.tip}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ justifyContent: "end", marginRight: "1vw", marginBottom: 1 }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "rgba(44,56,76)",
                borderRadius: 2,
                "&:hover":{
                  backgroundColor: "rgba(0,0,0,1)"
                }
              }}
              onClick={(e)=>buttonCounter(ilan.id)}
            >
              Detaylar
            </Button>
          </CardActions>
        </Card>
    </>
  );
}

export default Ilan;
