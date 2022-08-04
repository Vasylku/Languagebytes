import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentAnswerGetDto, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";



type AssignmentAnswerRequest = AssignmentAnswerGetDto;
type AssignmentAnswerResponse = ApiResponse<AssignmentAnswerRequest>;
type AssignmentQuestionRequest = AssignmentQuestionGetDto;
type AssignmentQuestionResponse = ApiResponse<AssignmentQuestionRequest>;


export const AssignmentAnswerDeletePage = () => {

    let {id} = useParams<{ id: string }>();
    var questId;
    const [assignId, setId] = useState<Number>();

    const [answer, setAnswer] = useState<AssignmentAnswerResponse>();
    const [assignmentquestion, setQuestions] = useState<AssignmentQuestionResponse>();
    const history = useHistory();

    useEffect(() => {
        axios
        .get<AssignmentAnswerResponse>(`${baseUrl}/api/assignmentanswers/${id}`)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                    console.log(`${err.property},${err.message}`);
                })
            }
            setAnswer(response.data);
            questId = response.data.data.assignmentQuestionId;

            {axios
                .get<AssignmentQuestionResponse>(`${baseUrl}/api/assignmentquestions/${questId}`)
                .then((response) => {
                    if(response?.data.hasErrors){
                        response.data.errors.forEach((err) => {
                            alert(`${err.property},${err.message}`);
                        })
                    }
                    setQuestions(response.data);
                    setId(response.data.data.assignmentId);
                })
                .catch(({response}:AxiosError<any>) => {
                    if(response?.data.hasErrors){
                    alert(JSON.stringify(response?.data.errors));
                    } else {
                        alert("Something went wrong");
                    }
                });}

        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
            alert(JSON.stringify(response?.data.errors));
            } else {
                alert("Something went wrong.");
            }
        });
    },[]);

    const answerToShow = answer?.data;


    const deleteAnswer = () => {
        axios
        .delete(`${baseUrl}/api/assignmentanswers/${id}`)
        .then((response) => {
            if(response?.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                })
            }
            history.push(routes.assignmentpage.replace(':id',`${assignId}`))
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
            alert(JSON.stringify(response?.data.errors));
            } else {
                alert("Something went wrong.");
            }
        });
    }

    var correctness;
    if(answerToShow?.isCorrect){
    correctness="Correct";
    }
    else{
    correctness="Incorrect";
    }

    return (
        <div>
            <h1> Are you sure you want to delete this answer? </h1>
            <br/>
            <div className="answ-info-wrap">
                <div className="text-adjust">
                    {`${answerToShow?.answerText}`}
                    <br/>
                    <div className="correctness-box">
                    {`${correctness}`}
                    </div>
                </div>
            </div>
            <Button onClick={() => deleteAnswer()}> Confirm </Button>
            <Button onClick={() => history.push(routes.assignmentpage.replace(':id',`${assignId}`))}> Cancel </Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}