import logo from './logo.svg';
import './App.css';
import Laskuri from './laskuri';
import Viesti from './viesti';
import React, {useState} from 'react';
import Posts from './posts';
import CustomerList from './CustomerList';
import Message from './Message';
import UserList from './UserList';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
      
      <Router>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Nav className='mr-auto'>

            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/laskuri">Laskuri</Nav.Link>
          </Nav>
        </Navbar>

        {showMessage && <Message message={message} isPositive={isPositive}/>}
        
        <Routes>
          <Route path='/customers' element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}/>
          <Route path='/users' element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}/>
          <Route path='/posts' element={<Posts />} />
          <Route path='/laskuri' element={<Laskuri huomio={huomio} />} />
          <Route path='/users' element={<h2>Users page</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
