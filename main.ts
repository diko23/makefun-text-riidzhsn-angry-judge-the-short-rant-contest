import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_ENTRY_CHARS = 400;

const ENTRY_TEXT =
  "People who step off an escalator and stop dead to check their phone think the stairs behind them have brakes. They do not. Twelve strangers are being fed into your spine by heavy machinery. Take three steps sideways before reading that text. Nobody behind you can pause the floor.";

function resolveOutputDir(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  return envDir && envDir.trim().length > 0 ? envDir : "/output";
}

function writeEntry(): void {
  if (ENTRY_TEXT.trim().length === 0 || ENTRY_TEXT.length > MAX_ENTRY_CHARS) {
    throw new Error(`Entry text length ${ENTRY_TEXT.length} is outside 1..${MAX_ENTRY_CHARS}`);
  }
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, ENTRY_TEXT, { encoding: "utf8", mode: 0o644 });
  chmodSync(outputPath, 0o644);
}

try {
  writeEntry();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
