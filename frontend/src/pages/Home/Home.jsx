import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      <h1>Hát Xoan Phú Thọ</h1>
      <p className="subtitle">Di sản văn hóa phi vật thể — trải nghiệm WebAR</p>

      <section className="step">
        <h2>Bước 1 — In poster</h2>
        <img src="/posters/poster-page-1.png" alt="Poster Hát Xoan dùng làm image target" />
        <p>In ảnh trên ra giấy (cỡ A4), đặt phẳng và đủ sáng.</p>
      </section>

      <section className="step">
        <h2>Bước 2 — Quét poster bằng camera</h2>
        <p>
          Bấm nút bên dưới, cho phép dùng camera rồi hướng điện thoại vào poster đã in.
          Lớp AR overlay sẽ xuất hiện trên poster.
        </p>
        <Link className="button" to="/ar">Vào trải nghiệm AR</Link>
        <p>
          <Link to="/ar?demo=1">Xem trước giao diện sau khi quét (chế độ demo, không cần camera)</Link>
        </p>
      </section>
    </main>
  );
}
