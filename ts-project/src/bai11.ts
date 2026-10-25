import { Bai1 } from "./bai1";

/**
 * Bai 11: Convert Exercise 1 into async/await.
 * Reuses Bai1.createHelloAsync (DRY).
 */
export class Bai11 {
  private readonly bai1: Bai1 = new Bai1();

  public async getHelloAsync(): Promise<string> {
    try {
      const message: string = await this.bai1.createHelloAsync();
      return message;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai11 error:", error.message);
      } else {
        console.error("Bai11 error:", String(error));
      }
      throw error;
    }
  }

  public async execute(): Promise<string> {
    try {
      const message: string = await this.getHelloAsync();
      console.log(message);
      return message;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai11 execute error:", error.message);
      } else {
        console.error("Bai11 execute error:", String(error));
      }
      throw error;
    }
  }
}
new Bai11().execute();