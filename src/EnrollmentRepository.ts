import Enrollment from "./Enrollment";

export interface EnrollmentRepository {
  save(enrollment: Enrollment): void;
  findAllByClassroom(
    level: string,
    module: string,
    classroom: string
  ): Enrollment[];
  findByCpf(cpf: string): Enrollment | undefined;
  findByEnrollmentCode(code: string): Enrollment | undefined;
  update(enrollment: Enrollment): void;
  count(): number;
}
