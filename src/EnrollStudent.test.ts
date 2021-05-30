import { CpfValidator } from "./CpfValidator";
import { EnrollStudent } from "./EnrollStudent";
import { Student } from "./Student";

describe("EnrollStudent usecase", () => {
  test("Should not enroll without valid student name", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = { student: { name: "Ana", cpf: "00902486004" } };
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(new Error("Invalid name"));
  });

  test("Should not enroll without valid student cpf", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "Ana Silva", cpf: "123.456.789-99" },
    };
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(new Error("Invalid cpf"));
  });

  test("Should not enroll duplicated student", async () => {
    const sut = new EnrollStudent();
    const enrollRequest = {
      student: { name: "John Winston Lennon", cpf: "93093168023" },
    };
    await sut.execute(enrollRequest);
    const promise = sut.execute(enrollRequest);
    await expect(promise).rejects.toThrow(
      new Error("Enrollment with duplicated student is not allowed")
    );
  });
});
