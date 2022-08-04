//This type uses a generic (<T>).  For more information on generics see: https://www.typescriptlang.org/docs/handbook/2/generics.html
//You probably wont need this for the scope of this class :)
export type ApiResponse<T> = {
  data: T;
  errors: ApiError[];
  hasErrors: boolean;
};

export type ApiError = {
  property: string;
  message: string;
}

export type AnyObject = {
  [index: string]: any;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;

};
export type UserGetDto= {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  classroomGetDtos: Classroom[];

}
export type UserCreateDto= {

  firstName: string;
  lastName: string;
  userName: string;
  password:string;
  roleId:number;
}

export type ClassDto = {
  id: number;
  capacity: number;
  subject: string;
  userId: number;
  user: User;
};
export type ClassroomDto ={
  id : number;
  name : string,
  eslLevelId : number;
  teacherId : number;
  semester : string;
  startDate : Date;
  endDate : Date;
  user : User;
};
export type Classroom ={
   id: number,
  name : string,
  eslLevelId : number;
  teacherId : number;
  semester : string;
  startDate : Date;
  endDate : Date;
 
};
export type ClassroomCreateDto={

  name : string,
  eslLevelId : number;
  teacherId : number;
  semester : string;
  startDate : Date;
  endDate : Date;
  user : User;

};
export type ClassroomGetDto={

  id:number,
  name : string,
  eslLevelId : number;
  teacherId : number;
  semester : string;
  startDate : Date;
  endDate : Date;
  userDtos: User[];
}
export type ClassroomEditDto = { 

  name : string,
  eslLevelId : number;
  teacherId : number;
  semester : string;
  startDate : Date;
  endDate : Date;


}
export type EnrollmentGetDto={

  id: number;
  userId: number;
  
  classroomId: number;
};
 

export type AssignmentDto = {
  id: number,
  assignmentName: string,
  dueDate: Date
};

export type AssignmentCreateDto = {
  assignmentName: string,
  dueDate: Date
};

export type AssignmentGetDto = {
  id: number,
  assignmentName: string,
  dueDate: Date
};

export type AssignmentDetailDto = {
  id: number,
  assignmentName: string,
  dueDate: Date,
  assignmentQuestionDetailDtos: AssignmentQuestionDetailDto[]
};

export type AssignmentQuestionCreateDto = {
  questionText: string,
  assignmentId: number,
};

export type AssignmentQuestionGetDto = {
  id: number,
  questionText: string,
  assignmentId: number
};

export type AssignmentQuestionDetailDto = {
  id: number,
  questionText: string,
  assignmentId: number,
  assignmentAnswerGetDtos: AssignmentAnswerGetDto[]
};

export type AssignmentQuestionEditDto = {
  questionText: string
}

export type AssignmentAnswerCreateDto = {
  answerText: string,
  isCorrect: boolean,
  assignmentQuestionId: number
}

export type AssignmentAnswerGetDto = {
  id: number,
  answerText: string,
  isCorrect: boolean,
  assignmentQuestionId: number
};

export type AssignmentAnswerEditDto = {
  answerText: string,
  isCorrect: boolean
}
