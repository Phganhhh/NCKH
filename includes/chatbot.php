<style>
/* ===== CHATBOT NỔI ===== */
.chatbot-fab {
    position: fixed;
    right: 22px;
    bottom: 24px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background: #9B332C;
    color: white;
    cursor: pointer;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 30px rgba(41,24,19,.28);
    transition: transform .2s ease, box-shadow .2s ease;
}

.chatbot-fab:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 34px rgba(41,24,19,.34);
}

.chatbot-fab-icon {
    font-size: 26px;
    line-height: 1;
}

.chatbot-fab-label {
    position: absolute;
    right: 70px;
    background: #291813;
    color: white;
    padding: 8px 12px;
    border-radius: 10px;
    white-space: nowrap;
    font-size: 12px;
    opacity: 0;
    transform: translateX(8px);
    pointer-events: none;
    transition: .2s;
}

.chatbot-fab:hover .chatbot-fab-label {
    opacity: 1;
    transform: translateX(0);
}

/* Backdrop */
.chatbot-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 7, 5, .55);
    backdrop-filter: blur(4px);
    z-index: 9997;
    opacity: 0;
    visibility: hidden;
    transition: .25s;
}

.chatbot-backdrop.is-open {
    opacity: 1;
    visibility: visible;
}

/* Khung chat */
.chatbot-panel {
    position: fixed;
    right: 22px;
    bottom: 94px;
    width: 380px;
    max-width: calc(100vw - 30px);
    max-height: calc(100dvh - 110px);
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 70px rgba(41,24,19,.3);
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transform: translateY(15px) scale(.96);
    transform-origin: bottom right;
    transition: .25s cubic-bezier(.22,.61,.36,1);
    display: flex;
    flex-direction: column;
}

.chatbot-panel.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
}

/* Header */
.chatbot-head {
    background: linear-gradient(135deg, #8B2F26, #A83A31);
    color: white;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.chatbot-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #F4D39B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border: 2px solid rgba(255,255,255,.45);
    flex-shrink: 0;
}

.chatbot-head-title {
    font-family: 'Noto Serif', Georgia, serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.2;
}

.chatbot-head-sub {
    font-size: 11px;
    color: rgba(255,255,255,.78);
    margin-top: 2px;
}

.chatbot-close {
    margin-left: auto;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.2);
    background: rgba(255,255,255,.1);
    color: white;
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    display: grid;
    place-items: center;
    transition: .2s;
}

.chatbot-close:hover {
    background: rgba(255,255,255,.2);
}

/* Câu hỏi gợi ý */
.chatbot-quick {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 12px 14px;
    background: #FFFAF1;
    border-bottom: 1px solid #F0E4CB;
    flex-shrink: 0;
}

.chatbot-quick button {
    border: 1px solid #E5D6C3;
    background: white;
    color: #6E2A23;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s;
}

.chatbot-quick button:hover {
    background: #FFF5E6;
    border-color: #D8B873;
}

/* Nội dung chat */
.chatbot-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    background: #FFFAF1;
}

.chatbot-message {
    max-width: 85%;
    border-radius: 18px;
    padding: 11px 13px;
    font-size: 13.5px;
    line-height: 1.55;
    margin-top: 10px;
    width: fit-content;
}

.chatbot-message:first-child {
    margin-top: 0;
}

.chatbot-message.bot {
    background: white;
    color: #291813;
    border: 1px solid #F0E4CB;
}

.chatbot-message.user {
    margin-left: auto;
    background: #9B332C;
    color: white;
}

/* Ô nhập */
.chatbot-compose {
    padding: 12px 14px 14px;
    background: white;
    border-top: 1px solid #F0E4CB;
    display: flex;
    gap: 8px;
    flex-shrink: 0;
}

.chatbot-input {
    min-width: 0;
    flex: 1;
    border: 1px solid #E5D6C3;
    border-radius: 999px;
    padding: 11px 16px;
    background: white;
    font-size: 14px;
    outline: none;
    transition: .2s;
}

