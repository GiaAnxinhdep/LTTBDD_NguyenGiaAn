/**
 * Bai 5: simulateTask(time) — resolves with "Task done" after time ms.
 */
export class Bai5 {
  public simulateTask(time: number): Promise<string> {
    return new Promise<string>((resolve: (value: string) => void) => {
      setTimeout(() => {
        resolve("Task done");
      }, time);
    });
  }

  public async execute(time: number = 1000): Promise<string> {
    const result: string = await this.simulateTask(time);
    console.log(result);
    return result;
  }
}
new Bai5().execute();