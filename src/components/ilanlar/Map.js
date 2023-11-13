import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";

import "leaflet/dist/leaflet.css";
import icon from "../../assets/location.png";
import { Button } from "@mui/material";
import { updateIlanFd } from "../../firebase/firebase";


function Map({ilanData,value}) {
  const [showTotal,setShowTotal] = useState([])
  const [satilikIlan,setSatilikIlan] = useState([])
  const [kiralikIlan,setKiralikIlan] = useState([])
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const blackIcon = new LeafIcon({
    iconUrl: icon,
    iconSize: [40, 40],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
  });
  const [markerIcon, setMarkerIcon] = useState(blackIcon);

  const showIlan = () => {
    
    if(ilanData !== undefined){
      setShowTotal(ilanData.filter((ilan) => ilan.durum === "Boşta"));
      setSatilikIlan(ilanData.filter((ilan) => ilan.durum === "Boşta" && ilan.tip === "Satılık"));
      setKiralikIlan(ilanData.filter((ilan) => ilan.durum === "Boşta" && ilan.tip === "Kiralık"));
    }
  }

  const markerNavigate = async(link,id) =>{
    const ilan = ilanData.filter((mark) => mark.id === id)
    var goruntulenme = 0
    goruntulenme = (ilan[0].goruntulenme + 1)  
    await updateIlanFd(id,{
      goruntulenme
    })
    window.open(link,'_blank');
  }

  useEffect(()=>{
    showIlan();
  },[ilanData]);
  return (
    <MapContainer
      center={[40.64284, 29.11921]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "55vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>,&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //osm standart
        // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" //dark
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=27194bc9-5fbe-497a-920f-30ee8ff444d4" //light
        // url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" //outdoors
        // url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" //osm bright
      />
      {value === "two" 
      ? showTotal.map((marker, index) => (
        <Marker position={[marker.enlem,marker.boylam]} icon={markerIcon} key={index}>
          <Popup>
            <strong>{marker.fiyat}</strong>
            <br />
            {marker.tip} {marker.odaSayisi}
            <br />
            {marker.adres}
            <br />
            <Button
              onClick={(e)=>markerNavigate(marker.link,marker.id)}
              sx={{
                fontSize: ".8rem",
                marginTop: 0.5,
                py: 0,
                px: .5,
                backgroundColor: "rgba(0,0,0,.05)",
                color: "rgba(0,0,0,1) !important",
                boxShadow: "0px 0px 0px white",
                transition: "all .35s ease-in-out",
                "&:hover":{
                  backgroundColor: "rgba(44,56,76,1)",
                  color: "white !important",
                }
              }}
            >
              Detaylar
            </Button>
          </Popup>
        </Marker>
      )) : null
      }
      {value === "one" 
      ? satilikIlan.map((marker, index) => (
        <Marker position={[marker.enlem,marker.boylam]} icon={markerIcon} key={index}>
          <Popup>
            <strong>{marker.fiyat}</strong>
            <br />
            {marker.tip} {marker.odaSayisi}
            <br />
            {marker.adres}
            <br />
            <Button
              onClick={(e)=>markerNavigate(marker.link,marker.id)}
              sx={{
                fontSize: ".8rem",
                marginTop: 0.5,
                py: 0,
                px: .5,
                backgroundColor: "rgba(0,0,0,.05)",
                color: "rgba(0,0,0,1) !important",
                boxShadow: "0px 0px 0px white",
                transition: "all .35s ease-in-out",
                "&:hover":{
                  backgroundColor: "rgba(44,56,76,1)",
                  color: "white !important",
                }
              }}
            >
              Detaylar
            </Button>
          </Popup>
        </Marker>
      )) : null
      }
      {value === "three" 
      ? kiralikIlan.map((marker, index) => (
        <Marker position={[marker.enlem,marker.boylam]} icon={markerIcon} key={index}>
          <Popup>
            <strong>{marker.fiyat}</strong>
            <br />
            {marker.tip} {marker.odaSayisi}
            <br />
            {marker.adres}
            <br />
            <Button
              onClick={(e)=>markerNavigate(marker.link,marker.id)}
              sx={{
                fontSize: ".8rem",
                marginTop: 0.5,
                py: 0,
                px: .5,
                backgroundColor: "rgba(0,0,0,.05)",
                color: "rgba(0,0,0,1) !important",
                boxShadow: "0px 0px 0px white",
                transition: "all .35s ease-in-out",
                "&:hover":{
                  backgroundColor: "rgba(44,56,76,1)",
                  color: "white !important",
                }
              }}
            >
              Detaylar
            </Button>
          </Popup>
        </Marker>
      )) : null
      }
      
    </MapContainer>
  );
}

export default Map;
