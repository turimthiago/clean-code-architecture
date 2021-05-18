import { CpfValidator } from "./CpfValidator";
import { EnrollStudent } from "./EnrollStudent";
import { Student } from "./Student";

describe("EnrollStudent usecase", () => {
  test("Should not enroll without valid student name", async () => {
    const sut = new EnrollStudent(new CpfValidator());
    const student = { name: "Ana", cpf: "00902486004" };
    const promise = sut.execute({ student });
    await expect(promise).rejects.toThrow(new Error("Invalid student name."));
  });

  test("Should not enroll without valid student cpf", async () => {
    const sut = new EnrollStudent(new CpfValidator());
    const student = { name: "Ana Silva", cpf: "123.456.789-99" };
    const promise = sut.execute({ student });
    await expect(promise).rejects.toThrow(new Error("Invalid student cpf."));
  });

  test("Should not enroll duplicated student", async () => {
    const sut = new EnrollStudent(new CpfValidator());
    const student = { name: "John Winston Lennon", cpf: "93093168023" };
    await sut.execute({ student });
    const promise = sut.execute({ student });
    await expect(promise).rejects.toThrow(
      new Error("Enrollment with duplicated student is not allowed.")
    );
  });
});
