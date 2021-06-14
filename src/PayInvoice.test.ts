import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import { EnrollmentRepository } from "./EnrollmentRepository";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import GetEnrollment from "./GetEnrollment";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";
import PayInvoice from "./PayInvoice";

describe("PayInvoice usecase", () => {
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

  test("Should pay enrollment invoice", () => {
    const request = {
      code: "2021EM1A0001",
      month: 1,
      year: 2021,
      amount: 1000,
    };
    const sut = new PayInvoice(enrollmentRepository);
    sut.execute(request);

    const getEnrollment = new GetEnrollment(enrollmentRepository);
    const enrollment = getEnrollment.execute({ code: request.code });
    expect(enrollment.balance).toEqual(15999.99);
  });
});
