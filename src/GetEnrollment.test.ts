import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import { EnrollmentRepository } from "./EnrollmentRepository";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import GetEnrollment from "./GetEnrollment";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

describe("GetEnrollment usecase", () => {
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

  test("Should get enrollment by code with invoice balance", () => {
    const request = { code: "2021EM1A0001" };
    const sut = new GetEnrollment(enrollmentRepository);
    const getEnrollment = sut.execute(request);
    expect(getEnrollment.enrollment.student.name.value).toEqual(
      "John Winston Ono Lennon"
    );
    expect(getEnrollment.balance).toEqual(16999.99);
  });
});
