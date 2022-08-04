import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ApiResponse, ClassroomCreateDto, ClassroomDto} from "../../constants/types";
import { routes } from "../../routes/config";
import '../classroom-edit/classroom-edit.css';
import "../classroom-create/classroom-create.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
type CreateClassroomEditRequest = Omit<ClassroomDto, "user">;

type CreateClassroomEditResponse = ApiResponse<ClassroomDto>;

type FormValues = CreateClassroomEditRequest;


export const  ClassroomEdit =()=> {
  const history = useHistory();
  let { id } = useParams<any>();
  const[error, setError] = useState("");
  const[name, setName] = useState(true)
  const btn = name? "Cancel": "Back";
  const initialValues = useMemo<FormValues>(
    () => ({
      id: id,
      name: "",
      teacherId: 0,
      eslLevelId: 0,
      semester: "",
      startDate: new Date(),
      endDate: new Date()
    }),
    []
  );

  const submitEdit = (values: CreateClassroomEditRequest) => {
   
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
      .put<CreateClassroomEditResponse>(`${baseUrl}/api/classrooms/${id}`, values)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
          return;
        } 
     getClass();
     setName(false);  

      })
      .catch(({ response, ...rest }: AxiosError<CreateClassroomEditResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          setError(response?.data.errors[0].message);
        } 
      
      });

  };
  const [classes, setClasses] = useState<ApiResponse<ClassroomDto>>();

  useEffect(() => {
    getClass();

    }, []);


 const getClass = async () =>{
  await  axios
      .get<ApiResponse<ClassroomDto>>(`${baseUrl}/api/classrooms/${id}`)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
        }
        setClasses(response.data);
        
      });
  }
  
  const classesToShow = classes?.data;
  return (
    <div className="edit-content">
      <div className="edit-check-card">
         <div className="check-card-text-wrap">
                <h3>Classroom Name</h3>
                <h4>{classesToShow?.name}</h4>
                <h3>Semester </h3>
                <h4>{classesToShow?.semester}</h4>
                <h3> Start Date </h3>
                <h4>{moment(classesToShow?.startDate).format('MM/DD/YYYY')}</h4>
                <h3> End Date </h3>
                <h4>{moment(classesToShow?.endDate).format('MM/DD/YYYY')}</h4>
         </div>
      </div>
    <div className="classroom-content-form-edit">
      <div>
        <Formik initialValues={initialValues} onSubmit={submitEdit}>
          <Form className="create-classroom-form">
            <div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="name">Name</label>
                </div>
                <Field className="field" id="semester" name="name" />
              </div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="teacherId">Teacher</label>
                </div>
                <Field className="field" id="teacherId" name="teacherId" />
              </div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="eslLevelId">Level</label>
                </div>
                <Field className="field" id="eslLevelId" name="eslLevelId" />
              </div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="semester">Semester</label>
                </div>
                <Field className="field" id="semester" name="semester" />
              </div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="startDate">Start date</label>
                </div>
                <Field className="field" id="startDate" name="startDate" placeholder="MM/DD/YYYY" />
              </div>
              <div>
                <div className="field-label-edit">
                  <label htmlFor="endDate">End date</label>
                </div>

                <Field className="field" id="endDate" name="endDate" placeholder="MM/DD/YYYY" />
              </div>
             <div className="btn-edit-wrap">
                <Button className="btn-class-edits" type="submit">
                  Edit
                </Button>
                <Button className="btn-cancel-edit" onClick={()=>history.push(routes.enrollment)}>
                {btn}
                </Button>
               {/*  <button className="btn-back" onClick={()=>history.push(routes.enrollment)}>Back</button> */}
            </div>
            {error ?
            <p className="error-msg"> {error} </p> : null}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
  );
}

