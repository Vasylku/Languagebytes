import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Button } from "semantic-ui-react";
import { baseUrl } from "../../../constants/base-url";
import { ApiResponse, AssignmentCreateDto, AssignmentDto } from "../../../constants/types";
import { routes } from "../../../routes/config";
import './assignment.css';


type MakeAssignment = AssignmentCreateDto;
type AssignmentResponse = ApiResponse<AssignmentDto>;
type FormValues = MakeAssignment;


export const Assignment = () => {
  const DefaultDate = new Date("9999-9-9");

  const history = useHistory();

  const initialValues = useMemo<FormValues>( () => ({
    assignmentName: "",
    dueDate: DefaultDate
  }),
  []
  );

  const [, submitCreate] = useAsyncFn(async (values: MakeAssignment) => {
    if(baseUrl === undefined){
      return;
    }

    values.assignmentName = String(values.assignmentName);
    console.log("Values: ", values);


    const createdAssignment = await axios
    .post<AssignmentResponse>(`${baseUrl}/api/assignments/create`,values)
    .then((response) => {
      if(response.data.hasErrors){
        response.data.errors.forEach((err) => {
          console.error(`${err.property}: ${err.message}`);
          alert(`${err.property}: ${err.message}`);
        });
      }
      console.log("Successfully Created Assignment");
      history.push(routes.assignmentpage.replace(':id',`${response.data.data.id}`));
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
    return createdAssignment;
  },[]);


  return (

    <div className="form-assignment">

      <p> Create Assignment</p>
      <div>
      <Formik initialValues={initialValues} onSubmit = {submitCreate}>
        <Form>
          <div>
          <label  > Assignment Name  </label></div>
            <Field id="assignmentName" name="assignmentName" />
        <div>
            <label>Due Date</label>  </div>
              <Field id="dueDate" name="dueDate" />
    
        <div >
          <Button className="button" type="submit">Submit</Button>
        </div>
        </Form>
        </Formik>
      </div>

    </div>
  );
};

