import React from 'react'

const mystyle = {
    color: "orange",
    height:"3rem",
    fontFamily: "Arial",
    display:"flex",
    justifyContent:"center",
    width : "16rem",
    fontSize: "30px",
    alignItems:"center",
    marginLeft:"40%",


  };


const Loader = () => {
  return (
    <div style={mystyle}>loading...</div>
  )
}

export default Loader