console.log("START");

export class Bai1 {
  public createHelloAsync(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello Async");
      }, 2000);
    });
  }

  public async execute(): Promise<string> {
    const result = await this.createHelloAsync();
    console.log(result);
    return result;
  }
}

new Bai1().execute();