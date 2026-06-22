document.addEventListener("DOMContentLoaded", () => {
    const sealTrigger = document.getElementById("seal-trigger");
    const envelopeFlap = document.getElementById("envelope-flap");
    const envelopeOverlay = document.getElementById("envelope-overlay");
    const mainContent = document.getElementById("main-content");
    const tapText = document.querySelector(".tap-text");

    // Click trigger on the transparent hotspot area
    sealTrigger.addEventListener("click", () => {
        sealTrigger.style.pointerEvents = "none";
        tapText.style.opacity = "0";
        
        // Move the envelope flap up smoothly
        setTimeout(() => {
            envelopeFlap.style.transform = "scaleY(-1) translateY(-100%)";
            envelopeFlap.style.opacity = "0"; 
        }, 100);

        // Show main website scroll layout
        setTimeout(() => {
            mainContent.classList.remove("hidden");
            initScratchCard(); 
        }, 500);

        // Clear out the black background overlay entirely
        setTimeout(() => {
            envelopeOverlay.style.opacity = "0";
            setTimeout(() => { 
                envelopeOverlay.style.display = "none"; 
            }, 600);
        }, 1200);
    });

    // COUNTDOWN CALCULATOR (Target: Nov 20, 2026)
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

    // GOLD SCRATCH INTERACTION ENGINE
    function initScratchCard() {
        const canvas = document.getElementById("scratch-canvas");
        const ctx = canvas.getContext("2d");
        let isDrawing = false;

        // Matte gold cover
        ctx.fillStyle = "#dfba73";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "600 13px Montserrat";
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