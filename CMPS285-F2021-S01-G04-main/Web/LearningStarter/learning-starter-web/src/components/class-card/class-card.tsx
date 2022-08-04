import axios from "axios";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { ApiResponse, ClassroomDto, ClassroomEditDto } from "../../constants/types";
import moment from "moment";
import { routes } from "../../routes/config";
import { useHistory } from "react-router";



type ClassCard = {
  classes?: ApiResponse<ClassroomDto[]>,
  setClasses?: React.Dispatch<SetStateAction<ApiResponse<ClassroomDto[]> | undefined>>, 
  deleteClassroom: (id: any) => void,

}

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type FormValues = Omit<ClassroomDto, "user">;

export const ClassCard: React.FC<ClassCard> = ({setClasses, classes, deleteClassroom}) => {

  const history = useHistory();
  const classesToShow = classes?.data;
  const [visible, setVisible] = useState(false);
  const [modal, setMod] = useState(false);


  return (
    <div className="class-card">
      {classesToShow &&
        classesToShow.map((x: ClassroomDto) => {
          return (
            <div className='class-card-section'>
              <div className="class-card-info-wrap">
                <div >{x.name}</div>
                <Card.Description>
                  Semester:  {x.semester}
                </Card.Description>
                <Card.Meta>
                  <div>Start Date: {moment(x.startDate).format('MM/DD/YYYY')} </div>
                  <div> End Date: {moment(x.endDate).format('MM/DD/YYYY')}</div>
                </Card.Meta>
              </div>
              <button className="btn-classroom" onClick={() => history.push(routes.classroom.replace(`:id`, `${x.id}`))}>View</button>
              <div>
              <button className="btn-enroll-student" onClick={()=> history.push(routes.enroll.replace(`:id`, `${x.id}`))}>Enroll</button></div>
              {visible ?
                <div className="btn-admin-edit" >
                    <div className="btn-wrap-row">
                    <Button className="btn-class-edit" onClick={() => history.push(routes.edit.replace(`:id`, `${x.id}`))} >
                                Edit
                              </Button>
                  <Button className="btn-class-delete" onClick={() => setMod(true)}>Delete</Button></div>
                  {modal ?
                    <div className="popup-container" >
                      <div className="popup-content">
                        <h1>Delete Classroom</h1>
                        <p>Are you sure you want to delete?</p>
                        <div className="btn-wrap-row" >
                          <button className="cancel-btn" onClick={() => setMod(false)}>Cancel</button>

                          <button className="btn-class-delete" onClick={() => deleteClassroom(x.id)}>Delete</button></div></div></div> : null}
                </div>
                : null}
              <div className="fas fa-ellipsis-h" onClick={() => setVisible(!visible)} />
            </div>
          );
        })}
    </div>
  )
}

