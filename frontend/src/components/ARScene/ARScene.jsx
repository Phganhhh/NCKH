import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const TARGET_SRC = "/targets/poster-page-1.mind";
// poster-page-1.png: 1584x1224 → overlay phải đúng tỉ lệ này để phủ khít poster
const TARGET_RATIO = 1224 / 1584;

function createOverlayTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = Math.round(640 * TARGET_RATIO);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(16, 42, 67, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#e4b363";
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 52px Arial";
  ctx.fillText("HÁT XOAN PHÚ THỌ", 320, 220);
  ctx.font = "34px Arial";
  ctx.fillText("AR tracking hoạt động", 320, 300);
  ctx.fillText("Module 01", 320, 360);
  return new THREE.CanvasTexture(canvas);
}

// Overlay nhỏ hơn poster một chút để lộ mép poster, chứng tỏ overlay bám target
function createOverlayMesh() {
  const scale = 0.88;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(scale, scale * TARGET_RATIO),
    new THREE.MeshBasicMaterial({ map: createOverlayTexture(), transparent: true })
  );
}

// Chế độ demo (?demo=1): mô phỏng khung hình sau khi quét thành công
// để xem giao diện AR trên máy không có camera / chưa in poster.
function runDemo(container, onStatus) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 10);
  camera.position.set(0.5, 0.42, 2.2);
  camera.lookAt(0.5, TARGET_RATIO / 2, 0);

  // "bàn" nền tối phía sau poster
  const table = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ color: 0x23272b })
  );
  table.position.set(0.5, TARGET_RATIO / 2, -0.35);
  scene.add(table);

  // poster giả lập khung hình camera + overlay bám trên poster
  const targetGroup = new THREE.Group();
  targetGroup.position.set(0.5, TARGET_RATIO / 2, 0);
  targetGroup.rotation.set(-0.08, 0.15, 0);

  const posterTexture = new THREE.TextureLoader().load("/posters/poster-page-1.png");
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(1, TARGET_RATIO),
    new THREE.MeshBasicMaterial({ map: posterTexture })
  );
  poster.position.set(0, 0, -0.002);
  targetGroup.add(poster);

  targetGroup.add(createOverlayMesh());
  scene.add(targetGroup);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
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
    if (demo) return runDemo(containerRef.current, onStatus);

    let mindarThree = null;
    let disposed = false;

    async function run() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: TARGET_SRC
      });
      const { renderer, scene, camera } = mindarThree;

      const anchor = mindarThree.addAnchor(0);
      const overlay = createOverlayMesh();
      overlay.position.set(0.5, TARGET_RATIO / 2, 0);
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
