export class Registration {
  private _code: string;
  constructor(
    private readonly level: string,
    private readonly module: string,
    private readonly clazz: string,
    nextEnrollmentId: number
  ) {
    this._code = this.generateCode(nextEnrollmentId);
  }

  generateCode(nextEnrollmentId: number): string {
    return `${new Date().getFullYear()}${this.level}${this.module}${
      this.clazz
    }${nextEnrollmentId.toString().padStart(4, "0")}`;
  }

  get code(): string {
    return this._code;
  }
}
