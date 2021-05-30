export class BirthDate {
  yearsOld: number;
  constructor(minimumAge: number, date: Date) {
    this.yearsOld = this.calculateYearsOld(date);
    if (this.yearsOld < minimumAge) {
      throw new Error("Student below minimum age");
    }
  }

  private calculateYearsOld(birthDate: Date): number {
    const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
    var birthDateMs = birthDate.getTime();
    var currentDateMS = Date.now();
    var diferenfeMs = currentDateMS - birthDateMs;
    return Math.round(diferenfeMs / ONE_YEAR);
  }
}
