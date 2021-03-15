import React, {useState, useEffect}from "react";
import axios from "axios";
import LoadingIndicator from "../Utils/LoadingIndicator";
import UserImages from "./userImages.js";
import {Link} from "react-router-dom";

const HomePage = () =>{
    const [users, updateUsers]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios.get("https://insta.nextacademy.com/api/v1/users")
      .then(function (results) {
        updateUsers(results.data);
        setIsLoading(false);
      })
      .catch ( error => {
       console.log("ERROR: ", error) 
      })
    },[]);
    //console.log(users)

    if (isLoading){
        return <LoadingIndicator width="500px" height="500px" color="blue"/>
     };

    return (
        <div>
            {users.map(user =>{
                return(
                    <div>
                        <li>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </li>
                        <div></div>
                        <img key={user.id} src={user.profileImage} width="100px" height="100px" alt=""></img> 
                        <div>
                            <UserImages userId={user.id}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default HomePage;