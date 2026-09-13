import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ARScene from "../../components/ARScene/ARScene.jsx";

const AR_STATUS_TEXT = {
  loading: "Đang tải mô hình AR...",
  scanning: "Đang dò poster... hướng camera vào poster đã in.",
  found: "Đã nhận diện poster — AR overlay đang hiển thị.",
  error: "Lỗi khởi động AR. Kiểm tra kết nối HTTPS rồi tải lại trang."
};

export default function ARExperience() {
  const [permission, setPermission] = useState("asking");
  const [arStatus, setArStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function requestCamera() {
      if (!window.isSecureContext) {
        setPermission("insecure");
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setPermission("unsupported");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: "environment" }
        });
        stream.getTracks().forEach((track) => track.stop());
        if (!cancelled) setPermission("granted");
      } catch {
        if (!cancelled) setPermission("denied");
      }
    }

    requestCamera();
    return () => {
      cancelled = true;
    };
  }, []);

  if (permission !== "granted") {
    return (
      <main className="page">
        <h1>Trải nghiệm AR</h1>
        {permission === "asking" && <p>Đang xin quyền camera...</p>}
        {permission === "denied" && (
          <>
            <p>Quyền camera bị từ chối. Hãy bật quyền camera cho trình duyệt rồi thử lại.</p>
            <button className="button" onClick={() => window.location.reload()}>Thử lại</button>
          </>
        )}
        {permission === "unsupported" && <p>Trình duyệt này không hỗ trợ truy cập camera.</p>}
        {permission === "insecure" && (
          <p>Camera yêu cầu HTTPS (hoặc localhost). Hãy mở trang qua link HTTPS.</p>
        )}
        <p><Link to="/">← Về trang chủ</Link></p>
      </main>
    );
  }

  return (
    <main className="ar-page">
      <ARScene onStatus={setArStatus} />
      <p className="ar-status">{AR_STATUS_TEXT[arStatus]}</p>
      <Link to="/" className="ar-back">← Về trang chủ</Link>
    </main>
  );
}
