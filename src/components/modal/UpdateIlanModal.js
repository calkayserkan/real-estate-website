import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { isOpenFalse } from "../../store/modal";
// import { MenuItem } from '@mui/material';
import Box from "@mui/material/Box";

//resim upload
import DragDropFile from "../imageUpload/DragDropFile";
//tabs
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

//map
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Card, MenuItem, TextField } from "@mui/material";
import * as L from "leaflet";
import markerIcon from "../../assets/location.png";
import { updateIlan } from "../../firebase/firebase";

//select
import semtler from "../admin/ilan/select/semtler";
import tipler from "../admin/ilan/select/tipler";
import durumlar from "../admin/ilan/select/durumlar";

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
      <Popup>
        Enlem: {position.lat.toFixed(5)} <br /> Boylam:{" "}
        {position.lng.toFixed(5)}
      </Popup>
    </Marker>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UpdateIlanModal({ data }) {
  //ilan datası
  const [aciklama, setAciklama] = useState(data.aciklama);
  const [link, setLink] = useState(data.link);
  const [semt, setSemt] = useState(data.semt);
  const [adres, setAdres] = useState(data.adres);
  const [fiyat, setFiyat] = useState(data.fiyat);
  const [odaSayisi, setOdaSayisi] = useState(data.odaSayisi);
  const [m2, setM2] = useState(data.m2);
  const [tip, setTip] = useState(data.tip);
  const [durum, setDurum] = useState(data.durum);
  const [evSahibi, setEvSahibi] = useState(data.evSahibi);
  const [evSahibiNo, setEvSahibiNo] = useState(data.evSahibiNo);
  const [enlem, setEnlem] = useState(data.enlem);
  const [boylam, setBoylam] = useState(data.boylam);
  const [id, setId] = useState(data.id);
  const [imageURL, setImageURL] = useState(data.imageURL);

  const updateBilgilerHandle = async (e) => {
    e.preventDefault();
    await updateIlan(data.id, {
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
      link
    });
    dispatch(isOpenFalse());
  };
  const updateKonumHandle = async (e) => {
    e.preventDefault();

    await updateIlan(data.id, {
      enlem,
      boylam,
    });

    dispatch(isOpenFalse());
  };

  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    dispatch(isOpenFalse());
  };

  return (
    <>
      <DialogTitle sx={{ textAlign: "center", fontSize: "1.1rem" }}>
        İlan Detaylarını Düzenle
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box
          xs={12}
          sx={{
            "& > :not(style)": { width: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Resim" {...a11yProps(0)} />
                <Tab label="Konum" {...a11yProps(1)} />
                <Tab label="Bilgiler" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box>
                <DragDropFile ilanId={id} imgURL={imageURL}></DragDropFile>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ width: "100%" }}>
                <Card elevation={7} sx={{ borderRadius: 5 }}>
                  <MapContainer
                    center={[enlem, boylam]}
                    zoom={17}
                    scrollWheelZoom={true}
                    style={{ width: "100%", height: "35vh" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>,&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //osm standart
                    />
                    <LocationMarker />
                  </MapContainer>
                </Card>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  <TextField
                    id="enlem"
                    margin="dense"
                    label="Konum (enlem)"
                    variant="standard"
                    type="enlem"
                    value={enlem}
                    sx={{ width: { xs: "100%", sm: "44%" } }}
                    onChange={(e) => setEnlem(e.target.value)}
                  />
                  <TextField
                    id="boylam"
                    margin="dense"
                    label="Konum (boylam)"
                    variant="standard"
                    type="boylam"
                    sx={{ width: { xs: "100%", sm: "44%" } }}
                    value={boylam}
                    onChange={(e) => setBoylam(e.target.value)}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                <TextField
                  id="fiyat"
                  margin="dense"
                  label="Fiyat"
                  variant="standard"
                  type="fiyat"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={fiyat}
                  onChange={(e) => setFiyat(e.target.value)}
                />
                <TextField
                  id="odaSayisi"
                  margin="dense"
                  label="Oda Sayısı"
                  variant="standard"
                  type="odaSayisi"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={odaSayisi}
                  onChange={(e) => setOdaSayisi(e.target.value)}
                />
                <TextField
                  id="evSahibi"
                  margin="dense"
                  label="Ev Sahibinin Adı"
                  variant="standard"
                  type="evSahibi"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={evSahibi}
                  onChange={(e) => setEvSahibi(e.target.value)}
                />
                <TextField
                  id="evSahibiNo"
                  margin="dense"
                  label="Ev Sahibinin Numarası"
                  variant="standard"
                  type="evSahibiNo"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={evSahibiNo}
                  onChange={(e) => setEvSahibiNo(e.target.value)}
                />
                <TextField
                  id="tip"
                  margin="dense"
                  label="Emlak Tipi"
                  variant="standard"
                  type="tip"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={tip}
                  select
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
                  margin="dense"
                  variant="standard"
                  type="durum"
                  select
                  sx={{ width: { xs: "100%", sm: "44%" } }}
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
                <TextField
                  id="semt"
                  label="Semt (mahalle)"
                  margin="dense"
                  variant="standard"
                  type="semt"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  select
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
                  id="m2"
                  label="Metrekare"
                  margin="dense"
                  variant="standard"
                  type="m2"
                  sx={{ width: { xs: "100%", sm: "44%" } }}
                  value={m2}
                  onChange={(e) => setM2(e.target.value)}
                />
                <TextField
                  id="adres"
                  label="Adres"
                  margin="dense"
                  variant="standard"
                  type="adres"
                  sx={{ width: "100%" }}
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                />
                <TextField
                  id="aciklama"
                  label="Açıklama"
                  margin="dense"
                  variant="standard"
                  type="aciklama"
                  sx={{ width: "100%" }}
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                />
                <TextField
                  id="link"
                  label="İlan Linki"
                  margin="dense"
                  variant="standard"
                  type="link"
                  sx={{ width: "100%" }}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Kapat
        </Button>
        <Button
          color="success"
          onClick={
            value === 0
              ? handleClose
              : value === 1
              ? updateKonumHandle
              : updateBilgilerHandle
          }
        >
          Kaydet
        </Button>
      </DialogActions>
    </>
  );
}

export default UpdateIlanModal;
