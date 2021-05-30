import { CpfValidator } from "./CpfValidator";
import { Registration } from "./Registration";
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
    const registration = new Registration(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class,
      this.enrollments.length + 1
    );
    const existingEnrollment = this.enrollments.find(
      (enrollment) =>
        enrollment.student.cpf.value === enrollmentRequest.student.cpf
    );
    if (existingEnrollment)
      throw new Error("Enrollment with duplicated student is not allowed");
    const enrollment = {
      student,
      level: enrollmentRequest.level,
      module: enrollmentRequest.module,
      class: enrollmentRequest.class,
      registration: {
        code: registration.code,
      },
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
  level: string;
  module: string;
  class: string;
};
