import logo from './logo.svg';
import './App.css';
import Laskuri from './laskuri';
import Viesti from './viesti';
import React, {useState,useEffect} from 'react';
import Posts from './posts';
import CustomerList from './CustomerList';
import Message from './Message';
import UserList from './UserList';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import ProductList from './ProductList';

const App = () => {

 
  const [showMessage,setShowMessage] = useState(false)
  const [message,setMessage] = useState("")
  const [isPositive,setIsPositive] = useState(true)
  const [loggedInUser,setLoggedInUser] = useState('')
  const [accessLevel,setAccessLevel] = useState(0)
  
  useEffect(() => {
    const user = localStorage.getItem('username');
    const accessLevel = localStorage.getItem('accesslevelId');
    if (accessLevel) {
      setAccessLevel(parseInt(accessLevel, 10));
    }
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const huomio = () =>{
    alert("Achtung!")
  }
  const LogOut=()=>{
    localStorage.clear();
    setLoggedInUser('');
    setAccessLevel(0);
  }

  return (
    <div className="App">
        { !loggedInUser && <Login setAccessLevel={setAccessLevel} setLoggedInUser={setLoggedInUser} setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/> }
        { loggedInUser && 
      <Router>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Nav className='mr-auto'>
            <Navbar.Brand href="/">Northwind React.js</Navbar.Brand>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
             {/* // toimii mutta jos käy editoimassa accessLevelin korkeammalle niin pitää kirjautua uudestaan ennen kun päivittää tiedon */}
            {accessLevel > 0 && <Nav.Link href="/users">Users</Nav.Link>}
            <Nav.Link href="/posts">Posts</Nav.Link>
            {accessLevel > 1 &&  <Nav.Link href="/laskuri">Laskuri</Nav.Link>}
            <button className='btn btn-secondary' onClick={()=>LogOut()}>Logout</button>

          </Nav>
        </Navbar>

        {showMessage && <Message message={message} isPositive={isPositive}/>}

        <Routes>
          <Route path='/customers' element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}/>
          <Route path='/products' element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}/>
          <Route path='/users' element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}/>
          <Route path='/posts' element={<Posts />} />
          <Route path='/laskuri' element={<Laskuri huomio={huomio} />} />

        </Routes>
      </Router>
      }
    </div>
  );
}

export default App;
