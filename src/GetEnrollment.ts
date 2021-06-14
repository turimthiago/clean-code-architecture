import { EnrollmentRepository } from "./EnrollmentRepository";

export default class GetEnrollment {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  execute(requestGetEnrollment: any): any {
    const enrollment = this.enrollmentRepository.findByEnrollmentCode(
      requestGetEnrollment.code
    );
    if (!enrollment) throw Error("Enrollment not found.");

    const balance = enrollment.invoices.reduce(
      (total, invoice) => (total += invoice.amount),
      0
    );
    return { enrollment, balance };
  }
}
