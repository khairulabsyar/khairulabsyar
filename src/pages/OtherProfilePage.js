import axios from "axios";
import React , {useState, useEffect} from "react";
import {useParams,} from "react-router-dom";
import LoadingIndicator from "../Utils/LoadingIndicator";
import UserImages from "../Components/userImages";
import { useHistory } from "react-router-dom";

const OtherProfilePage = () =>{
    let {id} = useParams();
    const [user, updateUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
	
    if (!localStorage.getItem("jwt")) {
		history.push("/")
	}

    useEffect(() =>
    axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
    .then (result =>{
        updateUsers(result.data);
        setIsLoading(false);
    }).catch(error =>{
        console.log("Error: ", error)
    })
    ,[user]);

    if (isLoading){
        return <LoadingIndicator width="500px" height="500px" color="blue"/>
     }
    
    return(
        <>
            <img src={user.profileImage} height="100px" width="100px"/>
            <h1> User Profile page : {id}</h1>
            <h1> Username : {user.username}</h1>
            <h2> </h2>
            <div>
                <UserImages userId={id}/>
            </div>
        </>
    );
};

export default OtherProfilePage;