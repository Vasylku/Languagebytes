import "./assignment-page.css"
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Divider, Segment } from "semantic-ui-react";
import { baseUrl } from "../../constants/base-url";
import { ApiResponse, AssignmentDetailDto, AssignmentGetDto, AssignmentQuestionDetailDto, AssignmentQuestionGetDto } from "../../constants/types";
import { routes } from "../../routes/config";

type AssignmentRequest = AssignmentDetailDto;
type AssignmentQuestionRequest = AssignmentQuestionDetailDto[];
type AssignmentGetResponse = ApiResponse<AssignmentRequest>;
type AssignmentQuestionGetResponse = ApiResponse<AssignmentQuestionRequest>;



export const AssignmentPage = () => {
    
    let {id} = useParams<{ id: string }>();

    const [assignments, setAssignments] = useState<AssignmentGetResponse>();
    const [assignmentquestions, setQuestions] = useState<AssignmentQuestionGetResponse>();

    const history = useHistory();

    useEffect(() => {
        axios
        .get<AssignmentGetResponse>(`${baseUrl}/api/assignments/detail`, { 
            params: {
                assignmentId: id
            }
        })
        .then((response) => {
            if(response?.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                })
            }
            setAssignments(response.data);
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
                alert(JSON.stringify(response.data.errors));
            }
            else{
                alert("Something went wrong.");
            }
        });

    },[]);

        const AssignmenttoShow = assignments?.data;
        console.log(assignments?.data);

        const QuestionstoShow = AssignmenttoShow?.assignmentQuestionDetailDtos;
        console.log(QuestionstoShow);

        
    if (AssignmenttoShow != null) {
    return (
    <div className="form-container">
            <h1 className="assignment-header">{`${AssignmenttoShow?.assignmentName}`}</h1>
        <div>
            <br />
            <h2 className = "question-header"> Questions: </h2>
            <br />

            <div>
            {AssignmenttoShow && AssignmenttoShow.assignmentQuestionDetailDtos?.map((x) => {
                return (
                
                <>  
                 <div className="quest-info-wrap">
                        <div className = "quest-text">
                        {`${x.questionText}`}
                        </div>
                        <div className="box-button">
                         <Button onClick={() => history.push(routes.assignmentquestioneditpage.replace(':id',`${x.id}`))}> Edit </Button>
                         <Button negative onClick={() => history.push(routes.assignmentquestiondeletepage.replace(':id',`${x.id}`))}> Delete </Button>
                    </div>
                    <div className="text-adjust">Answer(s):</div>
                    {x.assignmentAnswerGetDtos?.map((y) => {

                        var correctness;
                        if(y.isCorrect){
                            correctness="Correct";
                        }
                        else{
                            correctness="Incorrect";
                        }

                        return(
                         <>
                        <div className="answ-info-wrap">
                            <div className="text-adjust">
                                {`${y.answerText}`}
                             <br />
                             <div className="correctness-box">
                                {`${correctness}`}
                             </div>
                            </div>
                            <Button onClick={() => history.push(routes.assignmentanswereditpage.replace(':id',`${y.id}`))}> Edit </Button>
                            <Button onClick={() => history.push(routes.assignmentanswerdeletepage.replace(':id',`${y.id}`))}> Delete </Button> 
                        </div>
                         </>
                        )
                    })}
                    <Button onClick={() => history.push(routes.assignmentanswercreatepage.replace(':id',`${x.id}`))}> Add Answer </Button>
                 </div>
                    <br />
                </>
                )
            })}
            <Button onClick={() => history.push(routes.assignmentquestioncreatepage.replace(':id',`${id}`))}> Add Question </Button>
            </div>
            
        </div>
    </div>
    );
    }
    else {
        return(
            <div className="form-container"> Assignment not found </div>
        )
    }
}