import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { Navbar } from 'reactstrap';
import Modal from "./Modal"

const Top = () => {
  const [logInProcess, setLogInProcess] = useState(true);
  let history = useHistory();

  return (
    <>
    <div>
      <Navbar color="dark" light expand="md">
        <Link to="/">Home</Link>
        <span> </span>
        <Link to="/users/profile">User Profile</Link>
        <span> </span>
        <Link to="/users/1">Friend's Profile</Link>
        <span> </span>
        <span> </span>
        <Link to="/upload">Upload</Link>
        <span> </span>
        {
        logInProcess && localStorage.getItem('jwt') === null? 
        <Modal setLogInProcess={setLogInProcess}/>
        :
        <button onClick={()=>{
          setLogInProcess(true);
          localStorage.removeItem('jwt');
          history.push("/");
          console.log(logInProcess);
          console.log( localStorage.removeItem('jwt'))
        }}>Log Out</button>
        }
      </Navbar>
    </div>
  </>
  );
}

export default Top;
