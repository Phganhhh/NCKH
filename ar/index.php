<?php
$pageTitle = 'Hát Xoan · AR Portal';
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
    :root {
      --ink: #291813;
      --wood: #4A2B20;
      --clay: #8B2F26;
      --red: #9B332C;
      --gold: #D8B873;
      --cream: #F6EFDF;
      --moss: #4B5A43;
      --paper: #FBF7ED;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(circle at 10% 10%, rgba(216,184,115,.12), transparent 22%),
        radial-gradient(circle at 90% 70%, rgba(75,90,67,.08), transparent 20%),
        var(--paper);
      font-family: "Be Vietnam Pro", Arial, sans-serif;
    }

    .ornament-corner {
      position: absolute;
      width: 80px;
      height: 80px;
      opacity: .8;
      pointer-events: none;
      background:
        linear-gradient(90deg, rgba(216,184,115,.7) 1px, transparent 1px) 0 0/14px 14px,
        linear-gradient(rgba(216,184,115,.7) 1px, transparent 1px) 0 0/14px 14px;
      mask: linear-gradient(135deg, black 0 65%, transparent 66%);
      -webkit-mask: linear-gradient(135deg, black 0 65%, transparent 66%);
    }

    .ornament-tl {
      top: 0;
      left: 0;
    }

    .ornament-tr {
      top: 0;
      right: 0;
      transform: scaleX(-1);
    }

    .ornament-bl {
      bottom: 0;
      left: 0;
      transform: scaleY(-1);
    }

    .ornament-br {
      bottom: 0;
      right: 0;
      transform: scale(-1);
    }

    .hero-overlay {
      background:
        linear-gradient(90deg, rgba(24,10,7,.92) 0%, rgba(38,18,12,.72) 45%, rgba(24,10,7,.18) 100%),
        linear-gradient(0deg, rgba(24,10,7,.55), transparent 35%);
    }

    .hero-img {
      image-rendering: -webkit-optimize-contrast;
    }

    .texture {
      background-image: radial-gradient(rgba(74,43,32,.055) 1px, transparent 1px);
      background-size: 12px 12px;
    }

    .gold-line::before,
    .gold-line::after {
      content: "";
      display: inline-block;
      width: 58px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold));
      vertical-align: middle;
      margin: 0 14px;
    }

    .gold-line::after {
      background: linear-gradient(90deg, var(--gold), transparent);
    }

    .card-image {
      transition: transform .65s cubic-bezier(.2,.7,.2,1);
    }

    .cultural-card:hover .card-image {
      transform: scale(1.06);
    }

    .cultural-card {
      transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
    }

    .cultural-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 22px 55px rgba(50,28,18,.16);
    }

    .play-ring {
      box-shadow: 0 0 0 0 rgba(216,184,115,.55);
      animation: pulseGold 2.1s infinite;
    }

    @keyframes pulseGold {
      0% {
        box-shadow: 0 0 0 0 rgba(216,184,115,.45);
      }

      70% {
        box-shadow: 0 0 0 12px rgba(216,184,115,0);
      }

      100% {
        box-shadow: 0 0 0 0 rgba(216,184,115,0);
      }
    }

    .float-in {
      animation: floatIn .7s ease both;
    }

    @keyframes floatIn {
      from {
        opacity: 0;
        transform: translateY(18px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chatbot-shadow {
      box-shadow: 0 25px 65px rgba(54,30,22,.25);
    }

    .modal-hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(12px);
    }

    .modal-visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .nav-shadow {
      box-shadow: 0 8px 35px rgba(37,19,13,.11);
      backdrop-filter: blur(14px);
    }

    .section-anchor {
      scroll-margin-top: 94px;
    }

    @media (max-width: 767px) {
      .gold-line::before,
      .gold-line::after {
        width: 24px;
        margin: 0 8px;
      }

      body {
        overflow-x: hidden;
        padding-bottom: 68px;
      }

      a,
      button {
        -webkit-tap-highlight-color: transparent;
      }

      main button,
      main a {
        min-height: 44px;
      }

      .mobile-open {
        display: block !important;
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
        <a href="../ar/index.php" class="rounded-full bg-xoan-red px-4 py-2">Trải nghiệm AR</a>
        <a href="../tour/index.php">Tour khám phá</a>
        <a href="../auth/login.php">Đăng nhập</a>
      </div>
      <button id="menuBtn" aria-label="Mở menu" class="lg:hidden w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">☰</button>
    </div>
    <div id="mobileMenu" class="lg:hidden hidden border-t border-white/10 bg-[#20120e]/95">
      <div class="max-w-7xl mx-auto px-4 py-4 grid gap-1 text-sm">
        <a href="../index.php" class="py-3">Trang chủ</a>
        <a href="../pages/kham-pha-di-san.php" class="py-3">Khám phá di sản</a>
        <a href="../ar/index.php" class="py-3 text-xoan-gold">Trải nghiệm AR</a>
        <a href="../tour/index.php" class="py-3">Tour khám phá</a>
        <a href="../auth/login.php" class="py-3">Đăng nhập</a>
      </div>
    </div>
  </nav>
</header>

  <main>
    <section class="ar-camera-page">
      <video
        id="cameraVideo"
        class="camera-video"
        autoplay
        playsinline
        muted
      ></video>

      <div class="camera-shade"></div>

      <div class="portal-shell">
        <div class="portal-top">
          <a href="../index.php" class="glass">← Trang chủ</a>
          <div class="glass">CỔNG KHÔNG GIAN</div>
          <button
            id="switchCamera"
            class="glass"
            style="cursor:pointer"
            type="button"
          >↻</button>
        </div>

        <div class="portal-door">
          <div class="portal-scene">
            <div class="portal-stage"></div>
            <button
              id="tokenBtn"
              class="token"
              title="Chạm để thu thập"
              type="button"
            >✦</button>
          </div>
        </div>

        <div class="portal-bottom">
          <div class="o2o-kicker" style="color:#D8B873"></div>
          <h1 class="font-serifvn text-3xl sm:text-5xl mt-2">
            Bước qua cánh cửa đến Đình Lãi Lèn
          </h1>
          <p
            id="arStatus"
            class="mt-3 text-white/65 max-w-2xl mx-auto"
          >
            Khi bạn bấm “Mở AR Portal”, trình duyệt sẽ xin quyền camera. Sau đó chạm Lệnh bài ảo để thu thập.
          </p>

          <button
            id="openPortal"
            class="o2o-btn o2o-gold mt-5"
            type="button"
          >
            🚪 Mở AR Portal · Bước qua cánh cửa
          </button>

          <button
            id="collectToken"
            class="o2o-btn o2o-primary collect-btn"
            type="button"
          >
            ✦ Chạm để thu thập Lệnh bài
          </button>

          <div class="mt-4 text-xs text-white/40">
            Prototype: nhận diện không gian/360° thật cần nối MindAR/WebXR/ZapWorks.
          </div>
        </div>
      </div>
    </section>

    <div id="popup" class="ar-popup-backdrop hide">
      <div class="ar-popup">
        <div class="seal-video">✦</div>
        <div class="popup-content">
          <p class="o2o-kicker">LỆNH BÀI ĐÃ ĐƯỢC MỞ KHÓA</p>
          <h2 class="font-serifvn">Màn hình nhỏ không chứa hết âm vang ngàn năm...</h2>
          <p>
            Bạn đã nhìn thấy phong pháo ảo bung nở, nhưng bạn đã bao giờ cảm nhận nhịp rung của chiếc trống cái dội vào lồng ngực giữa sân Đình Lãi Lèn chập tối?
          </p>
          <a
            id="unlockReal"
            href="../tour/index.php?discount=20"
            class="o2o-btn o2o-primary"
            style="width:100%;margin-top:8px"
          >
            🔓 MỞ KHÓA TRẢI NGHIỆM THẬT
          </a>
          <button
            id="keepWeb"
            class="secondary-link"
            type="button"
          >
            Chỉ xem tiếp trên web
          </button>
        </div>
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
          <a class="block mt-2 text-sm text-white/60" href="../chatbot/index.php">Hỏi đáp</a>
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
    const cameraVideo = document.getElementById("cameraVideo");
    const openPortal = document.getElementById("openPortal");
    const collectToken = document.getElementById("collectToken");
    const tokenButton = document.getElementById("tokenBtn");
    const popup = document.getElementById("popup");
    const keepWeb = document.getElementById("keepWeb");
    const unlockReal = document.getElementById("unlockReal");
    const status = document.getElementById("arStatus");
    const switchCamera = document.getElementById("switchCamera");

    let stream = null;
    let facing = "environment";

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }

      cameraVideo.srcObject = null;
    }

    async function startCamera() {
      stopCamera();

      if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent = "Trình duyệt không hỗ trợ Camera API.";
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: facing
            }
          },
          audio: false
        });

        cameraVideo.srcObject = stream;
        status.textContent = "Camera đã bật. Hãy đưa điện thoại về phía cánh cửa, sau đó chạm Lệnh bài ảo.";
        openPortal.style.display = "none";
        collectToken.classList.add("show");
      } catch (error) {
        status.textContent = "Không mở được camera. Trên localhost/HTTPS hãy cấp quyền Camera rồi thử lại.";
      }
    }

    function collectUnlockToken() {
      localStorage.setItem("hatXoanToken", "1");
      localStorage.setItem("hatXoanTokenAt", new Date().toISOString());
      popup.classList.remove("hide");
      status.textContent = "Lệnh bài đã được lưu trong LocalStorage.";
    }

    openPortal.addEventListener("click", startCamera);
    collectToken.addEventListener("click", collectUnlockToken);
    tokenButton.addEventListener("click", collectUnlockToken);

    switchCamera.addEventListener("click", () => {
      facing = facing === "environment" ? "user" : "environment";
      startCamera();
    });

    keepWeb.addEventListener("click", () => {
      popup.classList.add("hide");
    });

    unlockReal.addEventListener("click", () => {
      localStorage.setItem("hatXoanDiscount", "20");
      localStorage.setItem("hasVoucher", "true");
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("won") === "1") {
      popup.classList.remove("hide");
      localStorage.setItem("hatXoanToken", "1");
      localStorage.setItem("hatXoanDiscount", "20");
      localStorage.setItem("hasVoucher", "true");
    }

    window.addEventListener("beforeunload", stopCamera);
  </script>

</body>
</html>
