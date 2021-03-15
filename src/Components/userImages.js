import React, {useState,useEffect} from "react";
import axios from "axios";
import LoadingIndicator from "../Utils/LoadingIndicator";

const UserImages = ({userId}) =>{
    const [images, updateImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
    .then(result =>{
        //console.log(result)
        updateImages(result.data);
        setIsLoading(false);
    }).catch(error =>{
        console.log("Error: ", error)
    }),[]);
    
    if (isLoading){
        return <LoadingIndicator width="500px" height="500px" color="blue"/>
     }

    if(images.length === 0){
        return(
        <div>No images uploaded by User</div>
        ) 
    }else{
        return(
            <div>
                {images.map(eachImg =>{
                    return(
                        <img src={eachImg.url} width="100px" width="100px" alt="No image uploaded"/>
                    )
                })}
            </div>
        )     
    }

};

export default UserImages;