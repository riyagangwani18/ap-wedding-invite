document.addEventListener("DOMContentLoaded", () => {
    const waxSeal = document.getElementById("wax-seal");
    const envelopeFlap = document.getElementById("envelope-flap");
    const envelopeOverlay = document.getElementById("envelope-overlay");
    const mainContent = document.getElementById("main-content");

    waxSeal.addEventListener("click", () => {
        // Pop scaling transition on click
        waxSeal.style.transform = "translate(-50%, -50%) scale(0.8)";
        waxSeal.style.opacity = "0";
        waxSeal.style.pointerEvents = "none";
        
        setTimeout(() => {
            envelopeFlap.style.transform = "scaleY(-1) translateY(-100%)";
        }, 300);

        setTimeout(() => {
            mainContent.classList.remove("hidden");
            initScratchCard();
        }, 600);

        setTimeout(() => {
            envelopeOverlay.style.opacity = "0";
            setTimeout(() => { envelopeOverlay.style.display = "none"; }, 600);
        }, 1400);
    });

    // TIMING TARGETING NOVEMBER 20, 2026
    const targetDate = new Date("November 20, 2026 00:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.getElementById("countdown-container").innerHTML = "The Wedding Day is Here!";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    };
    setInterval(updateTimer, 1000);

    // MATTE GOLD COATING LAYER
    function initScratchCard() {
        const canvas = document.getElementById("scratch-canvas");
        const ctx = canvas.getContext("2d");
        let isDrawing = false;

        ctx.fillStyle = "#dfba73";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "13px Montserrat";
        ctx.textAlign = "center";
        ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2 + 5);

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 24, 0, Math.PI * 2);
            ctx.fill();
        };

        const getPosition = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.touches) {
                return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
            }
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        canvas.addEventListener("mousedown", (e) => { isDrawing = true; const pos = getPosition(e); scratch(pos.x, pos.y); });
        canvas.addEventListener("touchstart", (e) => { isDrawing = true; const pos = getPosition(e); scratch(pos.x, pos.y); });
        
        canvas.addEventListener("mousemove", (e) => { if (!isDrawing) return; const pos = getPosition(e); scratch(pos.x, pos.y); });
        canvas.addEventListener("touchmove", (e) => { if (!isDrawing) return; const pos = getPosition(e); scratch(pos.x, pos.y); });

        window.addEventListener("mouseup", () => isDrawing = false);
        window.addEventListener("touchend", () => isDrawing = false);
    }
});