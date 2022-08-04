import axios, { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Particles, { ISourceOptions } from 'react-tsparticles';
import { Button} from 'semantic-ui-react';
import { logoutUser } from '../../authentication/authentication-services';
import configParticles from '../../components/particles/configParticles';
import { ApiResponse, UserCreateDto } from '../../constants/types';
import "../login-page/auth.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type CreateRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;

  classroomIds: [
    0
  ],
  enrollmentCreateDtos: [
    {
      userId: 0,
      classroomId: 0
    }
  ],
  role: {
    roleName: "",
    userIds: [
      0
    ]
  }
}

type CreateResponse = ApiResponse<UserCreateDto>;

type FormValues = CreateRequest;

export const Register = () => {
const[msg, setMsg] =useState("");
  const initialValues = useMemo<FormValues>(
    () => ({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",

      classroomIds: [
        0
      ],
      enrollmentCreateDtos: [
        {
          userId: 0,
          classroomId: 0
        }
      ],
      role: {
        roleName: "",
        userIds: [
          0
        ]
      }
    
  
  }),
  []
);
  const submitForm = (values: CreateRequest) => {
    if (baseUrl === undefined) {
      return;
    }

    values.firstName = String(values.firstName);
    values.lastName = String(values.lastName);
    values.userName = String(values.userName);
    values.password = String(values.password);
    axios
      .post<CreateResponse>(`${baseUrl}/Users`,values)
      .then((response) => {
        if (response.data.data) {
          setMsg("Successfully Created");
          logoutUser();
        }
      })
      .catch(({ response, ...rest }: AxiosError<CreateResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
         setMsg(response?.data.errors[0].message);
        
        }
        console.log(rest.toJSON());
      });
  };

  const history = useHistory();

  const redirect = () => {

    history.push('/login-page');
  }
  return (

    <div className="auth-page">
      <Particles options={configParticles as unknown as ISourceOptions} />
      {msg ?
        <p className="error-msg"> {msg} </p> : null}
      <div className="auth-container">
        <p> Ctreate Account</p>
        <Formik initialValues={initialValues} onSubmit={submitForm}>
          <Form>
            <div className="auth-form">
              <label htmlFor="firstName ">First name</label>
            </div>
            <Field className="field" id="firstName" name="firstName" />
            <div className="auth-form">
              <label htmlFor="lastName ">Last name</label>
            </div>
            <Field className="field" id="lastName" name="lastName" />
            <div className="auth-form">
              <label htmlFor="userName ">User name</label>
            </div>
            <Field className="field" id="userName" name="userName" />
            <div>
              <div className="auth-form">
                <label htmlFor="password">Password</label>
              </div>
              <Field className="field" type="password" id="password" name="password" />
            </div>
            <div className="auth-row">
              <Button className="auth-button" type="submit">
                Submit
              </Button>
              <Button className="auth-button" onClick={redirect} >
                Sign in
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}


