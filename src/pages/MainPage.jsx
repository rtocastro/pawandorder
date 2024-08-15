import React, { useState } from 'react';



export default function Mainpage() {

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                </form>
                <button type="submit">Zip Submit</button>
            </div>
            this is the mainpage
        </>


    )
}