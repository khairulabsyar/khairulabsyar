import React, {useState} from "react";
import {Form, FormGroup, Input, FormText, Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UploadPage = () =>{
    //const [imageValuePath, setImageValuePath] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState("");

    const history = useHistory();

    if (!localStorage.getItem("jwt")) {
		history.push("/")
	}

  const handleSubmitFile = (e =>{
    e.preventDefault();
    let JWT = localStorage.getItem("jwt");
    let formData = new FormData();
    
    formData.append("image", imageFile);

    axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
      headers: { Authorization : "Bearer " + JWT}
    })
    .then(response =>{
      if (response.data.success){
        setMessage("Image Uploaded Successfully")
        setPreviewImage(null)
        setImageFile(null)
      }
    })
    .catch(error =>{
      console.log("Error: ", error)
    });
  });

  const handleInputFile = ((e) =>{
    //console.log(e);
    //setImageValuePath(e.target.value);
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    return(
      <div></div>
    )
  });

  //console.log(imageValuePath)
  console.log(imageFile)
  console.log(previewImage)

  return (
  <>
      <Form onSubmit={handleSubmitFile}>
          <FormGroup>
            <Input
              type="file"
              name="image-file"
              multiple="false"
              //value={imageValuePath}
              files={imageFile}
              onChange={handleInputFile}
            />
            <FormText color="muted">
              <div>Make sure the image being uploaded is a supported format.</div>
            </FormText>
          </FormGroup>
          <Button type="submit" color="primary">
            Upload
          </Button>
        </Form>
      <div className="card">
      {previewImage ? 
      (
        <img
        src ={previewImage}
        width ="50%"
        height="50%"
        />
      ) : (
        <h3 className="text-center">
          {message ? message : "Live Preview"}
        </h3>
      )}
      </div>
  </>
  )
}

export default UploadPage;