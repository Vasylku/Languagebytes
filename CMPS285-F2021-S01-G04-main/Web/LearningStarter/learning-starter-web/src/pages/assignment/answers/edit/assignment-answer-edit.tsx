import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentAnswerEditDto, AssignmentAnswerGetDto, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";


type QuestionGetResponse = ApiResponse<AssignmentQuestionGetDto>;


type AnswerGetRequest = AssignmentAnswerGetDto;
type AnswerGetResponse = ApiResponse<AnswerGetRequest>;

type AnswerEditRequest = AssignmentAnswerEditDto;
type AnswerEditResponse = ApiResponse<AnswerEditRequest>;

type GetFormValues = AnswerGetRequest
type EditFormValues = AnswerEditRequest;

var assignmentId;


export const AssignmentAnswerEditPage = () => {

    let {id} = useParams<{ id: string }>();
    const history = useHistory();

    const[question, setQuestion] = useState<QuestionGetResponse>();
    const[answer, setAnswer] = useState<AnswerGetResponse>();
    const[editedAnswer, setEditedAnswer] = useState<AnswerEditResponse>();

    const[assignId, setId] = useState<Number>();


    useEffect(() => {

        axios
        .get<AnswerGetResponse>(`${baseUrl}/api/assignmentanswers/${id}`)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    console.log(`${err.property},${err.message}`);
                })
            }
            setAnswer(response.data);
            var questId = response.data.data.assignmentQuestionId;

                {
                    axios
                    .get<QuestionGetResponse>(`${baseUrl}/api/assignmentquestions/${questId}`)
                    .then((response) => {
                        if(response.data.hasErrors){
                        response.data.errors.forEach((err) => {
                            console.log(`${err.property},${err.message}`);
                            })
                        }
                        setQuestion(response.data);
                        setId(response.data.data.assignmentId);
                    })
                    .catch((e) => {
                        console.log(e);
                        return null;
                    })
                }

        })
        .catch((e) => {
            console.log(e);
            return null;
        });

    },[]);


    const initialValues = useMemo<EditFormValues>(() => ({
        answerText: "",
        isCorrect: false
    }),[]);

    assignmentId = assignId;


    const [, submitEdit] = useAsyncFn( async(values:EditFormValues) => {
        if(baseUrl === undefined){
            return;
        }

        values.answerText = String(values.answerText);
        values.isCorrect = Boolean(values.isCorrect);
        console.log(values);


        await axios
        .put<AnswerGetResponse>(`${baseUrl}/api/assignmentanswers/${id}`,values)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) =>{
                    alert(`${err.property},${err.message}`);
                    console.log(`${err.property},${err.message}`);
                });
            }
            setEditedAnswer(response.data);
            history.push(routes.assignmentpage.replace(':id',`${assignmentId}`))
        })
        .catch((e) => {
            console.log(e);
            return null;
        });

    });
    

    return(
        <div className="form-container">
            <h1> Edit Answer </h1>
            <br/>
            <div>
                <Formik initialValues={initialValues} onSubmit={submitEdit}>
                    <Form>
                        <label>Answer Text</label>
                        <br/>
                        <Field id="answerText" name="answerText" placeholder={answer?.data.answerText} />
                        <br/>
                        <label>Correct</label>
                        <br/>
                        <Field id="isCorrect" name="isCorrect" />
                        <br/>
                        <div>
                        <Button type="submit"> Confirm </Button>
                        <Button onClick={() => history.push(routes.assignmentpage.replace(':id',`${assignmentId}`))}> Cancel </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}