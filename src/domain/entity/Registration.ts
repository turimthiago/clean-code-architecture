export class Registration {
  private _code: string;
  constructor(
    private readonly level: string,
    private readonly module: string,
    private readonly clazz: string,
    sequence: string
  ) {
    this._code = this.generateCode(sequence);
  }

  generateCode(sequence: string): string {
    return `${new Date().getFullYear()}${this.level}${this.module}${
      this.clazz
    }${sequence.toString().padStart(4, "0")}`;
  }

  get code(): string {
    return this._code;
  }
}
