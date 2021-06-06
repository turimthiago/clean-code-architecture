import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

describe("EnrollStudent usecase", () => {
  let sut: EnrollStudent;

  beforeEach(function () {
    const enrollmentRepository = new EnrollmentRepositoryMemory();
    const levelRepository = new LevelRepositoryMemory();
    const moduleRepository = new ModuleRepositoryMemory();
    const classroomRepository = new ClassroomRepositoryMemory();
    sut = new EnrollStudent(
      levelRepository,
      moduleRepository,
      classroomRepository,
      enrollmentRepository
    );
  });

  test("Should not enroll without valid student name", async () => {
    const enrollmentRequest = {
      student: {
        name: "Ana",
        cpf: "00902486004",
        birthDate: new Date("1900-01-01"),
      },
      level: "EM",
      module: "3",
      class: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Invalid name")
    );
  });

  test("Should not enroll without valid student cpf", async () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Silva",
        cpf: "123.456.789-99",
        birthDate: new Date("1900-01-01"),
      },
      level: "EM",
      module: "3",
      class: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Invalid cpf")
    );
  });

  test("Should not enroll duplicated student", async () => {
    const enrollmentRequest = {
      student: {
        name: "John Winston Lennon",
        cpf: "93093168023",
        birthDate: new Date("1900-01-01"),
      },
      level: "EM",
      module: "1",
      classroom: "A",
    };
    sut.execute(enrollmentRequest);
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Enrollment with duplicated student is not allowed")
    );
  });

  test("Should generate enrollment code", async () => {
    const enrollRequest = {
      student: {
        name: "John Winston Lennon",
        cpf: "93093168023",
        birthDate: new Date("1900-01-01"),
      },
      level: "EM",
      module: "1",
      classroom: "A",
    };
    const registration = await sut.execute(enrollRequest);
    expect(registration.registration.code).toEqual("2021EM1A0001");
  });

  test("Should not enroll student below minimum age", async () => {
    const enrollmentRequest = {
      student: {
        name: "John Winston Lennon",
        cpf: "93093168023",
        birthDate: new Date("2019-01-01"),
      },
      level: "EM",
      module: "1",
      classroom: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Student below minimum age")
    );
  });

  test("Should not enroll student over classroom capacity", function () {
    sut.execute({
      student: {
        name: "Ana Maria",
        cpf: "864.464.227-84",
      },
      level: "EM",
      module: "1",
      classroom: "A",
    });
    sut.execute({
      student: {
        name: "Ana Maria",
        cpf: "240.826.286-06",
      },
      level: "EM",
      module: "1",
      classroom: "A",
    });
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "670.723.738-10",
      },
      level: "EM",
      module: "1",
      classroom: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Classroom is over capacity")
    );
  });

  test("Should not enroll after que end of the class", async () => {
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12",
      },
      date: "2021-02-01",
      level: "EM",
      module: "1",
      classroom: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Class is already finished")
    );
  });

  test("Should not enroll after 25% of the start of the class", async () => {
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12",
      },
      date: "2021-01-20",
      level: "EM",
      module: "1",
      classroom: "A",
    };
    expect(() => sut.execute(enrollmentRequest)).toThrow(
      new Error("Class is already started")
    );
  });
});
