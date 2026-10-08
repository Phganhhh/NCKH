<?php
$base = $base ?? '';
$pageTitle = $pageTitle ?? 'Hát Xoan Phú Thọ | Di sản trong tầm tay';
$currentPage = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$isHome = str_ends_with($currentPage, '/hat-xoan-final/index.php');

$isExplore = str_ends_with($currentPage, '/pages/kham-pha-di-san.php');

$isAR = ($currentPage === '/hat-xoan-final/ar/index.php');

$isTour = ($currentPage === '/hat-xoan-final/tour/index.php');

$isLogin = str_ends_with($currentPage, '/auth/login.php');
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Hát Xoan Phú Thọ – Di sản văn hóa phi vật thể đại diện của nhân loại.">
<title><?= htmlspecialchars($pageTitle) ?></title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&family=Noto+Serif:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            xoan: {
              ink: "#291813",
              wood: "#4A2B20",
              clay: "#8B2F26",
              red: "#9B332C",
              gold: "#D8B873",
              cream: "#F6EFDF",
              moss: "#4B5A43",
              olive: "#6A704E",
            }
          },
          fontFamily: {
            sansvn: ["Be Vietnam Pro", "Arial", "sans-serif"],
            serifvn: ["Noto Serif", "Georgia", "serif"],
            scriptvn: ["Dancing Script", "cursive"],
          },
          boxShadow: {
            cultural: "0 18px 55px rgba(55, 30, 20, .15)",
            gold: "0 12px 30px rgba(216, 184, 115, .18)"
          }
        }
      }
    };
  </script>
<link rel="stylesheet" href="<?= $base ?>assets/css/original.css">
<link rel="stylesheet" href="<?= $base ?>assets/css/site.css">
</head>
<body class="font-sansvn antialiased">
<header id="top" class="fixed top-0 left-0 right-0 z-50">
<nav id="navbar" class="bg-[#20120e]/80 text-white border-b border-white/10 nav-shadow transition-all duration-300">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
<a href="<?= $base ?>index.php" class="flex items-center gap-3 group">
<img src="<?= $base ?>images/logo.png" alt="Hát Xoan" class="w-11 h-11 rounded-full border border-xoan-gold/50 object-cover bg-white/5">
<div class="leading-tight"><div class="font-serifvn text-[21px] tracking-[.08em]">HÁT XOAN</div><div class="text-[10px] sm:text-[11px] text-white/65 tracking-[.18em] uppercase">Di sản Hát Xoan Phú Thọ</div></div>
</a>
<div class="hidden lg:flex items-center gap-3 text-sm">

    <a href="<?= $base ?>index.php"
       class="px-4 py-2 rounded-full transition
       <?= $isHome ? 'bg-xoan-red text-white' : 'text-white/80 hover:text-xoan-gold' ?>">
        Trang chủ
    </a>

    <a href="<?= $base ?>pages/kham-pha-di-san.php"
       class="px-4 py-2 rounded-full transition
       <?= $isExplore ? 'bg-xoan-red text-white' : 'text-white/80 hover:text-xoan-gold' ?>">
        Khám phá di sản
    </a>

    <a href="<?= $base ?>ar/index.php"
       class="py-3 <?= $isAR ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
        Trải nghiệm AR
    </a>

    <a href="<?= $base ?>tour/index.php"
       class="py-3 <?= $isTour ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
        Tour khám phá
    </a>

    <a href="<?= $base ?>auth/login.php"
       class="px-4 py-2 rounded-full transition
       <?= $isLogin ? 'bg-xoan-red text-white' : 'text-white/80 hover:text-xoan-gold' ?>">
        Đăng nhập
    </a>

</div>
<button id="menuBtn" aria-label="Mở menu" class="lg:hidden w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">☰</button>
</div>
<div id="mobileMenu" class="lg:hidden hidden border-t border-white/10 bg-[#20120e]/95">
<div class="max-w-7xl mx-auto px-4 py-4 grid gap-1 text-sm">
<a href="<?= $base ?>index.php" class="py-3">Trang chủ</a>
<a href="<?= $base ?>pages/kham-pha-di-san.php" class="py-3">Khám phá di sản</a>
<a href="<?= $base ?>ar/index.php" class="py-3">Trải nghiệm AR</a>
<a href="<?= $base ?>index.php"
   class="py-3 <?= $isHome ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
    Trang chủ
</a>

<a href="<?= $base ?>pages/kham-pha-di-san.php"
   class="py-3 <?= $isExplore ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
    Khám phá di sản
</a>

<a href="<?= $base ?>ar/index.php"
   class="py-3 <?= $isAR ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
    Trải nghiệm AR
</a>

<a href="<?= $base ?>tour/index.php"
   class="py-3 <?= $isTour ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
    Tour khám phá
</a>

<a href="<?= $base ?>auth/login.php"
   class="py-3 <?= $isLogin ? 'text-xoan-gold font-semibold' : 'text-white' ?>">
    Đăng nhập
</a>

<a href="<?= $base ?>auth/login.php" class="py-3">Đăng nhập</a>
</div></div>
</nav></header>
<main>
