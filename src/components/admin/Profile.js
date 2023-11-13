import { Avatar, Card, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
function Profile() {
  const [value,setValue] = useState(false)
  const handleValue = () =>{
    setValue(!value)
  }
  useEffect(()=>{
  },[value])

  if(!value){
    return (
      <Grid sx={{mt:5,display:"flex",flexDirection:"column",gap:5}}>
        <Avatar sx={{width:250 , height:250}}></Avatar>
        <Card elevation={0} sx={{borderRadius:2.5,boxShadow:"0px 2.5px 25px rgba(0,0,0,0.2)",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Typography sx={{p:2}}>Serkan Çalkay</Typography>
        </Card>
        <Card elevation={0} sx={{borderRadius:2.5,boxShadow:"0px 2.5px 25px rgba(0,0,0,0.2)",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Typography sx={{p:2}}>Yönetici</Typography>
        </Card>
        <IconButton sx={{width:45,alignSelf:"center"}} onClick={(e)=>handleValue()}>
          <EditIcon></EditIcon>
        </IconButton>
      </Grid>
    )
  }
  if(value){
    return (
      <Grid sx={{mt:5,display:"flex",flexDirection:"column",gap:5}}>
        <Avatar sx={{width:250 , height:250}}></Avatar>
        <Card elevation={0} sx={{borderRadius:2.5,boxShadow:"0px 2.5px 25px rgba(0,0,0,0.2)",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Typography sx={{p:2}}>Serkan Çalkay</Typography>
        </Card>
        <Card elevation={0} sx={{borderRadius:2.5,boxShadow:"0px 2.5px 25px rgba(0,0,0,0.2)",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Typography sx={{p:2}}>Yönetici</Typography>
        </Card>
        <IconButton sx={{width:45,alignSelf:"center"}} onClick={(e)=>handleValue()}>
          A
        </IconButton>
      </Grid>
    )
  }
  
}

export default Profile