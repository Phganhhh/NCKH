import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { TARGET_SRC, loadTargetSize } from "../../services/target.js";

const DEMO_FOV = 55;
const DEMO_FOV_TAN = Math.tan((DEMO_FOV / 2) * (Math.PI / 180));

function createOverlayTexture(ratio) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = Math.round(640 * ratio);
  const ctx = canvas.getContext("2d");
  const h = canvas.height;
  ctx.fillStyle = "rgba(16, 42, 67, 0.8)";
  ctx.fillRect(0, 0, canvas.width, h);
  ctx.strokeStyle = "#e4b363";
  ctx.lineWidth = Math.max(8, canvas.width * 0.02);
  ctx.strokeRect(7, 7, canvas.width - 14, h - 14);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  // cỡ chữ theo chiều ngang để title không tràn dù target dọc hay ngang
  ctx.font = `bold ${Math.round(canvas.width * 0.085)}px Arial`;
  ctx.fillText("HÁT XOAN PHÚ THỌ", 320, h * 0.44);
  ctx.font = `${Math.round(canvas.width * 0.055)}px Arial`;
  ctx.fillText("AR tracking hoạt động", 320, h * 0.56);
  ctx.fillText("Module 01", 320, h * 0.66);
  return new THREE.CanvasTexture(canvas);
}

// Overlay nhỏ hơn poster một chút để lộ mép poster, chứng tỏ overlay bám target
function createOverlayMesh(ratio) {
  const scale = 0.88;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(scale, scale * ratio),
    new THREE.MeshBasicMaterial({ map: createOverlayTexture(ratio), transparent: true })
  );
}

// Chế độ demo (?demo=1): mô phỏng khung hình sau khi quét thành công
// để xem giao diện AR trên máy không có camera / chưa in poster.
async function runDemo(container, onStatus) {
  const { width, height } = await loadTargetSize();
  const ratio = height / width;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(DEMO_FOV, 1, 0.01, 20);

  // "bàn" nền tối phía sau poster
  const table = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: 0x23272b })
  );
  table.position.set(0.5, ratio / 2, -0.35);
  scene.add(table);

  // poster giả lập khung hình camera + overlay bám trên poster
  const targetGroup = new THREE.Group();
  targetGroup.position.set(0.5, ratio / 2, 0);
  targetGroup.rotation.set(-0.08, 0.15, 0);

  const posterTexture = new THREE.TextureLoader().load("/posters/poster-page-1.png");
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(1, ratio),
    new THREE.MeshBasicMaterial({ map: posterTexture })
  );
  poster.position.set(0, 0, -0.002);
  targetGroup.add(poster);

  const overlay = createOverlayMesh(ratio);
  overlay.position.set(0, 0, 0.002);
  targetGroup.add(overlay);
  scene.add(targetGroup);

  function resize() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    camera.aspect = containerWidth / containerHeight;
    // lùi camera đủ xa để trọn poster (cả chiều dọc lẫn ngang) lọt khung hình
    const z = Math.max(
      (ratio * 1.25) / (2 * DEMO_FOV_TAN),
      1.25 / (2 * DEMO_FOV_TAN * camera.aspect)
    );
    camera.position.set(0.5, ratio / 2, z);
    camera.lookAt(0.5, ratio / 2, 0);
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  onStatus("demo");
  renderer.setAnimationLoop(() => renderer.render(scene, camera));

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("resize", resize);
    renderer.dispose();
    renderer.domElement.remove();
  };
}

export default function ARScene({ demo = false, onStatus }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (demo) {
      let cleanup = null;
      let disposed = false;
      runDemo(containerRef.current, onStatus)
        .then((fn) => {
          if (disposed) fn();
          else cleanup = fn;
        })
        .catch((error) => {
          console.error(error);
          onStatus("error");
        });
      return () => {
        disposed = true;
        cleanup?.();
      };
    }

    let mindarThree = null;
    let disposed = false;

    async function run() {
      const { width, height } = await loadTargetSize();
      const ratio = height / width;

      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: TARGET_SRC
      });
      const { renderer, scene, camera } = mindarThree;

      const anchor = mindarThree.addAnchor(0);
      const overlay = createOverlayMesh(ratio);
      overlay.position.set(0.5, ratio / 2, 0);
      anchor.group.add(overlay);

      anchor.onTargetFound = () => onStatus("found");
      anchor.onTargetLost = () => onStatus("scanning");

      onStatus("loading");
      await mindarThree.start();
      if (disposed) return;
      onStatus("scanning");
      renderer.setAnimationLoop(() => renderer.render(scene, camera));
    }

    run().catch((error) => {
      console.error(error);
      onStatus("error");
    });

    return () => {
      disposed = true;
      if (mindarThree) {
        mindarThree.renderer.setAnimationLoop(null);
        if (mindarThree.video) mindarThree.stop();
      }
    };
  }, [demo, onStatus]);

  return <div ref={containerRef} className={demo ? "ar-container ar-demo" : "ar-container"} />;
}
