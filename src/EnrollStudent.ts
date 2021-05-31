import { Registration } from "./Registration";
import { Student } from "./Student";
import { data } from "./data";

export class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }

  async execute(enrollmentRequest: EnrollmentRequest) {
    const existingEnrollment = this.enrollments.find(
      (enrollment) =>
        enrollment.student.cpf.value === enrollmentRequest.student.cpf
    );
    if (existingEnrollment) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }
    const level = data.levels.find(
      (level) => level.code === enrollmentRequest.level
    );
    if (!level) {
      throw new Error("Level is not found");
    }
    const module = data.modules.find(
      (module) =>
        module.level === level.code && module.code === enrollmentRequest.module
    );
    if (!module) {
      throw new Error("Module is not found");
    }
    const clazz = data.classes.find(
      (clazz) =>
        clazz.module === module.code &&
        clazz.level === level.code &&
        clazz.code === enrollmentRequest.class
    );
    if (!clazz) {
      throw new Error("Class is not found");
    }
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    );
    if (module.minimumAge > student.age) {
      throw new Error("Student below minimum age");
    }
    const registration = new Registration(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class,
      this.enrollments.length + 1
    );
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
    birthDate: Date;
  };
  level: string;
  module: string;
  class: string;
};
