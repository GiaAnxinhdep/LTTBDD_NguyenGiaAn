import { Bai5 } from "./bai5";

/**
 * Bai 12: Async function that calls simulateTask(2000) and logs the result.
 * Reuses Bai5.simulateTask (DRY).
 */
export class Bai12 {
  private readonly taskSimulator: Bai5 = new Bai5();

  public async runSimulateTask(): Promise<string> {
    try {
      const result: string = await this.taskSimulator.simulateTask(2000);
      console.log(result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai12 error:", error.message);
      } else {
        console.error("Bai12 error:", String(error));
      }
      throw error;
    }
  }

  public async execute(): Promise<string> {
    return this.runSimulateTask();
  }
}
new Bai12().execute();