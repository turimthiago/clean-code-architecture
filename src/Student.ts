import { BirthDate } from "./BirthDate";
import Cpf from "./Cpf";
import Name from "./Name";

export class Student {
  name: Name;
  cpf: Cpf;
  birthDate : BirthDate;

  constructor(name: string, cpf: string, birthDate : Date) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
    this.birthDate = new BirthDate(18, birthDate);
  }
}
