// Compile image target .mind offline trên Node cho MindAR.
// mind-ar không publish CLI, nên dùng CompilerBase + kernel CPU trực tiếp,
// shim canvas để không phụ thuộc native module node-canvas.
// Cách dùng: node tools/compile-target.mjs <ảnh nguồn> <file .mind>
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import jpeg from "jpeg-js";

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

const fileBuffer = fs.readFileSync(inputPath);
let image;
if (fileBuffer[0] === 0x89 && fileBuffer[1] === 0x50) {
  const png = PNG.sync.read(fileBuffer);
  image = { width: png.width, height: png.height, data: png.data };
} else if (fileBuffer[0] === 0xff && fileBuffer[1] === 0xd8) {
  // điện thoại hay xuất JPEG dù đuôi file .png — đọc theo magic bytes
  const decoded = jpeg.decode(fileBuffer, { useTArray: true, formatAsRGBA: true });
  image = { width: decoded.width, height: decoded.height, data: decoded.data };
} else {
  console.error("Ảnh nguồn phải là PNG hoặc JPEG.");
  process.exit(1);
}

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

console.log(`Compile ${inputPath} (${image.width}x${image.height}) ...`);
const compiler = new NodeCompiler();
await compiler.compileImageTargets([image], (percent) => {
  process.stdout.write(`\r  tiến độ: ${percent.toFixed(1)}%   `);
});
console.log();

const buffer = compiler.exportData();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, Buffer.from(buffer));
console.log(`Xong: ${outputPath} (${buffer.length} bytes)`);
