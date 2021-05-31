import { BirthDate } from "./BirthDate";
import Cpf from "./Cpf";
import Name from "./Name";

export class Student {
  name: Name;
  cpf: Cpf;
  birthDate: Date;

  constructor(name: string, cpf: string, birthDate: Date) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
    this.birthDate = birthDate;
  }

  get age(): number {
    return this.calculateYearsOld(this.birthDate);
  }

  private calculateYearsOld(birthDate: Date): number {
    const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
    var birthDateMs = birthDate.getTime();
    var currentDateMS = Date.now();
    var diferenfeMs = currentDateMS - birthDateMs;
    return Math.round(diferenfeMs / ONE_YEAR);
  }
}
