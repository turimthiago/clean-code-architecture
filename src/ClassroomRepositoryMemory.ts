import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classrooms: any[];

  constructor() {
    this.classrooms = [
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
        startDate: "2021-01-01",
        endDate: "2021-01-30",
      },
    ];
  }

  findByCode(code: string) {
    const classroom = this.classrooms.find(
      (classroom) => classroom.code === code
    );
    if (!classroom) throw new Error("Classroom not found");
    return classroom;
  }
}
