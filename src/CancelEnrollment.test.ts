import CancelEnrollment from "./CancelEnrollment";
import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import { EnrollmentRepository } from "./EnrollmentRepository";
import GetEnrollment from "./GetEnrollment";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

describe("CancelEnrollment usecase", () => {
  let enrollmentRepository: EnrollmentRepository;

  beforeEach(() => {
    enrollmentRepository = new EnrollmentRepositoryMemory();
    const levelRepository = new LevelRepositoryMemory();
    const moduleRepository = new ModuleRepositoryMemory();
    const classroomRepository = new ClassroomRepositoryMemory();
    const enrollStudent = new EnrollStudent(
      levelRepository,
      moduleRepository,
      classroomRepository,
      enrollmentRepository
    );

    const enrollmentRequest = {
      student: {
        name: "John Winston Ono Lennon",
        cpf: "00902486004",
        birthDate: new Date("1900-01-01"),
      },
      level: "EM",
      module: "1",
      classroom: "A",
      issueDate: "2021-05-30",
    };
    enrollStudent.execute(enrollmentRequest);
  });
  test.only("Should cancel enrollment", () => {
    const request = {
      code: "2021EM1A0001",
    };
    const sut = new CancelEnrollment(enrollmentRepository);
    sut.execute(request);
    const getEnrollment = new GetEnrollment(enrollmentRepository);
    const enrollmentData = getEnrollment.execute(request);
    expect(enrollmentData.enrollment.status).toEqual("CANCELLED");
  });
});
