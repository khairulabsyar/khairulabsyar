import React, {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { usernameChecker, emailChecker, passwordChecker } from '../Utils/checker'

export default ({toggleLoginSignUp, toggleModal, setLogInProcess}) =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) =>{
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
              username: username,
              email: email,
              password: password
            }
          })
          .then(response => {
            console.log(response) // Try add .data.message
            console.log("Sign Up: " + response.data.status)
            localStorage.setItem('jwt', response.data.auth_token);
            setLogInProcess(false);
            history.push("/users/profile")
          })
          .catch(error => {
            console.error(error.response) // Try add .data.message
            console.error("Sign Up: " + error.response.data.status)
        });
        e.preventDefault();
        toggleModal();
    };

    const checkUsername = newUsername =>{
        clearTimeout(delay);
        if(newUsername.trim().length === 0){
            setUsernameValid(false)
        }else{
            const newDelay = setTimeout(() =>{
                axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)
                .then(response => {
                    console.log(response.data);
                    setUsernameValid(response.data.exists)
                })
            },500)
            setDelay(newDelay)
        }
    };
    
    const toastInputCheck = (msg) => {
		toast.warn(msg, {
			autoClose: true,
			closeButton: false,
			closeOnClick: true,
            pauseOnHover: false,
            delay: 2500,
		})
	}

	const checkInputs = () => {
		const u = usernameChecker(username)
		const e = emailChecker(email)
		const p = passwordChecker(password)
		if (username.length && !u) {
			toastInputCheck("Username must be in between 8 to 20 characters")
		}
		if (email.length && !e) {
			toastInputCheck("Email format is not correct")
		}
		if (password.length && !p) {
			toastInputCheck("Password must be in between 8 to 50 characters")
		}
		if (usernameValid && username.length >= 8) {
			toastInputCheck("Username already exists")
		}
		if (u && e && p && !usernameValid) {
			return false
		}
		return true
	}


    toast.dismiss();

    return(
        <>
            <h2>Sign Up</h2>
            <hr/>
            <label>
                Username:
                <input placeholder="Enter Your Username" value={username} onChange={(e) =>{
                    setUsername(e.target.value) 
                    checkUsername(e.target.value) 
                }}/>
            </label>
            <div></div>
            <label>
                Email:
                <input placeholder="Enter Your email" value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
            </label>
            <div></div>
            <label>
                Password:
                <input placeholder="Enter Your Password" type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
            </label>
            <div></div>
            <button onClick={handleSubmit} disabled={checkInputs()}> Sign Up </button>
            <div>
                Already a member? 
                <a href="#" onClick={toggleLoginSignUp} style={{textDecoration: 'none'}}> Log In</a>
            </div>
        </>
    );
};