import logo from './logo.svg';
import './App.css';
import Laskuri from './laskuri';
import Viesti from './viesti';
import React, {useState} from 'react';
import Posts from './posts';
import CustomerList from './CustomerList';
import Message from './Message';

const App = () => {

  const [showLaskuri,setShowLaskuri] = useState(false)
  const [showPosts,setShowPosts] = useState(false)
  
  const [showMessage,setShowMessage] = useState(false)
  const [message,setMessage] = useState("")
  const [isPositive,setIsPositive] = useState(true)
  
  const huomio = () =>{
    alert("Achtung!")
  }

  return (
    <div className="App">
      <h1>hello from App!</h1>

      {showMessage && <Message message={message} isPositive={isPositive}/>}

      <br/>
      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
      <br/>
      <button onClick={()=>setShowPosts(!showPosts)}>{showPosts?"Piilota postaukset":"Näytä postaukset"}</button>
      <br/>
      {showPosts && <Posts/>} 
      <br/>
      <button onClick={()=>setShowLaskuri(!showLaskuri)}>{showLaskuri?"Piilota laskuri":"Näytä laskuri"}</button>
      <br/>
      {showLaskuri && <Laskuri huomio={huomio}/>}

      <Viesti teksti="teksti kohta" otsikko="Viesti komponentti"/>
    </div>
  );
}

export default App;
