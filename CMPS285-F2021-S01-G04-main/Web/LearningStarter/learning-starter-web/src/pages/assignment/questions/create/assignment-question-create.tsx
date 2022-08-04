import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../../constants/base-url";
import { ApiResponse, AssignmentQuestionCreateDto, AssignmentQuestionGetDto } from "../../../../constants/types";
import { routes } from "../../../../routes/config";

type MakeQuestion = AssignmentQuestionCreateDto;
type MakeQuestionResponse = ApiResponse<AssignmentQuestionGetDto>;
type FormValues = MakeQuestion;


export const AssignmentQuestionCreatePage = () => {

    let {id} = useParams<{ id: string }>();
    const assignid = Number(id);

    const history = useHistory();

    const initialValues = useMemo<FormValues>(() => ({
        questionText: "",
        assignmentId: assignid
    }),[])
    
    const [, submitCreate] = useAsyncFn( async(values: FormValues) => {
        if (baseUrl === undefined){
            return;
        }

        values.questionText = String(values.questionText);
        console.log(values);

        const createdQuestion = await axios
        .post<MakeQuestionResponse>(`${baseUrl}/api/assignmentquestions/create`, values)
        .then((response) => {
            if(response.data.hasErrors){
                response.data.errors.forEach((err) =>{
                    alert(`${err.property},${err.message}`);
                    console.error(`${err.property},${err.message}`);
                });
            }
            console.log("Quesion successfully created.");

            history.push(routes.assignmentpage.replace(':id',`${id}`));
        })
        .catch(({response}:AxiosError<any>) => {
            if(response?.data.hasErrors){
                alert(JSON.stringify(response.data.errors));
            }
            else{
                alert("Something went wrong.");
            }
        });
        return createdQuestion
    },[]);

    
    return (
        <div  className="form-container">
            <h1> Add a question: </h1>

            <div>
                <Formik initialValues={initialValues} onSubmit={submitCreate}>
                    <Form>
                        <div>
                            <label className="button-box"> Question Text </label>
                        </div>
                            <Field id="questionText" name="questionText" /> 
                            <br />
                        <div>
                            <Button className="button-box" type="submit"> Create </Button>
                            <Button className="button-box" onClick={() => history.push(routes.assignmentpage.replace(':id',`${id}`))}> Cancel </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}