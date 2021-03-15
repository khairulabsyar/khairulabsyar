import axios from "axios";
import React , {useState, useEffect} from "react";
import LoadingIndicator from "../Utils/LoadingIndicator";
import UserImages from "../Components/userImages";
import { useHistory } from "react-router-dom";

const UserProfilePage = () =>{
    const [user, updateUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

	if (!localStorage.getItem("jwt")) {
		history.push("/")
	};
    
    useEffect(() =>
    axios.get("https://insta.nextacademy.com/api/v1/users/me", {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        }
    })
    .then (result =>{
        updateUsers(result.data);
        setIsLoading(false);
    }).catch(error =>{
        console.log("Error: ", error)
    })
    ,[]);

    if (isLoading){
        return <LoadingIndicator width="500px" height="500px" color="blue"/>
     }
    
    return(
        <>
            <img src={user.profile_picture} height="100px" width="100px" alt=""/>
            <h3> User Profile page : {user.id}</h3>
            <h2> Username : {user.username}</h2>
            <h2> </h2>
            <div>
                <UserImages userId={user.id}/>
            </div>
        </>
    );
};

export default UserProfilePage;