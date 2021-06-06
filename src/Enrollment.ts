import { Registration } from "./Registration";
import Student from "./Student";

export default class Enrollment {
    student: Student;
    level: string;
    module: string;
    classroom: string;
    registration : Registration;
    
    constructor (registration : Registration, student: Student, level: string, module: string, classroom: string) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.registration = registration;
    }
}