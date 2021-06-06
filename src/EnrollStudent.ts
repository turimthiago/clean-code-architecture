import ClassroomRepository from "./ClassroomRepository";
import Enrollment from "./Enrollment";
import { EnrollmentRepository } from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import { Registration } from "./Registration";
import Student from "./Student";

export default class EnrollStudent {
    levelRepository: LevelRepository;
    moduleRepository: ModuleRepository;
    classroomRepository: ClassroomRepository;
    enrollmentRepository: EnrollmentRepository;

    constructor (levelRepository: LevelRepository, moduleRepository: ModuleRepository, classRepository: ClassroomRepository, enrollmentRepository: EnrollmentRepository) {
        this.levelRepository = levelRepository;
        this.moduleRepository = moduleRepository;
        this.classroomRepository = classRepository;
        this.enrollmentRepository = enrollmentRepository;
    }
    
    execute (enrollmentRequest: any) {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const level = this.levelRepository.findByCode(enrollmentRequest.level);
        const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
        const classroom = this.classroomRepository.findByCode(enrollmentRequest.classroom);
        const enrollmentDate = new Date(enrollmentRequest.date) || new Date();
        if(new Date(classroom.endDate) < enrollmentDate) throw new Error("Class is already finished");
        const daysLeft = (new Date(classroom.endDate).getTime() - new Date(classroom.startDate).getTime())/(24*3600*1000);
        const daysValid = (daysLeft+(daysLeft * 0.25));
        const daysLeftNow = (enrollmentDate.getTime() - new Date(classroom.startDate).getTime())/(24*3600*1000);
        if(daysValid >= daysLeftNow)throw new Error("Class is already started");
        if (student.age < module.minimumAge) throw new Error("Student below minimum age");
        const studentsEnrolledInClassroom = this.enrollmentRepository.findByClassroom(level.code, module.code, classroom.code);
        if (studentsEnrolledInClassroom.length === classroom.capacity) throw new Error("Classroom is over capacity");
        const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
        const sequence = new String(this.enrollmentRepository.count() + 1).toString();
        const registration = new Registration(level.code, module.code, classroom.code, sequence);//`${enrollmentDate.getFullYear()}${level.code}${module.code}${classroom.code}${sequence}`;
        const enrollment = new Enrollment(registration, student, level.code, module.code, classroom.code);
        
        this.enrollmentRepository.save(enrollment);
        return enrollment;
    }
}