import React,{useState} from 'react';

const Laskuri = (props) => {

    const [luku,setLuku] = useState(0);

    return (
    <>
        <h3>{luku}</h3>
        <button onClick={()=> setLuku(luku + 1)}>+</button>
        <button onClick={()=> setLuku(luku - 1)}>-</button>
        <button onClick={()=> setLuku(0)}>reset</button>
        <br/>
        <button onClick={props.huomio}>huomio</button>
    </>
    
    );
}

export default Laskuri;
