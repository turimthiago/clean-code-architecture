import Enrollment from "./Enrollment";
import { EnrollmentRepository } from "./EnrollmentRepository";

export default class EnrollmentRepositoryMemory
  implements EnrollmentRepository
{
  enrollments: Enrollment[];

  constructor() {
    this.enrollments = [];
  }
  update(enrollment: Enrollment): void {
    const index = this.enrollments.findIndex(
      (enrollment) => enrollment.code.value === enrollment.code.value
    );
    this.enrollments[index] = enrollment;
  }
  findByEnrollmentCode(code: string): Enrollment | undefined {
    return this.enrollments.find(
      (enrollment) => enrollment.code.value === code
    );
  }

  save(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }
  findAllByClassroom(level: string, module: string, classroom: string) {
    return this.enrollments.filter(
      (enrollment) =>
        enrollment.level.code === level &&
        enrollment.module.code === module &&
        enrollment.classroom.code === classroom
    );
  }
  findByCpf(cpf: string) {
    return this.enrollments.find(
      (enrollment) => enrollment.student.cpf.value === cpf
    );
  }
  count(): number {
    return this.enrollments.length;
  }
}
