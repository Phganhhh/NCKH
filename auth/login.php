<?php $base='../'; $pageTitle='Đăng nhập';
 include '../includes/header.php'; ?>
 <section class="tour-banner">
    <div class="tour-max">
        <div class="o2o-kicker" style="color:#D8B873">
            TÀI KHOẢN
        </div>
        <h1></h1>
    </div>
</section>
<section class="py-16">
    <div class="max-w-md mx-auto px-4">
        <form class="tour-form">
            <div class="field">
                <label>Email</label>
                <input type="email" required>
            </div>
            <div class="field">
                <label>Mật khẩu</label>
                <input type="password" required>
            </div>
            <button class="w-full rounded-xl bg-xoan-red text-white py-3 font-semibold">Đăng nhập </button>
        </form>
    </div>
</section>
<?php include '../includes/footer.php'; ?>