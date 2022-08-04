import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentQuestionEditDto, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";


type QuestionEditRequest = AssignmentQuestionEditDto;
type QuestionGetRequest = AssignmentQuestionGetDto;
type QuestionEditResponse = ApiResponse<QuestionEditRequest>;
type QuestionGetResponse = ApiResponse<QuestionGetRequest>;
type EditFormValues = QuestionEditRequest;
type GetFormValues = QuestionGetRequest;


export const AssignmentQuestionEditPage = () => {

    let {id} = useParams<{ id: string}>();
    const history = useHistory();

    const [question, setQuestion] = useState<QuestionGetResponse>();
    const [editedQuestion, setEditQuestion] = useState<QuestionEditResponse>();


    useEffect(() => {
        axios
        .get<QuestionGetResponse>(`${baseUrl}/api/assignmentquestions/${id}`)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    console.log(`${err.property},${err.message}`);
                })
            }
            setQuestion(response.data);
        })
        .catch((e) => {
            console.log(e);
            return null;
        })
    },[]);

    const questText = question?.data.questionText;
    const assignId = question?.data.assignmentId;

    const initialValues = useMemo<EditFormValues>(() => ({
        questionText: ""
    }),[]);


    const [, submitEdit] = useAsyncFn( async(values:EditFormValues) => {
        if(baseUrl === undefined){
            return;
        }

        values.questionText = String(values.questionText);
        console.log(values);


        await axios
        .put<QuestionGetResponse>(`${baseUrl}/api/assignmentquestions/${id}`,values)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) =>{
                    alert(`${err.property},${err.message}`);
                    console.log(`${err.property},${err.message}`);
                });
            }
            setEditQuestion(response.data);
            history.push(routes.assignmentpage.replace(':id',`${response.data.data.assignmentId}`))
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
    }) 


    return (
        <div className="form-container">
           <h1>Edit Question</h1>
           <br />
           <div>
               <Formik initialValues={initialValues} onSubmit={submitEdit}>
                   <Form>
                       <div>
                       <label>Question Text</label>
                       </div>
                       <Field id="questionText" name="questionText" placeholder={questText}/>
                       <br />
                       <div>
                       <Button type="submit"> Submit </Button>
                       <Button onClick={() => history.push(routes.assignmentpage.replace(':id',`${assignId}`))}> Cancel </Button>
                        </div>
                   </Form>
               </Formik>
           </div>
        </div>
    )
}