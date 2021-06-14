import { EnrollmentRepository } from "./EnrollmentRepository";

export default class CancelEnrollment {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  execute(request: any): void {
    const enrollment = this.enrollmentRepository.findByEnrollmentCode(
      request.code
    );
    if (!enrollment) throw new Error("Enrollment is not found");
    enrollment.status = "CANCELLED";
    this.enrollmentRepository.update(enrollment);
  }
}
