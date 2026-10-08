</main><?php include __DIR__ . '/chatbot.php'; ?>
<footer class="bg-[#20120e] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-3 gap-8">
            <div>
                <div class="font-serifvn text-xl text-xoan-gold">HÁT XOAN</div>
                <p class="mt-3 text-sm text-white/55 leading-6">
                    Prototype website sử dụng PHP cho phần điều hướng và các chức năng có dữ liệu.</p>
                </div>
                <div>
                    <div class="font-serifvn font-semibold text-xoan-gold">Khám phá</div>
                    <a class="block mt-3 text-sm text-white/60" href="<?= $base ?>pages/kham-pha-di-san.php">Khám phá di sản</a>
                    <a class="block mt-2 text-sm text-white/60" href="<?= $base ?>ar/index.php">Trải nghiệm AR</a>
                </div>
                <div>
                    <div class="font-serifvn font-semibold text-xoan-gold">Trải nghiệm</div>
                    <a class="block mt-3 text-sm text-white/60" href="<?= $base ?>tour/index.php">Tour khám phá</a>
                    <a class="block mt-2 text-sm text-white/60" href="<?= $base ?>auth/login.php">Đăng nhập</a>
                </div>
            </div>
        </div>
        <div class="mt-8 pt-5 border-t border-white/10 text-xs text-white/35">© <?= date('Y') ?> Hát Xoan · PHP Prototype</div>
    </div>
</footer>
<script src="<?= $base ?>assets/js/site.js"></script>
</body></html>