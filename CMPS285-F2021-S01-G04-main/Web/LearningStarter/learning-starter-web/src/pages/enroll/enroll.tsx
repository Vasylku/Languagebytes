import axios from "axios";
import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../authentication/use-auth";
import { routes } from "../../routes/config";
import "./enroll.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const Enroll = () => {
  const [er, setEr] = useState("");
  let { id } = useParams<any>();
  const user = useUser();

  const initialValues = useMemo(
    () => ({

      classroomId: Number(id),
      userId: user.id,
    }),
    []
  );

  const history = useHistory();

  const enroll = () => {
    console.log("Values: ", initialValues);
    axios
      .post(`${baseUrl}/api/enrollment`, initialValues)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err: { message: any; property: any; }) => {
            console.error(`${err.message}`, `${err.property}`);
          });
          return;
        }
        history.push(routes.dashboard);
      })
      .catch(({ response, ...rest }) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err: { message: any; }) => {
            console.log(err.message);
          });
          setEr(response?.data.errors[0].message);
        }

      });

  };

  return (
    <div className="enroll-container">
      <div className="popup-container" >
        <div className="popup-content">
          {er ?
            <p className="error-msg"> {er} </p> : null}
          <h1>Enroll in Classroom  </h1>
          <p>Are you sure you want to enroll?</p>
          <div className="btn-wrap-row" >
            <button className="enroll-cancel-btn" onClick={() => history.push(routes.enrollment)}>Cancel</button>

            <button className="btn-enroll-student" onClick={enroll}>Enroll</button>
            </div> 
          </div>
      </div>
  </div>
  )
}