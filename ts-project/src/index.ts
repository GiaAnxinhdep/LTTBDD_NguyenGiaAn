/**
 * Entry point — chạy từng bài hoặc tất cả (bỏ qua các bài fetch nếu offline).
 * Ví dụ: npx ts-node src/index.ts 5
 */
import { Bai1 } from "./bai1";
import { Bai2 } from "./bai2";
import { Bai3 } from "./bai3";
import { Bai4 } from "./bai4";
import { Bai5 } from "./bai5";
import { Bai6 } from "./bai6";
import { Bai7 } from "./bai7";
import { Bai8 } from "./bai8";
import { Bai9 } from "./bai9";
import { Bai10 } from "./bai10";
import { Bai11 } from "./bai11";
import { Bai12 } from "./bai12";
import { Bai13 } from "./bai13";
import { Bai14 } from "./bai14";
import { Bai15 } from "./bai15";
import { Bai16 } from "./bai16";
import { Bai17 } from "./bai17";
import { Bai18 } from "./bai18";
import { Bai19 } from "./bai19";
import { Bai20 } from "./bai20";
import { Bai21 } from "./bai21";
import { Bai22 } from "./bai22";
import { Bai23 } from "./bai23";
import { Bai24 } from "./bai24";
import { Bai25 } from "./bai25";
import { Bai26 } from "./bai26";
import { Bai27 } from "./bai27";
import { Bai28 } from "./bai28";
import { Bai29 } from "./bai29";
import { Bai30 } from "./bai30";

type ExerciseRunner = () => Promise<unknown>;

const exercises: Record<number, ExerciseRunner> = {
  1: () => new Bai1().execute(),
  2: () => new Bai2().execute(),
  3: () => new Bai3().execute(),
  4: () => new Bai4().execute(),
  5: () => new Bai5().execute(),
  6: () => new Bai6().execute(),
  7: () => new Bai7().execute(),
  8: () => new Bai8().execute(),
  9: () => new Bai9().execute(),
  10: () => new Bai10().execute(),
  11: () => new Bai11().execute(),
  12: () => new Bai12().execute(),
  13: () => new Bai13().execute(),
  14: () => new Bai14().execute(),
  15: () => new Bai15().execute(),
  16: () => new Bai16().execute(),
  17: () => new Bai17().execute(),
  18: () => new Bai18().execute(),
  19: () => new Bai19().execute(),
  20: () => new Bai20().execute(),
  21: () => new Bai21().execute(),
  22: () => new Bai22().execute(),
  23: () => new Bai23().execute(),
  24: () => new Bai24().execute(),
  25: () => new Bai25().execute(),
  26: () => new Bai26().execute(),
  27: () => new Bai27().execute(),
  28: () => new Bai28().execute(),
  29: () => new Bai29().execute(),
  30: () => new Bai30().execute(),
};

async function main(): Promise<void> {
  const arg: string | undefined = process.argv[2];
  const selected: number | undefined = arg !== undefined ? Number(arg) : undefined;

  try {
    if (selected !== undefined && !Number.isNaN(selected) && exercises[selected]) {
      console.log(`=== Running Bai ${selected} ===`);
      await exercises[selected]();
      return;
    }

    console.log("Usage: npx ts-node src/index.ts <1-30>");
    console.log("Available exercises: 1..30");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fatal:", error.message);
    } else {
      console.error("Fatal:", String(error));
    }
    process.exitCode = 1;
  }
}

void main();
