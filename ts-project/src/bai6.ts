import { Bai5 } from "./bai5";

/**
 * Bai 6: Use Promise.all() to run 3 simulated Promises in parallel.
 * Reuses Bai5.simulateTask (DRY).
 */
export class Bai6 {
  private readonly taskSimulator: Bai5 = new Bai5();

  public runParallelTasks(): Promise<string[]> {
    const tasks: Array<Promise<string>> = [
      this.taskSimulator.simulateTask(1000),
      this.taskSimulator.simulateTask(1500),
      this.taskSimulator.simulateTask(2000),
    ];
    return Promise.all(tasks);
  }

  public async execute(): Promise<string[]> {
    try {
      const results: string[] = await this.runParallelTasks();
      console.log("Promise.all results:", results);
      return results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai6 error:", error.message);
      } else {
        console.error("Bai6 error:", String(error));
      }
      throw error;
    }
  }
}
new Bai6().execute();