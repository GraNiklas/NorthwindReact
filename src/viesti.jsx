import React from 'react';

const Viesti = (props) => {

    return (
    <>
        <h1>{props.otsikko}</h1>
        <p>{props.teksti}</p>
    </>
    
    );
}

export default Viesti;
