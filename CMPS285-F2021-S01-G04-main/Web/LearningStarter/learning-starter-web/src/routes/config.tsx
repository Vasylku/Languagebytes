import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage }  from "../pages/NotFoundPage/not-found";
import { useUser} from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { ClassListing } from "../pages/classes-page/listing-page/class-listing";
import { ClassCreatePage } from "../pages/classes-page/create-page/class-create";
import { LoginPage } from "../pages/login-page/login-page";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Assignment } from "../pages/assignment/create/assignment";
import { Register } from "../pages/register/register";
import { Resource } from "../pages/resource/resource";
import { Enrollment } from "../pages/enrollment/enrollment";
import { AssignmentPage } from "../pages/assignment/assignment-page";
import { AssignmentQuestionDeletePage } from "../pages/assignment/questions/delete/assignment-question-delete";
import { AssignmentQuestionEditPage } from "../pages/assignment/questions/edit/assignment-question-edit";
import { AssignmentQuestionCreatePage } from "../pages/assignment/questions/create/assignment-question-create";
import { AssignmentAnswerCreatePage } from "../pages/assignment/answers/create/assignment-answer-create";
import { AssignmentAnswerDeletePage } from "../pages/assignment/answers/delete/assignment-answer-delete";
import { AssignmentAnswerEditPage } from "../pages/assignment/answers/edit/assignment-answer-edit";

import { Classroom } from "../pages/classroom/classroom";
import { ClassroomEdit } from "../components/classroom-edit/classroom-edit";
import { Enroll } from "../pages/enroll/enroll";


//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: `/user`,
  classes: `/classes`,
  classesCreate: `/classes/create`,
  LoginPage: `/login-page`,
  dashboard: `/dashboard`,
  assignment: `/assignment`,
  register: `/register`,
  resource:`/resource`,
  classroom: `/classroom/:id`,
  enrollment:`/enrollment`,
  edit: "/edit/:id",
  enroll:"/enroll/:id",
  assignmentpage: `/assignment-page/:id`,
  assignmentquestioncreatepage: `/assignment-question-create/:id`,
  assignmentquestioneditpage: `/assignment-question-edit/:id`,
  assignmentquestiondeletepage: `/assignment-question-delete/:id`,
  assignmentanswercreatepage: `/assignment-answer-create/:id`,
  assignmentanswereditpage: `/assignment-answer-edit/:id`,
  assignmentanswerdeletepage: `/assignment-answer-delete/:id`,
};

//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
 const user = useUser(); // todo later
 
  return (    
<>
<PageWrapper>
  
      <Switch>
        {/* When path === / render LandingPage */}
        <Route path={routes.enroll} exact>
          < Enroll/>
          </Route>
        <Route path={routes.edit} exact>
          < ClassroomEdit/>
          </Route>
        <Route path={routes.enrollment} exact>
          <Enrollment/>
          </Route>
          <Route path={routes.classroom}  exact>
          <Classroom/>
          </Route>
        <Route path={routes.home} exact>
          <LandingPage />
        </Route>
       <Route path={routes.resource} exact>
         <Resource/>
         </Route>
       <Route path={routes.register} exact>
          <Register />
          </Route> 
        <Route path={routes.LoginPage} exact>
          <LoginPage/>
          </Route>
          <Route path={routes.assignment} exact>
       <Assignment/>
          </Route>  
          <Route path={routes.assignmentpage}>
        <AssignmentPage/>
            </Route> 
            <Route path={routes.assignmentquestioncreatepage}>
              <AssignmentQuestionCreatePage/>
            </Route>
            <Route path={routes.assignmentquestioneditpage}>
              <AssignmentQuestionEditPage/>
              </Route>
            <Route path={routes.assignmentquestiondeletepage}>
              <AssignmentQuestionDeletePage/>
            </Route>
            <Route path={routes.assignmentanswercreatepage}>
              <AssignmentAnswerCreatePage/>
            </Route>
            <Route path={routes.assignmentanswereditpage}>
              <AssignmentAnswerEditPage/>
              </Route>
            <Route path={routes.assignmentanswerdeletepage}>
              <AssignmentAnswerDeletePage/>
              </Route>
          <Route path={routes.dashboard} exact>
       <Dashboard/>
          </Route>
        <Route path={routes.user} exact>
          <UserPage />
        </Route>
        <Route path={routes.classes} exact>
          <ClassListing />
        </Route>
        <Route path={routes.classesCreate} exact>
          <ClassCreatePage />
        </Route>
 
        {/* Going to route "localhost:5001/" will go to homepage */}
        <Route path={routes.root} exact>
          <Redirect to={routes.home} />
        </Route>
       
        {/* This should always come last.  
          If the path has no match, show page not found */}
        <Route path="*" exact>
          <NotFoundPage />
        </Route>
      </Switch>

        </PageWrapper>
   </>
  );
};
