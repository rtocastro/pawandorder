import React, { useState } from 'react';

export default function ZipForm() {

    const [zipcode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <font color="white" className="zipsearch">
                            <strong>
                                Zip Code:
                            </strong>
                        </font>
                        <br />
                        <input type="text" placeholder="Enter Zip Code" value={zipcode} onChange={(e) => setZipCode(e.target.value)} />
                    </label>
                    <br />
                    <br />

                </form>
                <button type="submit">Zip Submit</button>
            </div>
        </>


    )
}