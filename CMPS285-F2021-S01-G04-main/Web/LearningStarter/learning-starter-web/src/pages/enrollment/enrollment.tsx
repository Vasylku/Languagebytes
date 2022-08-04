import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar } from "../../components/avatar-card/avatar-card";
import { ClassCard } from "../../components/class-card/class-card";
import { ClassroomCreate } from "../../components/classroom-create/classroom-create";
import { ApiResponse, ClassroomDto } from "../../constants/types";
import './enrollment.css';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const Enrollment=()=>{
    const [visible, setVisible] = useState(false);
    const btn = visible? "hide": "create";
    const [classes, setClasses] = useState<ApiResponse<ClassroomDto[]>>();
    const [refresh, setRefresh] = useState(+new Date())

    useEffect(() => {
        getClassroom();
      
      }, [refresh]);

      const getClassroom = async () => {
        await axios
          .get<ApiResponse<ClassroomDto[]>>(`${baseUrl}/api/classrooms/get-all`)
          .then((response) => {
            if (response.data.hasErrors) {
              response.data.errors.forEach((err) => {
                console.error(` ${err.message}`);//${err.property}:
              });
            }
            setClasses(response.data);
          });
      }

      const deleteClassroom = async (id) => {

        await axios.delete(`${baseUrl}/api/classrooms/${id}`);
        getClassroom();
    
      };
      
    
    return(
        <div className="enrollment-content">
            <Avatar/>
             {visible? <ClassroomCreate setRefresh={setRefresh}/> : null}
             <button onClick={()=> { setVisible(!visible)}}> {btn}</button>
             <div className="flex-card-direction"> 
             <ClassCard classes={classes} setClasses={setClasses} deleteClassroom={deleteClassroom}/>
             </div>
        </div>
    )
}