export class RepositoriesError extends Error {
  public constructor(message: string, stack?: string) {
    super(message)
    this.name = "RepositoriesError"
    this.stack = stack
  }
}



