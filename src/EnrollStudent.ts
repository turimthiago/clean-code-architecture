import { CpfValidator } from "./CpfValidator";
import { Student } from "./Student";

export class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }

  async execute(enrollmentRequest: EnrollmentRequest) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf
    );
    const existingEnrollment = this.enrollments.find(
      (enrollment) =>
        enrollment.student.cpf.value === enrollmentRequest.student.cpf
    );
    if (existingEnrollment)
      throw new Error("Enrollment with duplicated student is not allowed");
    const enrollment = {
      student,
    };
    this.enrollments.push(enrollment);
    return enrollment;
  }
}

export type EnrollmentRequest = {
  student: {
    name: string;
    cpf: string;
  };
};
