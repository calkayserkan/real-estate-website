import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, MenuItem } from "@mui/material";

import { addIlan } from "../../../firebase/firebase";
import { useSelector } from "react-redux";

//select options
import semtler from "./select/semtler";
import tipler from "./select/tipler";
import durumlar from "./select/durumlar";

//map
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Card } from "@mui/material";
import * as L from "leaflet";
import markerIcon from "../../../assets/location.png";


function LocationMarker() {
  const [position, setPosition] = useState(null);

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

  const map = useMapEvents({
    click() {
      map.locate();
    },
    move() {
      setPosition(map.getCenter());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={marker}>
      <Popup>Enlem: {position.lat.toFixed(5)} <br/> Boylam: {position.lng.toFixed(5)}</Popup>
    </Marker>
  );
}

function AddIlan() {
  //ilan detayları
  const [aciklama, setAciklama] = useState("");
  const [semt, setSemt] = useState("");
  const [adres, setAdres] = useState("");
  const [fiyat, setFiyat] = useState("0");
  const [odaSayisi, setOdaSayisi] = useState("0");
  const [m2, setM2] = useState("0");
  const [tip, setTip] = useState("");
  const [durum, setDurum] = useState("");
  const [evSahibi, setEvSahibi] = useState("");
  const [evSahibiNo, setEvSahibiNo] = useState("");
  const [ilanda, setIlanda] = useState(false);
  const [enlem, setEnlem] = useState(0);
  const [boylam, setBoylam] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [link, setLink] = useState("");
  const [goruntulenme, setGoruntulenme] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addIlan({
      aciklama,
      semt,
      adres,
      fiyat,
      odaSayisi,
      m2,
      tip,
      durum,
      evSahibi,
      evSahibiNo,
      ilanda,
      enlem,
      boylam,
      imageURL,
      link,
      goruntulenme,
      uid: user.uid,
    });
    setAciklama("");
    setSemt("");
    setAdres("");
    setFiyat("");
    setOdaSayisi("");
    setM2("");
    setTip("");
    setDurum("");
    setEvSahibi("");
    setEvSahibiNo("");
    setIlanda("");
    setEnlem("");
    setBoylam("");
    setImageURL("");
    setLink("");
    setGoruntulenme(0);
  };
  useEffect(() => {
  }, []);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        width: "500vw",
      }}
    >
      <Box sx={{ width: { xs: "90%", md: "80%", lg: "50%" }, mt: 5 }}>
        <Card elevation={7} sx={{ borderRadius: 5 }}>
          <MapContainer
            center={[40.64288, 29.11924]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "45vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>,&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //osm standart
            />
            <LocationMarker />
          </MapContainer>
        </Card>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 3 },
          Width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="fiyat"
            sx={{ width: { xs: "90%", sm: "25%" } }}
            label="Evin Fiyatı"
            variant="standard"
            value={fiyat}
            onChange={(e) => setFiyat(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="evSahibi"
            sx={{ width: { xs: "90%", sm: "40%", md: "30%" } }}
            label="Ev Sahibinin Adı"
            variant="standard"
            value={evSahibi}
            onChange={(e) => setEvSahibi(e.target.value)}
          />
          <TextField
            id="evSahibiNo"
            sx={{ width: { xs: "90%", sm: "40%", md: "30%" } }}
            label="Ev Sahibinin Numarası"
            variant="standard"
            value={evSahibiNo}
            onChange={(e) => setEvSahibiNo(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="semt"
            label="Semt"
            variant="standard"
            sx={{ width: { xs: "90%", sm: "25%" } }}
            select
            fullWidth
            value={semt}
            onChange={(e) => setSemt(e.target.value)}
          >
            {semtler.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ borderBottom: "solid rgba(0,0,0,.1) 1px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="tip"
            label="Emlak Tipi"
            variant="standard"
            sx={{ width: { xs: "90%", sm: "25%" } }}
            fullWidth
            select
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          >
            {tipler.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ borderBottom: "solid rgba(0,0,0,.1) 1px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="durum"
            label="Emlak Durumu"
            sx={{ width: { xs: "90%", sm: "25%" } }}
            variant="standard"
            fullWidth
            select
            value={durum}
            onChange={(e) => setDurum(e.target.value)}
          >
            {durumlar.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ borderBottom: "solid rgba(0,0,0,.1) 1px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="odaSayisi"
            sx={{ width: { xs: "90%", sm: "17.5%", md: "20%" } }}
            label="Oda Sayısı"
            variant="standard"
            value={odaSayisi}
            onChange={(e) => setOdaSayisi(e.target.value)}
          />
          <TextField
            id="m2"
            sx={{ width: { xs: "90%", sm: "17.5%", md: "20%" } }}
            label="Metrekare"
            variant="standard"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
          />
          <TextField
            id="enlem"
            sx={{ width: { xs: "90%", sm: "17.5%", md: "20%" } }}
            label="Konum (Enlem)"
            variant="standard"
            value={enlem}
            onChange={(e) => setEnlem(e.target.value)}
          />
          <TextField
            id="boylam"
            sx={{ width: { xs: "90%", sm: "17.5%", md: "20%" } }}
            label="Konum (Boylam)"
            variant="standard"
            value={boylam}
            onChange={(e) => setBoylam(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <TextField
            sx={{ width: { xs: "90%", md: "47%" } }}
            id="adres"
            label="Adresi Giriniz"
            variant="standard"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
          />
          <TextField
            sx={{ width: { xs: "90%", md: "48%" } }}
            id="aciklama"
            label="Bir açıklama girin"
            variant="standard"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
          />
          <TextField
            sx={{ width: { xs: "90%", md: "47%" } }}
            id="link"
            label="İlan Linkini Giriniz"
            variant="standard"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={
            fiyat === "" ||
            fiyat === "0" ||
            evSahibi === "" ||
            evSahibiNo === "" ||
            semt === "" ||
            tip === "" ||
            durum === "" ||
            odaSayisi === "" ||
            odaSayisi === "0" ||
            m2 === "" ||
            m2 === "0" ||
            enlem === "" ||
            enlem === "0" ||
            boylam === "" ||
            boylam === "0" ||
            adres === "" ||
            aciklama === "" ||
            link === ""
          }
        >
          Ekle
        </Button>
      </Box>
    </Grid>
  );
}

export default AddIlan;
