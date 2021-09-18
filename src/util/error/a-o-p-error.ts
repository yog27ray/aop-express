export class AOPError extends Error {
  code: string;

  constructor({ message, code }: { message: string; code: string; }) {
    super(message);
    this.code = code;
  }
}
