import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import DangerousIcon from '@mui/icons-material/Dangerous';

function NoPermission() {
  return (
    <Grid sx={{height:"70vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5}}>
    <Avatar sx={{width:200,height:200,backgroundColor:"rgba(0,0,0,.075)",boxShadow:"0px 0px 25px rgba(0,0,0,.2)"}}>
      <DangerousIcon sx={{width:200,height:200,color:"red"}}></DangerousIcon>
    </Avatar>
    <Typography variant="h6" sx={{textAlign:"center",mx:3}}>Bu Sayfayı Görüntülemek İçin Yetkiniz Yok</Typography>
  </Grid>
  )
}

export default NoPermission