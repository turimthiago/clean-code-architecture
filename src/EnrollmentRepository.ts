export interface EnrollmentRepository {
  save(enrollment: any): void;
  findByClassroom(level: string, module: string, classroom: string): any;
  findByCpf(cpf: string): any;
  count(): number;
}
