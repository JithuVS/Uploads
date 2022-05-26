import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import logo from "../upload.png";
import { ToastContainer, toast } from "react-toastify";
import axios from '../axios/axios.js';


function Upload() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const upLoad = async (e) => {
    if(file){
      const formData = new FormData();
      formData.append("fileName", file);
      try {
        const res = await axios.post(
          "/upload",
          formData
        );
        toast.info("image uploaded!", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error(error, {
          position: "bottom-right",
        });
      }
    }
    else{
      toast.error("Please select an image to upload", {
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      <button className="logout" onClick={logOut}>Log Out</button>
      <div className="private">
        <input type="file" onChange={saveFile} name="fileName"></input>
        <img style={{cursor: "pointer"}} src={logo} alt="Logo" onClick={upLoad}/>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Upload;
