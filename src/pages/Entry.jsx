import React from "react";
import { Link } from "react-router-dom";
import pawprotectlogo from '../assets/pawprotectlogo.png'

export default function Entry() {
    return (
        <>
            <Link to='./MainPage'><img src={pawprotectlogo} /></Link>
            <br />
            this is the entry page
        </>


    )
}