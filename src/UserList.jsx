import React, { useState, useEffect } from 'react';
import userService from './services/UserService';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';

//props suoraan nimellä eikä props.huomio
const UserList = ({ setIsPositive, setMessage, setShowMessage }) => {

    //componentin tilan määritys
    const [users, setUsers] = useState([]);
    const [lisäysTila, setLisäysTila] = useState(false);
    const [muokkausUser, setmuokkausUser] = useState(null);
    const [muokkausTila, setMuokkausTila] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        userService.getAll()
        .then(data => setUsers(data))
    }, [lisäysTila])


    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }
    const handleEdit = (user) => {
        setMuokkausTila(true)
        setmuokkausUser(user);
    }
    const handleDelete = (userId) => {
     userService.remove(userId)
        .then(response => {
            if (response.status === 200) {
                setIsPositive(true);
                setMessage("User deleted successfully");
                setShowMessage(true);
                setLisäysTila(false);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            }
        })
        .catch(error => {
            setShowMessage(true);
            setMessage("Error: " + error.response.data);
            setIsPositive(false);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        });
    }


    return (
        <>
        <h1>Users</h1>
            {muokkausTila && <UserEdit user={muokkausUser} setMuokkausTila={setMuokkausTila} setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />}

            {!lisäysTila && <button className='btn btn-success' onClick={() => setLisäysTila(true)}>Lisää uusi</button>}
            {lisäysTila && <UserAdd setLisäysTila={setLisäysTila} setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive}/>}
            <br/>
            <label>Search:</label>
            <input type='text' onChange={(value) => handleSearch(value)}></input>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map(u => {
                    const lowerCaseName = u.lastName.toLowerCase();
                    if (lowerCaseName.indexOf(search) > -1)
                        return (
                            
                                <tr key={u.userId}>
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.accesslevelId}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={()=>handleEdit(u)}>Edit</button>
                                        <button className='btn btn-danger' onClick={()=>handleDelete(u.userId)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                    
                </tbody>
            </table>  
        </>

    );
}

export default UserList;
