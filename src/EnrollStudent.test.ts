import { EnrollStudent } from "./EnrollStudent";
import { Student } from "./Student";

describe("EnrollStudent usecase", () => {
  test("Should not enroll without valid student name", async () => {
    const sut = new EnrollStudent();
    const student = { name: "Ana" };
    const promise = sut.execute({ student });
    await expect(promise).rejects.toThrow(new Error("Invalid student name."));
  });

  test("Should not enroll duplicated student", async () => {
    const sut = new EnrollStudent();
    const student = { name: "John Winston Lennon" };
    await sut.execute({ student });
    const promise = sut.execute({ student });
    await expect(promise).rejects.toThrow(
      new Error("Enrollment with duplicated student is not allowed.")
    );
  });
});
