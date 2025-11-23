export class IrisError extends Error {
  constructor(message: string, public code: string, public cause?: unknown) {
    super(message);
    this.name = "IrisError";
  }
}