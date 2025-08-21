import React, { useState } from 'react';
import AuthService from './services/AuthService';
import md5 from 'md5';

//props suoraan nimellä eikä props.huomio
const Login = ({ setAccessLevel, setLoggedInUser, setIsPositive, setMessage, setShowMessage }) => {

    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        var userForAuth = {
            username: newUserName,
            password: md5(newPassword),
        };
        
        
        AuthService.authenticate(userForAuth)
        .then(response => {
                if (response.status == 200) {
                    localStorage.setItem('username',response.data.username);
                    localStorage.setItem('accesslevelId',response.data.accessLevelId);
                    localStorage.setItem('token',response.data.token);
                    
                    setAccessLevel(response.data.accessLevelId);
                    setLoggedInUser(response.data.username);

                    console.log("login succcess, data:" + response);

                    setIsPositive(true);
                    setMessage("User authenticated successfully: " + newUserName);
                    setShowMessage(true);
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
            })
    }

    const emptyFields = () => {
        setNewPassword('');
        setNewUserName('');
    }

    return (
        <div id='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Username' required onChange={({ target }) => setNewUserName(target.value)} />
                
                    <input type='password' placeholder='Password' required onChange={({ target }) => setNewPassword(target.value)} />

                
                    <input type='submit' value='Login' />
                    <input type='button' onClick={()=>emptyFields()} value='Empty' />
                </div>

            </form>
        </div>

    );
}

export default Login;
