/**
 * Bai 8: Promise chain — square 2, then double, then add 5.
 * Expected: 2^2 = 4 → 4*2 = 8 → 8+5 = 13
 */
export class Bai8 {
  public square(value: number): Promise<number> {
    return Promise.resolve(value * value);
  }

  public double(value: number): Promise<number> {
    return Promise.resolve(value * 2);
  }

  public addFive(value: number): Promise<number> {
    return Promise.resolve(value + 5);
  }

  public runChain(initial: number = 2): Promise<number> {
    return this.square(initial)
      .then((squared: number) => this.double(squared))
      .then((doubled: number) => this.addFive(doubled));
  }

  public async execute(): Promise<number> {
    try {
      const result: number = await this.runChain(2);
      console.log("Chain result:", result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Bai8 error:", error.message);
      } else {
        console.error("Bai8 error:", String(error));
      }
      throw error;
    }
  }
}
new Bai8().execute();