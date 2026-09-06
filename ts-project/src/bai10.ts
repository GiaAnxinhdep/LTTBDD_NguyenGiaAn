import { Bai4 } from "./bai4";

/**
 * Bai 10: Use .finally() to log "Done" when a Promise finishes.
 * Reuses Bai4.getRandomNumber (DRY).
 */
export class Bai10 {
  private readonly randomProvider: Bai4 = new Bai4();

  public execute(): Promise<void> {
    return this.randomProvider
      .getRandomNumber()
      .then((value: number) => {
        console.log("Success value:", value);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Caught:", error.message);
        } else {
          console.error("Caught:", String(error));
        }
      })
      .finally(() => {
        console.log("Done");
      });
  }
}
new Bai10().execute();