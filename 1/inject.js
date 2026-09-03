(function () {
'use strict';

const audioMap = {
    "shoot-1-B4Ou7JVe.mp3": "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/caijue9.mp3",
    "CHebbQhG":               "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/baotou11.mp3",
    "kill4":                 "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/zhandi52.mp3",
    "kill7":                 "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/zhandi52.mp3",
    "Draw":               "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/fuhuo.mp3",
    "shoot-1-CUe":          "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/heiqishi4.mp3",
    "shoot-2-DM":           "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/heiqishi4.mp3",
    "8-yOVI0000":               "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/jizhong12.mp3",
    "AKM%20Cocking":        "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/aklasuan.mp3",
    "shoot-2-D02":          "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/leng.mp3",
    "M16%20Single%20Shot%": "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/leng.mp3",
    "D9iwdnrv":             "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/heiqishi4.mp3",
    "20Cocking-Cq_Yi_AE":             "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/aklasuan.mp3",
    "AKM%20Mag%20Out-DWOYmd7e": "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/cfleishen3.mp3",
    "AWM%20Mag%20IN-9CHq1LhT":  "https://cryzen.io/assets/AKM%20Mag%20IN-HByT7WhJ.mp3",
    "kill2":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/zhandi2.mp3",
    "draw-C15P":  "https://cryzen.io/assets/take-BVB2SIm_.mp3",
    "ladder":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/boom.mp3",
    "shoot-Bo40":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/gaya1.mp3",
    "explosion-CJ":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/gaya1.mp3",
    "shoot-CnEX":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/r993.mp3",
    "kill2":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/zhandi2.mp3",
    "Floor_step1":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/concrete_ct_01.mp3",
    "Floor_step2":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/concrete_ct_02.mp3",
    "Floor_step3":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/concrete_ct_03.mp3",
    "Floor_step4":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/concrete_ct_04.mp3",
    "AWM%20Cocking-Cidf1B":  "https://cdn.jsdelivr.net/gh/onlyson9/yinxiao@main/huanshenlashuan2.mp3",
};

const PASSTHROUGH = ["Glock%20Draw", "Butterfly%20Draw"];
const audioCache = new Map();

async function preloadAudio() {
    for (const [key, url] of Object.entries(audioMap)) {
        try {
            const res = await fetch(url);
            const buf = await res.arrayBuffer();
            audioCache.set(key, buf);
        } catch (e) {}
    }
}
preloadAudio();

const originalFetch = window.fetch;
window.fetch = async function (input, init) {
    const url = (typeof input === 'string' ? input : input?.url) ?? '';
    if (PASSTHROUGH.some(k => url.includes(k))) return originalFetch.apply(this, arguments);
    for (const [key] of Object.entries(audioMap)) {
        if (url.includes(key)) {
            const buf = audioCache.get(key);
            if (buf) return new Response(buf.slice(0), { status: 200, headers: { 'Content-Type': 'audio/mpeg' } });
        }
    }
    return originalFetch.apply(this, arguments);
};

})();