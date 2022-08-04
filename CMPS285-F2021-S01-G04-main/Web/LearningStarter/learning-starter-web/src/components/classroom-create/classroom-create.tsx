import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import { ApiResponse, ClassroomCreateDto } from "../../constants/types";
import { routes } from "../../routes/config";
import { ClassCard } from "../class-card/class-card";
import "../classroom-create/classroom-create.css";


const baseUrl = process.env.REACT_APP_API_BASE_URL;

type CreateClassroomRequest = Omit<ClassroomCreateDto, "user">;

type CreateClassroomResponse = ApiResponse<ClassroomCreateDto>;

type FormValues = CreateClassroomRequest;

type ClassroomCreate = {setRefresh: React.Dispatch<React.SetStateAction<number>>}

export const ClassroomCreate:React.FC<ClassroomCreate> = ({setRefresh}) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const initialValues = useMemo<FormValues>(
    () => ({
      name: "",
      teacherId: 0,
      eslLevelId: 0,
      semester: "",
      startDate: new Date(),
      endDate: new Date(),
    }),
    []
  );

  const submitCreate = (values: CreateClassroomRequest) => {

    if (baseUrl === undefined) {
      return;
    }
    values.name = String(values.name);
    values.teacherId = Number(values.teacherId);
    values.eslLevelId = Number(values.eslLevelId);
    values.semester = String(values.semester);
    values.startDate = new Date(values.startDate);
    values.endDate = new Date(values.endDate);
    console.log("Values: ", values);

    axios
      .post<CreateClassroomResponse>(`${baseUrl}/api/classrooms`, values)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.message}`);
          });
          return;
        }
        setRefresh(+new Date())

        history.push(routes.enrollment);
          

      })
      .catch(({ response, ...rest }: AxiosError<CreateClassroomResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          setError(response?.data.errors[0].message);
        }
        console.log(rest.toJSON());
      });

  };

  return (
    <div className="classroom-content-form">
      {error ?
        <p className="error-msg"> {error} </p> : null}
      <div >
        <Formik initialValues={initialValues} onSubmit={submitCreate}>
          <Form className="create-class-form">
            <div>
              <div>
                <div className="field-label">
                  <label htmlFor="name">Name</label>
                </div>
                <Field className="field" id="semester" name="name" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="teacherId">Teacher</label>
                </div>
                <Field className="field" id="teacherId" name="teacherId" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="eslLevelId">Level</label>
                </div>
                <Field className="field" id="eslLevelId" name="eslLevelId" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="semester">Semester</label>
                </div>
                <Field className="field" id="semester" name="semester" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="startDate" >Start date</label>
                </div>
                <Field className="field" id="startDate" name="startDate" placeholder="MM/DD/YYYY" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="endDate" >End date</label>
                </div>

                <Field className="field" id="endDate" name="endDate" placeholder="MM/DD/YYYY" />
              </div>
              <div className="button-container-create-class">
                <Button className="create-button" type="submit">
                  Create
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

