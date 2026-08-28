// DİL DESTEĞİ AYARLARI
const languages = {
    en: { title: "WonderLabs Media Editor", desc: "No downloads. No limits. Pure browser-powered free editing.", dropTitle: "Drop or Select Your Video / Audio Here", panelTitle: "WonderLabs Control Panel" },
    tr: { title: "WonderLabs Medya Düzenleyici", desc: "İndirme yok. Sınır yok. Sadece tarayıcınızın saf gücüyle düzenleyin.", dropTitle: "Videoyu veya Ses Dosyasını Buraya Bırakın veya Seçin", panelTitle: "WonderLabs Kontrol Paneli" }
};

const langSelect = document.getElementById('langSelect');
function changeLanguage(lang) {
    if (!languages[lang]) lang = 'en';
    langSelect.value = lang;
    document.getElementById('mainTitle').innerText = languages[lang].title;
    document.getElementById('mainDesc').innerText = languages[lang].desc;
    document.getElementById('dropTitle').innerText = languages[lang].dropTitle;
    document.getElementById('panelTitle').innerText = languages[lang].panelTitle;
}
const userLang = navigator.language || navigator.userLanguage;
changeLanguage(userLang.substring(0, 2));
langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

// EDİTÖR MOTORU ELEMANLARI
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const videoPlayer = document.getElementById('videoPlayer');
const editorPanel = document.getElementById('editorPanel');

// Düzenleme Elementleri
const volumeSlider = document.getElementById('volumeSlider');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const btnPreview = document.getElementById('btnPreview');
const btnMute = document.getElementById('btnMute');

dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const blobURL = URL.createObjectURL(file);
    videoPlayer.src = blobURL;
    videoPlayer.style.display = 'block';
    editorPanel.style.display = 'block'; // Düzenleme panelini aç

    // Video yüklendiğinde zaman çizelgesi sınırlarını ayarla
    videoPlayer.onloadedmetadata = () => {
        startTime.value = 0;
        endTime.value = Math.floor(videoPlayer.duration);
        startTime.max = videoPlayer.duration;
        endTime.max = videoPlayer.duration;
    };
    videoPlayer.play();
});

// 1. ANLIK SES DÜZENLEME (VOLUME)
volumeSlider.addEventListener('input', (e) => {
    videoPlayer.volume = e.target.value / 100;
});

// 2. ANLIK HIZ DÜZENLEME (SPEED / TIMELINE SPEED)
speedSlider.addEventListener('input', (e) => {
    const speed = e.target.value;
    videoPlayer.playbackRate = speed;
    speedValue.innerText = speed + "x";
});

// 3. ANLIK SES KAPATMA / AÇMA (MUTE)
btnMute.addEventListener('click', () => {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        btnMute.innerText = "Mute Audio / Sesi Kapat";
        btnMute.style.background = "#ff0033";
    } else {
        videoPlayer.muted = true;
        btnMute.innerText = "Unmute Audio / Sesi Aç";
        btnMute.style.background = "#00ac47";
    }
});

// 4. VİDEO/SES KIRPMA ÖNİZLEME (TRIM)
btnPreview.addEventListener('click', () => {
    const start = parseFloat(startTime.value);
    videoPlayer.currentTime = start;
    videoPlayer.play();

    // Zaman çizelgesini takip et, bitiş saniyesine gelince videoyu durdur/başa sar
    videoPlayer.ontimeupdate = () => {
        const end = parseFloat(endTime.value);
        if (videoPlayer.currentTime >= end) {
            videoPlayer.pause();
            videoPlayer.currentTime = start; // Başa sar
            videoPlayer.ontimeupdate = null; // Takibi kapat
            alert("Kırpma bölgesi başarıyla önizlendi!");
        }
    };
});
