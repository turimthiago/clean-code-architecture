import { Student } from "./Student";

export class EnrollStudent {
  async execute(enrollmentRequest: EnrollmentRequest): Promise<void> {
    const { name } = enrollmentRequest.student;
    if (!this.isValidName(name)) {
      throw new Error("Invalid student name");
    }
  }

  private isValidName(name: string): boolean {
    return /^([A-Za-z]+ )+([A-Za-z])+$/.test(name);
  }
}

export type EnrollmentRequest = {
  student: Student;
};
