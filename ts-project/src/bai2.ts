console.log("START BAI2");

export class Bai2 {
  public getNumberTen(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 1000);
    });
  }

  public async execute(): Promise<number> {
    const result = await this.getNumberTen();
    console.log(result);
    return result;
  }
}

new Bai2().execute();