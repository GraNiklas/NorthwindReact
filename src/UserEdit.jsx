import React, { useState } from 'react';
import UserService from './services/UserService';
import md5 from 'md5';

//props suoraan nimellä eikä props.huomio
const UserEdit = ({user, setMuokkausTila, setIsPositive, setMessage, setShowMessage }) => {

    const [newFirstName, setNewFirstName] = useState(user?.firstName || '');
    const [newLastName, setNewLastName] = useState(user?.lastName || '');
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [newUserName, setNewUserName] = useState(user?.username || '');
    const [newAccesslevelId, setNewAccesslevelId] = useState(user?.accesslevelId || 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        var newUser = {
            userId: user.userId,
            firstName: newFirstName,
            lastName: newLastName,
            username: newUserName,
            email: newEmail,
            password: md5(newPassword),
            accesslevelId: parseInt(newAccesslevelId)
        };
        console.log(newUser);
        UserService.update(newUser)
            .then(response => {
                if (response.status == 200) {
                    setIsPositive(true);
                    setMessage("New User edited successfully: " + newFirstName);
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                    setMuokkausTila(false);
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
        <div id='edit'>
            <h2>User edit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Firstname' required onChange={({ target }) => setNewFirstName(target.value)} value={newFirstName}/>
                </div>
                <div>
                    <input type='text' placeholder='Lastname' required onChange={({ target }) => setNewLastName(target.value)} value={newLastName}/>
                </div>
                <div>
                    <input type='text' placeholder='Username' required onChange={({ target }) => setNewUserName(target.value)} value={newUserName}/>
                </div>
                <div>
                    <input type='email' placeholder='Email' onChange={({ target }) => setNewEmail(target.value)} value={newEmail}/>
                </div>
                <div>
                    <input type='password' placeholder='Password' required onChange={({ target }) => setNewPassword(target.value)} value={newPassword}/>
                </div>
                <div>
                    <input type='number' placeholder='Accesslevel id' required onChange={({ target }) => setNewAccesslevelId(target.value)} value={newAccesslevelId}/>
                </div>

                <div>
                    <input type='submit' value='save' />
                    <input type='button' value='back' onClick={() => setMuokkausTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default UserEdit;
