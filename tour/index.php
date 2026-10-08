<?php
$pageTitle = 'Hát Xoan · Tour khám phá';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Hát Xoan Phú Thọ – trải nghiệm văn hóa số và tour khám phá di sản.">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            xoan: {
              ink: '#291813',
              wood: '#4A2B20',
              clay: '#8B2F26',
              red: '#9B332C',
              gold: '#D8B873',
              cream: '#F6EFDF',
              moss: '#4B5A43',
              olive: '#6A704E',
              paper: '#FBF7ED'
            }
          },
          fontFamily: {
            sansvn: ['Be Vietnam Pro', 'Arial', 'sans-serif'],
            serifvn: ['Noto Serif', 'Georgia', 'serif'],
            scriptvn: ['Dancing Script', 'cursive']
          },
          boxShadow: {
            cultural: '0 18px 55px rgba(55,30,20,.15)',
            gold: '0 12px 30px rgba(216,184,115,.18)'
          }
        }
      }
    };
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Noto+Serif:wght@400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/o2o.css">
  <style>
    .section-o2o {
      background: #FBF7ED;
    }

   .tour-hero-o2o {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    color: #fff;
    padding: 145px 6% 70px;
    background: linear-gradient(120deg, #291813, #6e2a23);
}

.tour-hero-o2o::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("../images/nen.png") center center / cover no-repeat;
    opacity: 0.30;
    z-index: -2;
}

.tour-hero-o2o::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        120deg,
        rgba(41,24,19,.78),
        rgba(110,42,35,.68)
    );
    z-index: -1;
}

.tour-hero-o2o > div {
    position: relative;
    z-index: 1;
}

    .tour-max {
      max-width: 1160px;
      margin: auto;
    }

    .tour-hero-o2o p {
      font-family: "Noto Serif", Georgia, serif;
      color: rgba(255,255,255,.70);
    }
    .float-in {
    animation: floatIn 1.2s cubic-bezier(.22,.61,.36,1) both;
}

