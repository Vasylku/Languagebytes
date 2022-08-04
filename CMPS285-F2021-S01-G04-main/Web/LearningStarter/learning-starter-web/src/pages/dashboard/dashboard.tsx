
import React, { useEffect, useState } from "react";
import '../../App.css';
import { Avatar } from "../../components/avatar-card/avatar-card";
import {DashMenu} from "../../components/dash-menu/dash-menu";
import './dashboard.css';
import "../../components/class-card/class-card.css"
import axios from "axios";
import { useUser } from "../../authentication/use-auth";
import { useRafState } from "react-use";
import { ApiResponse, Classroom, EnrollmentGetDto, User, UserGetDto } from "../../constants/types";
import { routes } from "../../routes/config";
import { useHistory } from "react-router";


const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const Dashboard = () => {

     const user = useUser();
     const [users, setUsers] = useState<UserGetDto>();
     const history = useHistory();
     const[enroll, setEnroll]=useState<ApiResponse<EnrollmentGetDto[]>>();
     console.log(users);

useEffect(() => {

  submitUser();

}, []);

const submitUser = async () => {

  await  axios
        .get(`${baseUrl}/Users/${user.id}`)
        .then((response) => {
            if (response.data.hasErrors) {
                response.data.errors.forEach((err: { property: any; message: any; }) => {
                    console.error(`${err.property}: ${err.message}`);
                });
            }
            setUsers(response.data.data);
            
        });  
} 

const getEnrollment = async () => {
 
  await axios
  .get<ApiResponse<EnrollmentGetDto[]>>(`${baseUrl}/api/enrollment/get-all`)
  .then((response) => {
    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.error(` ${err.message}`);
      });
    }
    setEnroll(response.data);
  });
}

useEffect(()=>{
  getEnrollment();

}, []);

  return (
 <div className="dashboard">
    <Avatar />
      <DashMenu />
       <div className="dash-user-class">
         {users &&
                  users.classroomGetDtos.map(classroom => { 
           return(
                  <div className="dash-class-container">
                           <h3>Class {classroom?.name}</h3>
                           <h5>{classroom?.semester}</h5>
                         {/* {enroll&&enroll.data.map((y:EnrollmentGetDto)=>{return( )})}*/}
                        <button className="btn-classroom-dash" onClick={() => history.push(routes.classroom.replace(`:id`, `${classroom?.id}`))}>View</button>
                  </div>
               )})}
         </div>   
    </div>
  );
};

