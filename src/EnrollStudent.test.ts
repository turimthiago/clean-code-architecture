import { CpfValidator } from "./CpfValidator";
import { EnrollStudent } from "./EnrollStudent";
import { Student } from "./Student";

describe("EnrollStudent usecase", () => {
  test("Should not enroll without valid student name", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "Ana", cpf: "00902486004" },
      level: "EM",
      module: "1",
      class: "A",
    };
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(new Error("Invalid name"));
  });

  test("Should not enroll without valid student cpf", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "Ana Silva", cpf: "123.456.789-99" },
      level: "EM",
      module: "1",
      class: "A",
    };
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(new Error("Invalid cpf"));
  });

  test("Should not enroll duplicated student", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "John Winston Lennon", cpf: "93093168023" },
      level: "EM",
      module: "1",
      class: "A",
    };
    await sut.execute(enrollRequest);
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(
      new Error("Enrollment with duplicated student is not allowed")
    );
  });

  test("Should generate enrollment code ", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "John Winston Lennon", cpf: "93093168023" },
      level: "EM",
      module: "1",
      class: "A",
    };
    const registration = await sut.execute(enrollRequest);
    expect(registration.registration.code).toEqual("2021EM1A0001")
  });
});
