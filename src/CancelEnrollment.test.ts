import CancelEnrollment from "./CancelEnrollment";
import GetEnrollment from "./GetEnrollment";
import EnrollStudent from "./EnrollStudent";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import EnrollStudentInputData from "./EnrollStudentInputData";

describe("CancelEnrollment", () => {
  let repositoryMemoryFactory: RepositoryMemoryFactory;
  let getEnrollment: GetEnrollment;

  beforeEach(() => {
    repositoryMemoryFactory = new RepositoryMemoryFactory();
    const enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);

    const enrollmentRequest = new EnrollStudentInputData({
      studentName: "Ana Maria",
      studentCpf: "864.464.227-84",
      studentBirthDate: "2002-10-10",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    });
    enrollStudent.execute(enrollmentRequest);
  });

  test("Should cancel enrollment", () => {
    const request = {
      code: "2021EM1A0001",
      dtCancel: "2021-01-01",
    };
    const sut = new CancelEnrollment(repositoryMemoryFactory);
    sut.execute(request);
    const enrollmentData = getEnrollment.execute("2021EM1A0001");
    expect(enrollmentData.activate).toEqual(false);
  });

  test.todo(
    "Should calculate due date and return status open or overdue for each invoice"
  );

  test.todo("Should calculate penalty and interests");
});
