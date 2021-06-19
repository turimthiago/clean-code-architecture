import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class CancelEnrollment {
  enrollmentRepository: EnrollmentRepository;
  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(request: any): void {
    const enrollment = this.enrollmentRepository.getByCode(request.code);
    if (!enrollment) throw new Error("Enrollment is not found");
    enrollment.dtCancelled = new Date(request.dtCancel);
    this.enrollmentRepository.update(enrollment);
  }
}
