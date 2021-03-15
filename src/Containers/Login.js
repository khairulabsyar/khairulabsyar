import React, {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { usernameChecker, passwordChecker } from '../Utils/checker'

const Login = ({toggleLoginSignUp, toggleModal, setLogInProcess}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) =>{
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
              username: username,
              password: password
            }
          })
          .then(response => {
            //console.log(response)  //Try add .data.message
            localStorage.setItem('jwt', response.data.auth_token);
            setLogInProcess(false);
            history.push("/users/profile")
            toast.success( "Successfully Logged In", {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
          })
          .catch(error => {
            console.error(error.response) // Try add .data.message
        });
        e.preventDefault();
        toggleModal();
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

    const checkInputs = () =>{
		const u = usernameChecker(username)
		const p = passwordChecker(password)
		if (username.length && !u) {
			toastInputCheck("Username must be in between 8 to 20 characters")
		}
		if (password.length && !p) {
			toastInputCheck("Password must be in between 8 to 50 characters")
		}
		if (u && p ) {
			return false
		}
		return true
    } 

    toast.dismiss();
    
    return(
        <>
            <h2>Log In</h2>
            <hr/>
            <label>
                Username:
                <input placeholder="Enter Your Username" type="text" value={username} onChange={(e) =>{setUsername(e.target.value)}}></input>
            </label>
            <div></div>
            <label>
                Password:
                <input placeholder="Enter Your Password" type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}}></input>
            </label>
            <div></div>
            <button onClick={handleSubmit} disabled={checkInputs()}> Log In </button> {/*checkInput(), () is need in order for it to execite even before adding anything into the input */}
            <div>
                New Member? 
                <a href="#" onClick={toggleLoginSignUp} style={{textDecoration: 'none'}}> Sign Up</a>
            </div>
        </>
    )
}
export default Login;