@keyframes floatIn {
    from {
        opacity: 0;
        transform: translateY(28px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

    .benefits {
      display: grid;
      grid-template-columns: 1.05fr .95fr;
      gap: 26px;
    }

    .benefit-card,
    .social-card,
    .voucher-card,
    .booking-card {
      background: #fff;
      border: 1px solid #e6dac9;
      border-radius: 28px;
      padding: 28px;
      box-shadow: 0 14px 42px rgba(52,30,20,.06);
    }

    .benefit-list {
      display: grid;
      gap: 18px;
    }

    .benefit-item {
      display: flex;
      gap: 13px;
    }

    .benefit-icon {
      flex: none;
      width: 40px;
      height: 40px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      background: #efe0bc;
      color: #7d3327;
      font-size: 20px;
    }

    .real-photos {
      display: grid;
      grid-template-columns: 1.2fr .8fr .8fr;
      gap: 10px;
      margin-top: 25px;
    }

    .real-photo {
      min-height: 240px;
      border-radius: 22px;
      background: linear-gradient(145deg,#8d5d45,#d09e6d);
      position: relative;
      overflow: hidden;
    }

    .real-photo:nth-child(1) {
      background-image: url('../images/khongian.jpg');
      background-size: cover;
      background-position: center;
    }

    .real-photo:nth-child(2) {
      background-image: url('../images/truyen_day.jpg');
      background-size: cover;
      background-position: center;
    }

    .real-photo:nth-child(3) {
      background-image: url('../images/trong.jpg');
      background-size: cover;
      background-position: center;
    }

    .real-photo span {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 13px;
      color: #fff;
      font-weight: 800;
      text-shadow: 0 2px 14px rgba(0,0,0,.4);
    }

    .tryon {
      background: linear-gradient(135deg,#efe1c2,#f9f5ea);
      border-radius: 28px;
      padding: 28px;
      border: 1px solid #e3d6c4;
    }

    .tryon-preview {
      height: 270px;
      border-radius: 22px;
      background: linear-gradient(145deg,#dfc7aa,#f3e9d8);
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .tryon-person {
      width: 120px;
      height: 170px;
      border-radius: 55% 55% 35% 35%;
      background: linear-gradient(#e3bd98 0 24%,#7b3d2e 24% 70%,#291813 70%);
      position: relative;
    }

    .tryon-person:before {
      content: "";
      position: absolute;
      width: 85px;
      height: 26px;
      background: #24130f;
      left: 50%;
      top: 7px;
      transform: translateX(-50%);
      border-radius: 50%;
    }

    .fomo {
      border: 2px solid #9b332c;
      background: #fff5f3;
      border-radius: 22px;
      padding: 20px;
    }

    .fomo strong {
      color: #9b332c;
    }

    .progress {
      height: 12px;
      background: #eaded0;
      border-radius: 999px;
      overflow: hidden;
    }

    .progress > span {
      display: block;
      width: 83%;
      height: 100%;
      background: linear-gradient(90deg,#9b332c,#d85f4a);
      border-radius: 999px;
    }

    .voucher {
      background: linear-gradient(135deg,#fff7db,#eedcaa);
      border: 1px dashed #aa7c2a;
    }

    .sticky-cta {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 150;
      background: rgba(32,18,14,.96);
      border-top: 1px solid rgba(216,184,115,.3);
      backdrop-filter: blur(12px);
      padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
    }

    .sticky-cta .inner {
      max-width: 1160px;
      margin: auto;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .sticky-cta a {
      flex: 1;
      text-align: center;
      border-radius: 14px;
      padding: 13px;
      font-weight: 800;
    }

    .sticky-main {
      background: #9b332c;
      color: #fff;
    }

    .sticky-note {
      color: rgba(255,255,255,.58);
      font-size: 11px;
      flex: none;
    }

    .booking-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .booking-form .full {
      grid-column: 1 / -1;
    }

    .field label {
      display: block;
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 6px;
    }

    .field input,
    .field textarea,
    .field select {
      width: 100%;
      border: 1px solid #d8ccb9;
      border-radius: 11px;
      padding: 12px 13px;
      background: #fff;
      outline: none;
    }

    .qr-box {
      display: flex;
      gap: 18px;
      align-items: center;
      background: #fbf5e8;
      border: 1px solid #ead9ba;
      border-radius: 18px;
      padding: 15px;
    }

    .qr-box img {
      width: 100px;
      height: 100px;
    }

    .success-panel {
      padding: 30px;
      text-align: center;
      background: #fff;
      border: 1px solid #e5d8c7;
      border-radius: 28px;
    }

    .hide {
      display: none !important;
    }

    .muted {
      color: #77675a;
    }

    .footer-grid-o2o a:hover {
      color: #fff;
    }

    @media (max-width: 950px) {
      .benefits {
        grid-template-columns: 1fr;
      }

      .real-photos {
        grid-template-columns: 1fr 1fr;
      }

      .real-photo:nth-child(1) {
        grid-column: 1 / -1;
      }

      .booking-form {
        grid-template-columns: 1fr;
      }

      .booking-form .full {
        grid-column: auto;
      }

      .sticky-note {
        display: none;
      }
    }

    @media (max-width: 760px) {
      .menu-btn-o2o {
        display: block !important;
      }

      .main-nav-o2o {
        display: none;
      }

      .real-photos {
        grid-template-columns: 1fr;
      }

      .real-photo:nth-child(1) {
        grid-column: auto;
      }

      .footer-grid-o2o {
        grid-template-columns: 1fr !important;
      }

      .tour-hero-o2o {
        padding: 65px 5% 50px;
      }

      .sticky-cta .inner {
        display: block;
      }

      .sticky-cta a {
        display: block;
      }

      .sticky-note {
        margin-top: 5px;
        text-align: center;
      }
    }
  </style>
  <title><?= htmlspecialchars($pageTitle) ?></title>
</head>

<body class="font-sansvn antialiased bg-[#FBF7ED] text-xoan-ink">
<header id="top" class="fixed top-0 left-0 right-0 z-50">
  <nav id="navbar" class="bg-[#20120e]/80 text-white border-b border-white/10 nav-shadow transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
      <a href="../index.php" class="flex items-center gap-3 group">
        <img src="../images/logo.png" alt="Hát Xoan" class="w-11 h-11 rounded-full border border-xoan-gold/50 object-cover bg-white/5">
        <div class="leading-tight"><div class="font-serifvn text-[21px] tracking-[.08em]">HÁT XOAN</div><div class="text-[10px] sm:text-[11px] text-white/65 tracking-[.18em] uppercase">Di sản Hát Xoan Phú Thọ</div></div>
      </a>
      <div class="hidden lg:flex items-center gap-7 text-sm">
        <a href="../index.php">Trang chủ</a>
        <a href="../pages/kham-pha-di-san.php">Khám phá di sản</a>
        <a href="../ar/index.php">Trải nghiệm AR</a>
        <a href="../tour/index.php" class="rounded-full bg-xoan-red px-4 py-2">Tour khám phá</a>
        <a href="../auth/login.php">Đăng nhập</a>
      </div>
      <button id="menuBtn" aria-label="Mở menu" class="lg:hidden w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">☰</button>
    </div>
    <div id="mobileMenu" class="lg:hidden hidden border-t border-white/10 bg-[#20120e]/95">
      <div class="max-w-7xl mx-auto px-4 py-4 grid gap-1 text-sm">
        <a href="../index.php" class="py-3">Trang chủ</a>
        <a href="../pages/kham-pha-di-san.php" class="py-3">Khám phá di sản</a>
        <a href="../ar/index.php" class="py-3">Trải nghiệm AR</a>
        <a href="../tour/index.php" class="py-3 text-xoan-gold">Tour khám phá</a>
        <a href="../auth/login.php" class="py-3">Đăng nhập</a>
      </div>
    </div>
  </nav>
</header>

  <main>
    <section class="tour-hero-o2o">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p class="text-xs uppercase tracking-[.23em] text-xoan-gold font-semibold float-in">
            MỞ KHÓA TRẢI NGHIỆM
        </p>

        <h1 class="font-scriptvn text-6xl sm:text-7xl lg:text-8xl mt-6 text-[#F8EAC8] float-in">
            Hành Trình Tìm Về Nguồn Cội Chạm Vào Không Gian Di Sản
        </h1>

        <p class="mt-5 max-w-3xl text-white/70 leading-7 font-serifvn float-in">
            "Hãy tạm gác lại thế giới qua lăng kính nhỏ để bước chân lên khoảng sân gạch nhuốm màu thời gian nơi nhịp phách tre mộc mạc kể câu chuyện của trăm năm"
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
            <a class="o2o-btn o2o-gold" href="#trai-nghiem">
                Lật mở hành trình ↓
            </a>

            <a class="o2o-btn o2o-dark" href="#dat-lich">
                Đặt lịch ngay
            </a>
        </div>

    </div>
</section>

    <div id="voucherBanner" class="hidden bg-gradient-to-r from-xoan-gold/20 to-xoan-red/10 border-y border-xoan-gold/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🎁</span>
          <div>
            <div class="font-semibold text-xoan-ink">Bạn đã mở khóa voucher AR!</div>
            <div class="text-sm text-xoan-wood/70">Giá tour đã được giảm 20% tự động.</div>
          </div>
        </div>
        <div class="font-serifvn text-2xl text-xoan-red">-20%</div>
      </div>
    </div>

    <div id="arPrompt" class="hidden bg-xoan-ink text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-sm">Chưa có voucher? Chơi game AR để được giảm giá Tour Hát Xoan.</div>
        <a href="../ar/index.php" class="o2o-btn o2o-gold text-sm px-4 py-2">🎮 Chơi game AR</a>
      </div>
    </div>

    <section id="trai-nghiem" class="section-o2o py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="o2o-kicker">01 · trải nghiệm vẹn nguyên </div>
          <h2 class="font-serifvn text-4xl sm:text-5xl mt-2">
            BƯỚC RA KHỎI MÀN HÌNH - BƯỚC VÀO KHÔNG GIAN DI SẢN
          </h2>
          <p class="mt-4 text-xoan-wood/70">
  
          </p>
        </div>

        <div class="benefits mt-10">
          <div class="benefit-card">
            <div class="benefit-list">
              <div class="benefit-item">
                <div class="benefit-icon">🎶</div>
                <div>
                  <strong>Lắng nghe thanh âm nguyên bản</strong>
                  <p class="muted">
                    Thưởng thức trọn vẹn độ những làn điệu cổ vang vọng giữa không gian đình thiêng.
                  </p>
                </div>
              </div>

              <div class="benefit-item">
                <div class="benefit-icon">👀</div>
                <div>
                  <strong>Đánh thức mọi giác quan</strong>
                  <p class="muted">
                    Chạm tay vào nếp áo the và ngắm nhìn ánh sáng hoài niệm phủ lên từng góc chiếu chèo mộc mạc.
                  </p>
                </div>
              </div>

              <div class="benefit-item">
                <div class="benefit-icon">🤝</div>
                <div>
                  <strong>Trở thành mảnh ghép của di sản</strong>
                  <p class="muted">
                    Bước ra khỏi lăng kính màn hình nhỏ để chính thức hòa mình vào dòng chảy văn hóa ngàn năm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="benefit-card">
            <div class="o2o-kicker">BƯỚC QUA MÀN HÌNH CHẠM VÀO NHỊP ĐẬP DI SẢN</div>
            <h3 class="font-serifvn text-3xl mt-2">
              Bạn không đến chỉ để “check-in”.
            </h3>
            <p class="muted mt-3">
              "Một không gian diễn xướng nguyên bản đang vẫy gọi<br>
              Nơi những âm thanh mộc mạc nhất không phát ra từ loa điện thoại mà từ chính cái chạm tay của bạn vào mặt trống"
            </p>
            <div class="mt-5 rounded-2xl bg-xoan-cream p-5">
              <strong>Chuỗi trải nghiệm đề xuất</strong>
              <p class="muted mt-2 text-sm">
                ① Chạm Không Gian<br>② Thấu Thanh Âm<br>③ Hòa Nhịp Phách<br>④ Giữ Ký Ức
              </p>
            </div>
          </div>
        </div>

        <div class="real-photos">
          <div class="real-photo">
            <span>Không gian diễn xướng</span>
          </div>
          <div class="real-photo">
            <span>Truyền dạy qua thế hệ</span>
          </div>
          <div class="real-photo">
            <span>Nhịp trống & phách</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-o2o py-20 bg-[#F7F0E1]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="tryon">
          <div class="grid lg:grid-cols-[.9fr_1.1fr] gap-8 items-center">
            <div>
              <div class="o2o-kicker">02 · Ướm Thử Sắc Xoan</div>
              <h2 class="font-serifvn text-4xl mt-2">
                Chuẩn bị trang phục trước khi đến!
              </h2>
              <p class="muted mt-4">
                Bản demo bật camera trước để mô phỏng lớp try-on. Nhận diện khuôn mặt thật có thể nối sau bằng AR/Face Filter.
              </p>
              <button
                id="tryOnBtn"
                class="o2o-btn o2o-primary mt-6"
                type="button"
              >
                🎭 Thử áo the khăn xếp ảo
              </button>
              <button
                id="closeTryOn"
                class="o2o-btn o2o-outline mt-6"
                style="display:none"
                type="button"
              >
                Tắt camera
              </button>
            </div>

            <div>
              <div class="tryon-preview" id="tryonPreview">
                <div class="tryon-person" id="tryonPerson"></div>
                <div class="absolute top-4 right-4 rounded-full bg-white/75 px-3 py-1 text-xs">
                  TRY-ON · DEMO
                </div>
                <video
                  id="tryOnVideo"
                  class="absolute inset-0 w-full h-full object-cover hidden"
                  autoplay
                  playsinline
                  muted
                ></video>
                <div
                  id="tryOnHint"
                  class="absolute bottom-4 left-4 right-4 text-center text-xs bg-black/35 text-white rounded-full px-3 py-2"
                >
                  Bấm “Thử áo...” để dùng camera trước
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-o2o py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-[1.15fr_.85fr] gap-7">
          <div class="social-card">
            <div class="o2o-kicker">03 · Không Gian Hữu Hạn</div>
            <h2 class="font-serifvn text-3xl mt-2">
              Đừng chỉ là “khách du lịch online”
            </h2>

            <div class="fomo mt-6">
              <div class="text-sm">
                <strong>
                  THÔNG TIN DEMO – CẦN THAY BẰNG DỮ LIỆU TOUR THẬT
                </strong>
              </div>
              <p class="mt-2 text-sm">
                Không gian sân đình có hạn, mỗi đêm diễn chỉ đón tối đa <b>30 vị khách</b>.
              </p>

              <div class="mt-4 flex justify-between text-xs">
                <span>Chỗ đã giữ</span>
                <b style="color:#9b332c">25 / 30</b>
              </div>

              <div class="progress mt-2">
                <span></span>
              </div>

              <p class="mt-2 text-xs">
                <b>Chỉ còn 5 chỗ cho đêm diễn thứ Bảy này!</b> · Nội dung minh họa.
              </p>
            </div>
          </div>

          <div class="voucher-card voucher">
            <div class="o2o-kicker">04 · Quà Tặng Đồng Hành</div>
            <h2 class="font-serifvn text-3xl mt-2">🎫 Voucher lấp lánh</h2>
            <p class="muted mt-3">
              Lệnh bài AR có thể mang theo mã ưu đãi mẫu khi chuyển sang trang tour.
            </p>

            <div class="mt-5 rounded-2xl bg-white/70 p-5 border border-[#d7bd79]">
              <div class="text-xs uppercase tracking-[.18em]">Mã ưu đãi</div>
              <div class="font-serifvn text-3xl mt-1">XOAN20</div>
              <div class="mt-2 text-sm">
                <b>Giảm 20% giá vé</b> + <b>01 phần thịt chua</b> · Demo
              </div>
              <div id="priceDisplay" class="mt-4 pt-3 border-t border-dashed border-xoan-wood/20">
                <div class="flex items-baseline gap-3">
                  <span id="originalPrice" class="text-sm text-xoan-wood/60 line-through">500.000đ</span>
                  <span id="discountedPrice" class="text-xl font-bold text-xoan-red">400.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="dat-lich"
      class="section-o2o py-20 bg-[#F7F0E1]"
      style="padding-bottom:150px"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="o2o-kicker">05 · Bắt Đầu Hành Trình Ngay Hôm Nay</div>
          <h2 class="font-serifvn text-4xl sm:text-5xl mt-2">
            Sẵn sàng bước qua cánh cửa?
          </h2>
          <p class="mt-4 muted">
            Điền thông tin. Prototype này có thể nối PHP + MySQL và thanh toán ở bước sau.
          </p>
        </div>

        <div class="benefits mt-10">
          <div class="booking-card">
            <form id="bookingForm" class="booking-form">
              <div class="field">
                <label>Họ và tên</label>
                <input id="fullName" required>
              </div>

              <div class="field">
                <label>Số điện thoại</label>
                <input id="phone" required>
              </div>

              <div class="field">
                <label>Ngày đi</label>
                <input id="visitDate" type="date" required>
              </div>

              <div class="field">
                <label>Số khách</label>
                <input id="people" type="number" min="1" value="2" required>
              </div>

              <div class="field full">
                <label>Email</label>
                <input id="email" type="email" required>
              </div>

              <div class="field full">
                <label>Mã ưu đãi</label>
                <input id="discountCode" value="XOAN20">
              </div>

              <button
                class="o2o-btn o2o-primary full"
                type="submit"
              >
                🎟️ Xác nhận đặt lịch
              </button>
            </form>

            <div id="bookingResult" class="success-panel hide mt-5"></div>
          </div>

          <div class="booking-card">
            <div class="o2o-kicker">THANH TOÁN · DEMO</div>
            <h3 class="font-serifvn text-3xl mt-2">
              QR thanh toán nhanh
            </h3>
            <p class="muted mt-3">
              QR dưới đây chỉ là mã mẫu. Thay bằng QR thanh toán thật khi có thông tin tài khoản nhận tiền.
            </p>

            <div class="qr-box mt-5">
              <img
                src="../assets/qr-demo.svg"
                alt="QR thanh toán demo"
              >
              <div class="text-sm">
                <b>HÁT XOAN TOUR</b>
                <br>
                Mã đơn: tạo sau khi gửi form
                <br>
                Số tiền: cập nhật theo giá tour thực tế
              </div>
            </div>

            <div class="mt-6 rounded-2xl bg-xoan-cream p-5 text-sm">
              <b>Sau khi đặt:</b>
              <br>
              1. Hệ thống lưu Họ tên + SĐT + Ngày đi + Mã AR.
              <br>
              2. Sinh mã đặt chỗ/vé điện tử.
              <br>
              3. Gửi hướng dẫn thanh toán và xác nhận tour.
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="sticky-cta">
      <div class="inner">
        <span class="sticky-note">
          Ưu đãi demo <b style="color:#D8B873">-20%</b>
        </span>
        <a class="sticky-main" href="#dat-lich">
          🎟️ ĐẶT LỊCH ĐẾN ĐÌNH NGAY · DÙNG ƯU ĐÃI 20%
        </a>
      </div>
    </div>
  </main>
  <?php include __DIR__ . '/../includes/chatbot.php'; ?>
  <footer class="bg-[#20120e] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="footer-grid-o2o grid md:grid-cols-3 gap-8">
        <div>
          <div class="font-serifvn text-xl text-xoan-gold">HÁT XOAN</div>
          <p class="mt-3 text-sm text-white/55 leading-6">
            Prototype website tập trung vào AR và hành trình từ trải nghiệm số đến tour thực tế.
          </p>
        </div>

        <div>
          <div class="font-semibold text-xoan-gold">Khám phá</div>
          <a class="block mt-3 text-sm text-white/60" href="../pages/kham-pha-di-san.php">Khám phá di sản</a>
          <a class="block mt-2 text-sm text-white/60" href="../ar/index.php">Trải nghiệm AR</a>
        </div>

        <div>
          <div class="font-semibold text-xoan-gold">Trải nghiệm</div>
          <a class="block mt-3 text-sm text-white/60" href="../tour/index.php">Tour khám phá</a>
          <a class="block mt-2 text-sm text-white/60" href="../auth/login.php">Đăng nhập</a>
        </div>
      </div>

      <div class="mt-8 pt-5 border-t border-white/10 text-xs text-white/35">
        © <span id="year"></span> Hát Xoan · Prototype
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("year").textContent = new Date().getFullYear();

    const menuButton = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton?.addEventListener("click", () => {
      mobileMenu?.classList.toggle("hidden");
    });
  </script>
  <script>
    const queryString = new URLSearchParams(window.location.search);
    const discountCode = document.getElementById("discountCode");

    if (
      discountCode &&
      (
        queryString.get("discount") === "20" ||
        localStorage.getItem("hatXoanDiscount") === "20"
      )
    ) {
      discountCode.value = "XOAN20";
    }

    let tryOnStream = null;

    const tryOnButton = document.getElementById("tryOnBtn");
    const tryOnVideo = document.getElementById("tryOnVideo");
    const closeTryOn = document.getElementById("closeTryOn");
    const tryOnHint = document.getElementById("tryOnHint");
    const tryOnPerson = document.getElementById("tryonPerson");
    const bookingForm = document.getElementById("bookingForm");
    const bookingResult = document.getElementById("bookingResult");

    tryOnButton.addEventListener("click", async () => {
      try {
        tryOnStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user"
          },
          audio: false
        });

        tryOnVideo.srcObject = tryOnStream;
        tryOnVideo.classList.remove("hidden");
        tryOnPerson.classList.add("hidden");
        tryOnHint.textContent = "Camera trước đang bật · filter nhận diện mặt là phần nối tiếp";
        tryOnButton.style.display = "none";
        closeTryOn.style.display = "inline-flex";
      } catch (error) {
        tryOnHint.textContent = "Không mở được camera. Hãy cấp quyền Camera trên localhost/HTTPS.";
      }
    });

    closeTryOn.addEventListener("click", () => {
      if (tryOnStream) {
        tryOnStream.getTracks().forEach((track) => track.stop());
        tryOnStream = null;
      }

      tryOnVideo.srcObject = null;
      tryOnVideo.classList.add("hidden");
      tryOnPerson.classList.remove("hidden");
      tryOnButton.style.display = "inline-flex";
      closeTryOn.style.display = "none";
      tryOnHint.textContent = "Bấm “Thử áo...” để dùng camera trước";
    });

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      bookingResult.classList.remove("hide");
      bookingResult.innerHTML = `
        <div style="font-size:42px">✓</div>
        <h3 class="font-serifvn text-2xl">Đã tạo yêu cầu đặt lịch</h3>
        <p class="muted mt-2">
          Demo: ${document.getElementById("fullName").value}
          · ${document.getElementById("visitDate").value}
          · ${document.getElementById("people").value} khách
          · mã ${discountCode.value}
        </p>
        <p class="mt-3 o2o-note">
          Bản thật sẽ gửi dữ liệu này tới PHP + MySQL và sinh vé điện tử sau khi thanh toán được xác nhận.
        </p>
      `;

      bookingResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  </script>
  <script>
    // Handle voucher state from AR game
    const hasVoucher = localStorage.getItem('hasVoucher') === 'true';
    const voucherBanner = document.getElementById('voucherBanner');
    const arPrompt = document.getElementById('arPrompt');
    const originalPrice = document.getElementById('originalPrice');
    const discountedPrice = document.getElementById('discountedPrice');

    if (hasVoucher) {
      voucherBanner?.classList.remove('hidden');
      arPrompt?.classList.add('hidden');
      discountCode.value = 'XOAN20';
      // Show strikethrough original price
      originalPrice?.classList.remove('hidden');
      discountedPrice.textContent = '400.000đ';
    } else {
      arPrompt?.classList.remove('hidden');
      voucherBanner?.classList.add('hidden');
      originalPrice?.classList.add('hidden');
      discountedPrice.textContent = '500.000đ';
    }
  </script>

</body>
</html>
