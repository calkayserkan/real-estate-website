import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../components/admin/Dashboard";
import NoPermission from "../components/admin/NoPermission";
function Admin() {
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
    console.log(user)
  },[user])

  if(user){
  return (
    <Dashboard/>
  );
  }return(
    <NoPermission/>
  )
}

export default Admin;
