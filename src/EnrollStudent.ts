import { CpfValidator } from "./CpfValidator";
import { Student } from "./Student";

export class EnrollStudent {
  private students: Student[] = [];

  constructor(private readonly cpfValidator: CpfValidator) {}

  async execute(enrollmentRequest: EnrollmentRequest): Promise<void> {
    const { name, cpf } = enrollmentRequest.student;
    if (!this.isValidName(name)) {
      throw new Error("Invalid student name.");
    }
    if (this.students.some((register) => register.name === name)) {
      throw new Error("Enrollment with duplicated student is not allowed.");
    }
    if (!this.cpfValidator.isValid(cpf)) {
      throw new Error("Invalid student cpf.");
    }
    this.students.push(enrollmentRequest.student);
  }

  private isValidName(name: string): boolean {
    return /^([A-Za-z]+ )+([A-Za-z])+$/.test(name);
  }
}

export type EnrollmentRequest = {
  student: Student;
};