.chatbot-input:focus {
    border-color: #9B332C;
    box-shadow: 0 0 0 3px rgba(155,51,44,.08);
}

.chatbot-send {
    border: none;
    border-radius: 50%;
    width: 42px;
    height: 42px;
    background: #291813;
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: .2s;
    flex-shrink: 0;
}

.chatbot-send:hover {
    background: #9B332C;
}

/* Mobile */
@media (max-width: 767px) {
    .chatbot-fab {
        right: 16px;
        bottom: 78px;
        width: 54px;
        height: 54px;
    }

    .chatbot-fab-label {
        display: none;
    }

    .chatbot-panel {
        right: 12px;
        left: 12px;
        bottom: 144px;
        width: auto;
        max-height: calc(100dvh - 160px);
    }

    .chatbot-body {
        min-height: 250px;
    }
}
</style>

<!-- Nút bong bóng chat -->
<button
    id="chatbotFab"
    class="chatbot-fab"
    type="button"
    aria-label="Mở Hỏi đáp về Hát Xoan"
    aria-expanded="false"
    aria-controls="chatbotPanel">
    <span class="chatbot-fab-icon">💬</span>
    <span class="chatbot-fab-label">Hỏi đáp về Hát Xoan</span>
</button>

<!-- Backdrop -->
<div id="chatbotBackdrop" class="chatbot-backdrop"></div>

<!-- Khung chat popup -->
<section
    id="chatbotPanel"
    class="chatbot-panel"
    aria-hidden="true">

    <div class="chatbot-head">
        <div class="chatbot-avatar">🧑🏻‍🎤</div>
        <div>
            <div class="chatbot-head-title">Hỏi đáp về Hát Xoan</div>
            <div class="chatbot-head-sub">Trợ lý di sản · Gemini + RAG</div>
        </div>
        <button id="chatbotClose" class="chatbot-close" type="button" aria-label="Đóng khung chat">×</button>
    </div>

    <div class="chatbot-quick">
        <button type="button" data-chat-question="Hát Xoan là gì?">Hát Xoan là gì?</button>
        <button type="button" data-chat-question="Có mấy chặng?">Có mấy chặng?</button>
        <button type="button" data-chat-question="UNESCO ghi danh?">UNESCO ghi danh?</button>
        <button type="button" data-chat-question="Làn điệu nào?">Làn điệu nào?</button>
    </div>

    <div id="chatbotBody" class="chatbot-body">
        <div class="chatbot-message bot">
            Xin chào! Tôi là trợ lý AI về di sản Hát Xoan Phú Thọ 🌸<br>
            Hãy hỏi tôi bất kỳ điều gì về lịch sử, ba chặng hát, làn điệu hoặc nghệ nhân Xoan.
        </div>
    </div>

    <div class="chatbot-compose">
        <input
            id="chatbotInput"
            class="chatbot-input"
            type="text"
            placeholder="Nhập câu hỏi về Hát Xoan...">
        <button id="chatbotSend" class="chatbot-send" type="button" aria-label="Gửi câu hỏi">
            →
        </button>
    </div>

</section>

