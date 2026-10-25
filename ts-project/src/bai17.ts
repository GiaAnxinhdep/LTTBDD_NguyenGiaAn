import { Bai14 } from "./bai14";

/**
 * Bai 17: Use for await...of to iterate over an array of Promises.
 * Reuses Bai14.tripleAfterDelay (DRY).
 */
export class Bai17 {
  private readonly multiplier: Bai14 = new Bai14();

  public async iteratePromises(values: number[] = [2, 4, 6]): Promise<number[]> {
    const results: number[] = [];
    try {
      const promises: Array<Promise<number>> = values.map((value: number) =>
        this.multiplier.tripleAfterDelay(value)
      );

      for await (const result of promises) {
        results.push(result);
        console.log("for-await value:", result);
      }
      return results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai17 error:", error.message);
      } else {
        console.error("Bai17 error:", String(error));
      }
      throw error;
    }
  }

  public async execute(): Promise<number[]> {
    return this.iteratePromises();
  }
}
new Bai17().execute();