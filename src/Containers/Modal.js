import {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default ({setLogInProcess}) =>{
    const[showModal,setModalState] = useState(false)
    const[showlogin,setLoginState] = useState(true)

    const toggleModal = () =>{
        if(showlogin !== true){
            setLoginState(!showlogin)
        }
        setModalState(!showModal)
    }

    const toggleLoginSignUp = () =>{
        setLoginState(!showlogin)
    }
    
    return (
    <>
        <button onClick={toggleModal}>Log In/Sign Up</button>
            {
                showModal ? 
                <div className="modal-container">
                    <div className="modal-content">
                       { showlogin ?
                        <Login 
                        toggleLoginSignUp={toggleLoginSignUp} 
                        toggleModal={toggleModal} 
                        setLogInProcess={setLogInProcess}/> 
                        :
                        <SignUp 
                        toggleLoginSignUp={toggleLoginSignUp} 
                        toggleModal={toggleModal}
                        setLogInProcess={setLogInProcess}/>}
                        <button onClick={toggleModal}>Close</button>
                    </div>
                    
                </div>:
                    undefined
            }
    </>
)}