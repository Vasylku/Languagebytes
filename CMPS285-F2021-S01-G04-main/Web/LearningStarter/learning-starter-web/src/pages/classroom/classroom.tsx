import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClassroomGetDto } from "../../constants/types";
import "./classroom.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const Classroom = () => {

    const [classrooms, setClassrooms] = useState<ClassroomGetDto>();

    console.log(classrooms)

    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        submitId();
    }, []);

    const submitId = async () => {
        await axios
            .get(`${baseUrl}/api/classrooms/${id}`)
            .then((response) => {
                if (response.data.hasErrors) {
                    response.data.errors.forEach((err) => {
                        console.error(`${err.property}: ${err.message}`);
                    });
                }
                setClassrooms(response.data.data);
            });
    }
    
    return (
        <div className="classroom">
            <div className="card-classroom-head">
                <h1>{classrooms?.name}</h1>
                <h4>{classrooms?.semester}</h4>
            </div>
            <div className="separator-line" />
            <div className="class-col-cards">
                <div className="card-student">
                    {classrooms &&
                        classrooms.userDtos.map(user => {
                            return (
                                <div className="cl-users-wrap">
                                    <h4> {`Student : ${user?.firstName} ${user?.lastName}`}</h4>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}