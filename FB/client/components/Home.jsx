import React, { useEffect } from 'react'
import {toast} from "react-toastify"

const Home = () => {
  useEffect(()=>{
    toast.success("welcome to home page!!!!!")

  },[])
  return (
    <div>
  <h1>Home </h1>
    </div>
  )
}

export default Home
