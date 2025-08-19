import logo from './logo.svg';
import './App.css';
import Laskuri from './laskuri';
import Viesti from './viesti';
import React, {useState} from 'react';

const App = () => {

  const [showLaskuri,setShowLaskuri] = useState(false)
  const huomio = () =>{
    alert("Achtung!")
  }

  return (
    <div className="App">
      <h1>hello from App!</h1>

      <button onClick={()=>setShowLaskuri(!showLaskuri)}>{showLaskuri?"Piilota laskuri":"Näytä laskuri"}</button>
      <br/>
      {showLaskuri && <Laskuri huomio={huomio}/>}

      <Viesti teksti="teksti kohta" otsikko="Viesti komponentti"/>
    </div>
  );
}

export default App;
