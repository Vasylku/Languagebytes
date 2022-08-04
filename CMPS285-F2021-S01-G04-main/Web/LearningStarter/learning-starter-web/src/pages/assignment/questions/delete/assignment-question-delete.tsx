import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";

type AssignmentQuestionRequest = AssignmentQuestionGetDto;
type AssignmentQuestionResponse = ApiResponse<AssignmentQuestionRequest>;

export const AssignmentQuestionDeletePage = () => {
    let {id} = useParams<{ id: string }>();

    const [assignmentquestion, setQuestions] = useState<AssignmentQuestionResponse>();
    const history = useHistory();

    useEffect(() => {


        axios
        .get<AssignmentQuestionResponse>(`${baseUrl}/api/assignmentquestions/${id}`)
        .then((response) => {
            if(response?.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                })
            }
            setQuestions(response.data);
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
            alert(JSON.stringify(response?.data.errors));
            } else {
                alert("Something went wrong.");
            }
        });

    },[]);

    const questionToShow = assignmentquestion?.data;
    const assignmentId = assignmentquestion?.data.assignmentId;

    const deleteQuestion = () => {
        axios
        .delete(`${baseUrl}/api/assignmentquestions/${id}`)
        .then((response) => {
            if(response?.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                })
            }
            history.push(routes.assignmentpage.replace(':id',`${assignmentId}`))
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
            alert(JSON.stringify(response?.data.errors));
            } else {
                alert("Something went wrong.");
            }
        });
    }

    return(
        <div className="container"> 
             <h1>Are you sure you want to delete this question?</h1>
             <br/>
             <div>
             <div className = "quest-info-wrap">
                <div className="quest-text">
                 {questionToShow?.questionText}
                </div>
             </div>

             <div className="box-button">
             <Button onClick={() => deleteQuestion()}> Confirm </Button>
             <Button onClick={() => history.push(routes.assignmentpage.replace(':id',`${assignmentId}`))}> Cancel </Button>
             </div>
             </div>
        </div>
    )
}