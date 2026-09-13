// Compile image target .mind offline trên Node cho MindAR.
// mind-ar không publish CLI, nên dùng CompilerBase + kernel CPU trực tiếp,
// shim canvas để không phụ thuộc native module node-canvas.
// Cách dùng: node tools/compile-target.mjs <ảnh nguồn> <file .mind>
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

globalThis.requestAnimationFrame ??= (cb) => setTimeout(() => cb(Date.now()), 16);

const { CompilerBase } = await import("mind-ar/src/image-target/compiler-base.js");
const { buildTrackingImageList } = await import("mind-ar/src/image-target/image-list.js");
const { extractTrackingFeatures } = await import("mind-ar/src/image-target/tracker/extract-utils.js");
await import("mind-ar/src/image-target/detector/kernels/cpu/index.js");

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Cách dùng: node tools/compile-target.mjs <ảnh nguồn> <file .mind>");
  process.exit(1);
}

const png = PNG.sync.read(fs.readFileSync(inputPath));

class NodeCompiler extends CompilerBase {
  createProcessCanvas(img) {
    return {
      getContext: () => ({
        drawImage() {},
        getImageData: () => ({ data: img.data, width: img.width, height: img.height })
      })
    };
  }

  compileTrack({ progressCallback, targetImages, basePercent }) {
    return new Promise((resolve) => {
      const percentPerImage = (100 - basePercent) / targetImages.length;
      let percent = 0;
      const list = [];
      for (const targetImage of targetImages) {
        const imageList = buildTrackingImageList(targetImage);
        const percentPerAction = percentPerImage / imageList.length;
        list.push(
          extractTrackingFeatures(imageList, () => {
            percent += percentPerAction;
            progressCallback(basePercent + percent);
          })
        );
      }
      resolve(list);
    });
  }
}

const image = { width: png.width, height: png.height, data: png.data };
console.log(`Compile ${inputPath} (${png.width}x${png.height}) ...`);
const compiler = new NodeCompiler();
await compiler.compileImageTargets([image], (percent) => {
  process.stdout.write(`\r  tiến độ: ${percent.toFixed(1)}%   `);
});
console.log();

const buffer = compiler.exportData();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, Buffer.from(buffer));
console.log(`Xong: ${outputPath} (${buffer.length} bytes)`);
