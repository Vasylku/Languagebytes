import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAsync, useAsyncFn } from "react-use";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentAnswerCreateDto, AssignmentAnswerGetDto, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";


type MakeAnswer = AssignmentAnswerCreateDto;
type MakeAnswerResponse = ApiResponse<AssignmentAnswerGetDto>;
type QuestionGetResponse = ApiResponse<AssignmentQuestionGetDto>;
type FormValues = MakeAnswer;

var assignId;

export const AssignmentAnswerCreatePage = () => {

    let {id} = useParams<{ id: string }>();
    const questId = Number(id);
    
    const history = useHistory();

    const [question, setQuestion] = useState<QuestionGetResponse>();


    useEffect(() => {
        axios
        .get<QuestionGetResponse>(`${baseUrl}/api/assignmentquestions/${questId}`)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                    console.log(`${err.property},${err.message}`);
                })
            }
            console.log(response.data);
            setQuestion(response.data);
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
    },[]);

    assignId = question?.data.assignmentId;

    const initialValues = useMemo<FormValues>(() => ({
        answerText: "",
        isCorrect: false,
        assignmentQuestionId: questId
    }),[]);

    
    const [, submitCreate] = useAsyncFn( async(values: FormValues) => {
        if(baseUrl === undefined){
            return;
        }

        values.answerText = String(values.answerText);
        values.assignmentQuestionId = Number(values.assignmentQuestionId);
        values.isCorrect = Boolean(values.isCorrect);
        console.log(values);

        const createdAnswer = await axios
        .post<MakeAnswerResponse>(`${baseUrl}/api/assignmentanswers/create`,values)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    alert(`${err.property},${err.message}`);
                    console.log(`${err.property},${err.message}`);
                });
            }
            console.log("Answer successfully created.");
            console.log(assignId);

            history.push(routes.assignmentpage.replace(':id',`${assignId}`));
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
                alert(JSON.stringify(response.data.errors));
            }
            else{
                alert("Something went wrong.");
            }
        });
        return createdAnswer;
    })
    

    return (
        <div  className="form-container">
            <h1>Add an answer:</h1>
            <br/>
            <div>
            <Formik initialValues={initialValues} onSubmit={submitCreate}>
                <Form>
                    <label>Answer Text</label>
                    <Field id="answerText" name="answerText" />
                    <br/>
                    <label>Correct</label>
                    <Field id="isCorrect" name="isCorrect" />
                    <br/>
                    <div>
                    <Button type="submit"> Create </Button>
                    <Button onClick={() => history.push(routes.assignmentpage.replace(':id',`${assignId}`))}> Cancel </Button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    )
}