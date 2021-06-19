import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: Enrollment): void;
  findAllByClassroom(
    level: string,
    module: string,
    classroom: string
  ): Enrollment[];
  findByCpf(cpf: string): Enrollment | undefined;
  getByCode(code: string): Enrollment | undefined;
  count(): number;
  update(enrollment: Enrollment): void;
}
