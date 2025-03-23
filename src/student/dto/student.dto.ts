export class CreateStudentDto {
    firstName: string;
    lastName: string;
    email: string;
    document: string;
    phone?: string;
    birthDate: Date;
    createdBy: string;
    updatedBy: string;
  }
  
  export class UpdateStudentDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    document?: string;
    phone?: string;
    birthDate?: Date;
    updatedBy: string;
  }
  