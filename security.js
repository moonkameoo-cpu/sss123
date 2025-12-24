(function () {
    'use strict';

    /* ===== CONFIG ===== */
    const WEBHOOK = "https://discord.com/api/webhooks/1453401408295534696/mX81SmFuMhleTYu90IVgk9e6dWajyKCuZU83aeHNFf4AYYOmQEB2odtMF2CP4ajexTJe";
    const REDIRECT_URL = "https://google.com";
    const SOUND = "alert.mp3";

    const audio = new Audio(SOUND);
    audio.volume = 0.8;

    /* ===== POPUP ===== */
    const lock = document.createElement("div");
    lock.id = "cyber-lock";
    lock.innerHTML = `
        <div class="cyber-box">
            <h1>ACCESS BLOCKED</h1>
            <p>UNAUTHORIZED DEBUGGING DETECTED</p>
        </div>`;
    document.body.appendChild(lock);

    function showLock(reason) {
        lock.style.display = "flex";
        audio.play().catch(()=>{});
        collectAndSend(reason);
        setTimeout(() => location.href = REDIRECT_URL, 3000);
    }

    /* ===== FINGERPRINT ===== */
    function fingerprint() {
        return {
            ua: navigator.userAgent,
            lang: navigator.language,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen: `${screen.width}x${screen.height}`
        };
    }

    /* ===== IP + COUNTRY ===== */
    async function getIP() {
        try {
            const r = await fetch("https://ipapi.co/json/");
            return await r.json();
        } catch {
            return {};
        }
    }

    /* ===== DISCORD LOG ===== */
    async function collectAndSend(reason) {
        if (!WEBHOOK) return;

        const fp = fingerprint();
        const ip = await getIP();

        fetch(WEBHOOK, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username: "CYBER SECURITY",
                embeds: [{
                    title: "🚨 INSPECT ATTEMPT",
                    color: 16711701,
                    fields: [
                        { name: "Reason", value: reason },
                        { name: "IP", value: ip.ip || "Unknown" },
                        { name: "Country", value: ip.country_name || "Unknown" },
                        { name: "User Agent", value: fp.ua.slice(0, 100) },
                        { name: "Screen", value: fp.screen },
                        { name: "Timezone", value: fp.tz }
                    ],
                    footer: { text: new Date().toLocaleString() }
                }]
            })
        }).catch(()=>{});
    }

    /* ===== BLOCK BASIC ===== */
    document.addEventListener("contextmenu", e => {
        e.preventDefault();
        showLock("Right Click");
    });

    document.addEventListener("keydown", e => {
        const k = e.key.toLowerCase();
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["i","j","c"].includes(k)) ||
            (e.ctrlKey && ["u","s"].includes(k))
        ) {
            e.preventDefault();
            showLock("Keyboard Shortcut");
        }
    });

    /* ===== DEVTOOLS SIZE DETECT ===== */
    setInterval(() => {
        if (
            window.outerWidth - window.innerWidth > 160 ||
            window.outerHeight - window.innerHeight > 160
        ) {
            showLock("DevTools Window");
        }
    }, 700);

    /* ===== ANTI DEBUG TIMING TRAP ===== */
    setInterval(() => {
        const t = performance.now();
        debugger;
        if (performance.now() - t > 100) {
            showLock("Debugger Timing Trap");
        }
    }, 500);

})();
