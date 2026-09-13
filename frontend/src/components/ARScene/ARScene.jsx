import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const TARGET_SRC = "/targets/poster-page-1.mind";

function createOverlayTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(16, 42, 67, 0.92)";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#e4b363";
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 498, 498);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 44px Arial";
  ctx.fillText("HÁT XOAN PHÚ THỌ", 256, 220);
  ctx.font = "30px Arial";
  ctx.fillText("AR tracking hoạt động", 256, 290);
  ctx.fillText("Module 01", 256, 340);
  return new THREE.CanvasTexture(canvas);
}

export default function ARScene({ onStatus }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree = null;
    let disposed = false;

    async function run() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: TARGET_SRC
      });
      const { renderer, scene, camera } = mindarThree;

      const anchor = mindarThree.addAnchor(0);
      const overlay = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ map: createOverlayTexture(), transparent: true })
      );
      overlay.position.set(0.5, 0.5, 0);
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
  }, [onStatus]);

  return <div ref={containerRef} className="ar-container" />;
}
