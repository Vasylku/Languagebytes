import "./auth.css";
import axios, { AxiosError } from "axios";
import React, { useMemo } from "react";
import { ApiResponse } from "../../constants/types";
import { Formik, Form, Field } from "formik";
import { Button } from "semantic-ui-react";
import { loginUser } from "../../authentication/authentication-services";
import Particles, { ISourceOptions } from "react-tsparticles";
import configParticles from "../../components/particles/configParticles";
import { useHistory } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type LoginRequest = {
  userName: string;
  password: string;
};

type LoginResponse = ApiResponse<boolean>;

type FormValues = LoginRequest;


export const LoginPage = () => {

  const initialValues = useMemo<FormValues>(
    () => ({

      password: "",
      userName: "",
    }),
    []
  );

  const submitLogin = (values: LoginRequest) => {

    axios
      .post<LoginResponse>(`${baseUrl}/api/authenticate`, values)
      .then((response) => {
        if (response.data.data) {
          console.log("Successfully Logged In!");
          loginUser();
        }
      })
      .catch(({ response, ...rest }: AxiosError<LoginResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          alert(response?.data.errors[0].message);
        } else {
          alert(`There was an error logging in`);
        }

        console.log(rest.toJSON());
      });
  };
  const history = useHistory();

  return (

    <div className="auth-page">
      <Particles options={configParticles as unknown as ISourceOptions} id="particles" />
      <div className="auth-container">
        <p> Login</p>
        <Formik initialValues={initialValues} onSubmit={submitLogin}>
          <Form>
            <div>
              <div className="auth-form">
                <label htmlFor="userName ">User name</label>
              </div>
              <Field className="field" id="userName" name="userName" />
            </div>
            <div>
              <div className="auth-form">
                <label htmlFor="password">Password</label>
              </div>
              <Field className="field" type="password" id="password" name="password" />
            </div>

            <Button className="auth-button" type="submit" style={{ float: "left" }}>
              Login
            </Button>
            <Button className="auth-button" type='redirect' onClick={() => { history.push('/register') }} style={{ float: "right" }}>
              Register
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};



