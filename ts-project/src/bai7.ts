import { Bai5 } from "./bai5";

/**
 * Bai 7: Use Promise.race() to return whichever Promise resolves first.
 * Reuses Bai5.simulateTask (DRY).
 */
export class Bai7 {
  private readonly taskSimulator: Bai5 = new Bai5();

  public raceTasks(): Promise<string> {
    const tasks: Array<Promise<string>> = [
      this.taskSimulator.simulateTask(3000),
      this.taskSimulator.simulateTask(1000),
      this.taskSimulator.simulateTask(2000),
    ];
    return Promise.race(tasks);
  }

  public async execute(): Promise<string> {
    try {
      const winner: string = await this.raceTasks();
      console.log("Promise.race winner:", winner);
      return winner;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai7 error:", error.message);
      } else {
        console.error("Bai7 error:", String(error));
      }
      throw error;
    }
  }
}
new Bai7().execute();