<script>
(function () {
    const chatbotFab = document.getElementById("chatbotFab");
    const chatbotPanel = document.getElementById("chatbotPanel");
    const chatbotBackdrop = document.getElementById("chatbotBackdrop");
    const chatbotClose = document.getElementById("chatbotClose");
    const chatbotInput = document.getElementById("chatbotInput");
    const chatbotSend = document.getElementById("chatbotSend");
    const chatbotBody = document.getElementById("chatbotBody");
    const chatbotQuick = document.querySelectorAll("[data-chat-question]");

    if (!chatbotFab || !chatbotPanel) return;

    function openChat() {
        chatbotPanel.classList.add("is-open");
        chatbotBackdrop?.classList.add("is-open");
        chatbotFab.setAttribute("aria-expanded", "true");
        chatbotPanel.setAttribute("aria-hidden", "false");
        setTimeout(() => chatbotInput?.focus(), 100);
    }

    function closeChat() {
        chatbotPanel.classList.remove("is-open");
        chatbotBackdrop?.classList.remove("is-open");
        chatbotFab.setAttribute("aria-expanded", "false");
        chatbotPanel.setAttribute("aria-hidden", "true");
    }

    chatbotFab.addEventListener("click", () => {
        if (chatbotPanel.classList.contains("is-open")) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatbotClose?.addEventListener("click", closeChat);
    chatbotBackdrop?.addEventListener("click", closeChat);

    function addMessage(text, isUser) {
        const div = document.createElement("div");
        div.className = "chatbot-message " + (isUser ? "user" : "bot");
        div.innerHTML = text;
        chatbotBody.appendChild(div);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function getAnswer(question) {
        const text = question.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

        if (text.includes("tour") || text.includes("tham gia")) {
            return "Tour giúp bạn tìm hiểu không gian diễn xướng Hát Xoan, xem biểu diễn và kết hợp trải nghiệm AR với trải nghiệm thực tế. Bạn có thể vào mục Tour khám phá để xem lịch trình.";
        }

        if (text.includes("ar") || text.includes("thuc te tang cuong")) {
            return "Bạn hãy mở mục Trải nghiệm AR để bắt đầu quét nội dung Hát Xoan bằng camera điện thoại.";
        }

        if (text.includes("3 chang") || text.includes("ba chang") || text.includes("may chang")) {
            return "Website giới thiệu Hát Xoan theo 3 chặng: hát nghi lễ, hát quả cách và hát hội.";
        }

        if (text.includes("lich su") || text.includes("nguon goc")) {
            return "Hát Xoan là loại hình dân ca cổ của vùng Phú Thọ, gắn với tục thờ Hùng Vương. Năm 2011 được UNESCO ghi danh cần bảo vệ khẩn cấp, đến 2017 được chuyển sang danh sách Di sản văn hóa phi vật thể đại diện của nhân loại.";
        }

        if (text.includes("unesco")) {
            return "Hát Xoan được UNESCO ghi danh năm 2011 (cần bảo vệ khẩn cấp) và 2017 (di sản văn hóa phi vật thể đại diện của nhân loại).";
        }

        if (text.includes("lan dieu") || text.includes("dieu")) {
            return "Các làn điệu tiêu biểu gồm Giáo trống - Giáo pháo, Tứ mùa cách, Mó cá... mỗi bài mang sắc thái nghi lễ, chúc phúc hoặc giao duyên khác nhau.";
        }

        if (text.includes("nghe nhan") || text.includes("truong phuong")) {
            return "Các nghệ nhân nổi bật có Trùm phường Xoan An Thái Nguyễn Thị Lịch và Trùm phường Phù Đức Nguyễn Xuân Hội. Họ đóng vai trò quan trọng trong việc truyền dạy và bảo tồn di sản.";
        }

        return "Mình có thể giúp bạn tìm hiểu về Hát Xoan, trải nghiệm AR và tour. Bạn có thể hỏi: Tour có gì? AR hoạt động thế nào? Hát Xoan có mấy chặng?";
    }

    function sendChat(question) {
        const message = question.trim();
        if (!message) return;

        addMessage(message, true);
        chatbotInput.value = "";

        setTimeout(() => {
            addMessage(getAnswer(message), false);
        }, 400);
    }

    chatbotSend.addEventListener("click", () => sendChat(chatbotInput.value));

    chatbotInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendChat(chatbotInput.value);
        }
    });

    chatbotQuick.forEach((button) => {
        button.addEventListener("click", () => {
            sendChat(button.dataset.chatQuestion);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeChat();
    });
})();
</script>
