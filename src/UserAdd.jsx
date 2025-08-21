import React, { useState } from 'react';
import UserService from './services/UserService';
import md5 from 'md5';

//props suoraan nimellä eikä props.huomio
const UserAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newAccesslevelId, setNewAccesslevelId] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        var newUser = {
            firstName: newFirstName,
            lastName: newLastName,
            username: newUserName,
            email: newEmail,
            password: md5(newPassword),
            accesslevelId: parseInt(newAccesslevelId),
        };
        console.log(newUser);
        UserService.create(newUser)
            .then(response => {
                if (response.status == 200) {
                    setIsPositive(true);
                    setMessage("New User added successfully: " + newFirstName);
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                    setLisäysTila(false);
                }
            })
            .catch(error => {
                setShowMessage(true);
                setMessage("Error: " + error.response.data);
                setIsPositive(false);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            })
    }


    return (
        <div id='addNew'>
            <h2>User add</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Firstname' required onChange={({ target }) => setNewFirstName(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Lastname' required onChange={({ target }) => setNewLastName(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Username' required onChange={({ target }) => setNewUserName(target.value)} />
                </div>
                <div>
                    <input type='email' placeholder='Email' onChange={({ target }) => setNewEmail(target.value)} />
                </div>
                <div>
                    <input type='password' placeholder='Password' required onChange={({ target }) => setNewPassword(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Accesslevel id' required onChange={({ target }) => setNewAccesslevelId(target.value)} />
                </div>

                <div>
                    <input type='submit' value='save' />
                    <input type='button' value='back' onClick={() => setLisäysTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default UserAdd;
