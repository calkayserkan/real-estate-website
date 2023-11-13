import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from '@mui/icons-material/Facebook';

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@mui/material";
import * as L from "leaflet";
import markerIcon from "../../assets/location.png";

function Iletisim() {
  //Map Marker Icon Customization
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const icon = new LeafIcon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
  });
  const [marker, setMarker] = useState(icon);
  //Map Marker Icon Customization

  return (
    <Grid
      sx={{
        width: "100vw",
        height: "65vh",
        backgroundColor: "white",
        textAlign: "center",
      }}
      id="iletisim"
    >
      <Grid>
        <Grid>
          <Typography variant="h4" sx={{ mb: 10 }}>
            Bizimle İletişime Geçin
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: { xs: "center", md: "space-around" },
            flexWrap: "wrap",
            gap: { xs: 2, md: 0 },
          }}
        >
          <Grid sx={{ mb: 5, mx: 5, width: { xs: "80vw", lg: "35vw" }}}>
            <Card elevation={7} sx={{ borderRadius: 5 }}>
              <MapContainer
                center={[40.6572, 29.268]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "45vh" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>,&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //osm standart
                />
                <Marker position={[40.6443282, 29.1179806]} icon={marker}>
                  <Popup>Promax Emlak Gayrimenkul Danışmanlık</Popup>
                </Marker>
              </MapContainer>
            </Card>
          </Grid>

          <Grid sx={{width:{xs:"80vw",lg:"40vw"},display:"flex",flexDirection:"column",gap:5,mb:{xs:5,lg:0}}}>
            <Grid
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <LocalPhoneIcon></LocalPhoneIcon>
              <Typography variant="h5">0535 982 4235</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <MailIcon></MailIcon>
              <Typography variant="h5">mbuyukgedik.promax@gmail.com</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <FacebookIcon></FacebookIcon>
              <Typography variant="h5">@promax.cinarcik</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
              }}
            >
              <PlaceIcon></PlaceIcon>
              <Typography variant="h5" sx={{textAlign:"start"}}>
                  Harmanlar Mahallesi Poyraz Caddesi Hacı Hikmet Hanım Apartmanı B Giriş Yalova/Çınarcık
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Iletisim;
