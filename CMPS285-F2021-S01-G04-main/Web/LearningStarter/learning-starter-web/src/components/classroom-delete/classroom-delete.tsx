import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { routes } from "../../routes/config";
import "./classroom-delete.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const ClassroomDelete = (id) => {
   
   
   const history = useHistory();

    useEffect(() => {
       
       
  }, []);

  const deleteClassroom =  (id) => {
     axios.delete(`${baseUrl}/api/classrooms/${id}`);
    history.push(routes.enrollment);
  };

    
    return(


        <>
           <button className="class-delete"  onClick={()=>deleteClassroom(id)} >Delete</button>
        </>
        );
    }
//this btn is not implemented 