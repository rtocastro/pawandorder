import React from "react";
import { Link } from "react-router-dom";
import pawprotectlogo from '../assets/pawprotectlogo.png'
import enter from '../assets/enter.png'

export default function Entry() {
    return (
        <>
            <Link to='./WeatherPage'><img src={pawprotectlogo} /></Link>
            <br />
            <Link to='./WeatherPage'><img src={enter} /></Link>
            
        </>


    )
}