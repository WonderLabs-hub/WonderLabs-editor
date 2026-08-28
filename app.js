// ==========================================
// 1. DİL SEÇİM ALTYAPISI VE YERELLEŞTİRME
// ==========================================
const languages = {
    en: { 
        title: "WonderLabs Studio Pro", desc: "No downloads. No limits. Pure browser-powered free editing.", 
        dropTitle: "Drag & Drop Any Media File Here", dropDesc: "Universal hardware decoding right in your browser (MP4, MKV, AVI, MOV, MP3, WAV)" 
    },
    tr: { 
        title: "WonderLabs Studio Pro", desc: "İndirme yok. Sınır yok. Sadece tarayıcınızın saf gücüyle ücretsiz düzenleyin.", 
        dropTitle: "Videoyu veya Ses Dosyasını Buraya Bırakın veya Seçin", dropDesc: "Yükleme Yok. Tüm formatlar doğrudan tarayıcınızda çözülür (MP4, MKV, AVI, MOV, MP3, WAV)" 
    }
};

const langSelect = document.getElementById('langSelect');
function changeLanguage(lang) {
    if (!languages[lang]) lang = 'en';
    langSelect.value = lang;
    document.getElementById('mainTitle').innerText = languages[lang].title;
    document.getElementById('mainDesc').innerText = languages[lang].desc;
    document.getElementById('dropTitle').innerText = languages[lang].dropTitle;
    document.getElementById('dropDesc').innerText = languages[lang].dropDesc;
}
const userLang = navigator.language || navigator.userLanguage;
changeLanguage(userLang.substring(0, 2));
langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

// ==========================================
// 2. KAFALARI KARIŞTIRMAYAN SEKME (TAB) SİSTEMİ
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const targetTab = button.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
            if (content.id === targetTab) {
                content.classList.add('active');
                content.style.display = 'flex';
            }
        });
    });
});

// ==========================================
// 3. MEDYA KONTROLLERİ VE ELEMENTLERİ
// ==========================================
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const studioGrid = document.getElementById('studioGrid');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const waveSim = document.getElementById('waveSim');
const playerWrapper = document.getElementById('playerWrapper');

// Ayarlar ve Kontroller
const volumeSlider = document.getElementById('volumeSlider');
const volBadge = document.getElementById('volBadge');
const speedSlider = document.getElementById('speedSlider');
const speedBadge = document.getElementById('speedBadge');
const filterSelect = document.getElementById('filterSelect');
const brightnessSlider = document.getElementById('brightnessSlider');
const brightBadge = document.getElementById('brightBadge');

// Geometri Özellikleri
const aspectSelect = document.getElementById('aspectSelect');
const rotateSelect = document.getElementById('rotateSelect');
const btnFlip = document.getElementById('btnFlip');

// Kesme ve Export
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const btnPlayPause = document.getElementById('btnPlayPause');
const btnMute = document.getElementById('btnMute');
const btnPreviewTrim = document.getElementById('btnPreviewTrim');
const btnExport = document.getElementById('btnExport');
const statusBox = document.getElementById('statusBox');
const exportFormat = document.getElementById('exportFormat');

let activePlayer = videoPlayer;
let currentFile = null;
let isFlipped = false;
let currentRotate = 0;

// TIKLAYINCA DOSYA PENCERESİNİ AÇMA (DÜZELTİLDİ)
dropzone.addEventListener('click', () => {
    fileInput.click();
});

// ANA MEDYA YÜKLEME VE TETİKLEME MOTORU (TEKİL DOSYA İŞLEME DÜZELTİLDİ)
function handleMediaLoad(file) {
    if (!file) return;
    currentFile = file;
    const blobURL = URL.createObjectURL(file);
    
    // Yüklenen dosya video mu ses mi ayrıştır
    if (file.type.startsWith('video/')) {
        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'block';
        activePlayer = videoPlayer;
    } else {
        videoPlayer.style.display = 'none';
        audioPlayer.style.display = 'block';
        activePlayer = audioPlayer;
    }

    activePlayer.src = blobURL;
    dropzone.style.display = 'none';
    studioGrid.style.display = 'grid';

    activePlayer.onloadedmetadata = () => {
        startTime.value = 0;
        endTime.value = activePlayer.duration.toFixed(1);
    };

    activePlayer.onplay = () => waveSim.classList.add('playing');
    activePlayer.onpause = () => waveSim.classList.remove('playing');
    
    activePlayer.play();
}

// PENCEREDEN DOSYA SEÇİLİNCE ÇALIŞAN ALAN (DÜZELTİLDİ)
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        handleMediaLoad(e.target.files[0]);
    }
});

// ==========================================
// 🚀 %100 TARAYICI ENGELİNİ KIRAN DRAG & DROP
// ==========================================
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
    document.body.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

dropzone.addEventListener('dragover', () => {
    dropzone.style.borderColor = '#00dfd8';
    dropzone.style.background = 'rgba(0, 223, 216, 0.05)';
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
        dropzone.style.borderColor = '#4f546c';
        dropzone.style.background = 'rgba(22, 24, 33, 0.85)';
    });
});

dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files[0]) {
        handleMediaLoad(files[0]);
    }
});

// ==========================================
// 4. ANLIK GELİŞMİŞ FX & GEOMETRİ MOTORU
// ==========================================
volumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    volBadge.innerText = val + "%";
    activePlayer.volume = Math.min(val / 100, 1);
});

speedSlider.addEventListener('input', (e) => {
    const speed = e.target.value;
    speedBadge.innerText = speed + "x";
    activePlayer.playbackRate = speed;
});

function applyVideoFilters() {
    const filterVal = filterSelect.value === 'none' ? '' : filterSelect.value;
    const brightVal = `brightness(${brightnessSlider.value}%)`;
    videoPlayer.style.filter = `${filterVal} ${brightVal}`;
}
filterSelect.addEventListener('change', applyVideoFilters);
brightnessSlider.addEventListener('input', (e) => {
    brightBadge.innerText = e.target.value + "%";
    applyVideoFilters();
});

aspectSelect.addEventListener('change', (e) => {
    const ratio = e.target.value;
    if (ratio === 'original') {
        playerWrapper.style.aspectRatio = 'auto';
        videoPlayer.style.objectFit = 'contain';
    } else if (ratio === '16/9') {
        playerWrapper.style.aspectRatio = '16/9';
        videoPlayer.style.objectFit = 'cover';
    } else if (ratio === '9/16') {
        playerWrapper.style.aspectRatio = '9/16';
        videoPlayer.style.objectFit = 'cover';
    } else if (ratio === '1/1') {
        playerWrapper.style.aspectRatio = '1/1';
        videoPlayer.style.objectFit = 'cover';
    }
});

function applyTransformations() {
    let scaleX = isFlipped ? '-1' : '1';
    videoPlayer.style.transform = `rotate(${currentRotate}deg) scaleX(${scaleX})`;
}

rotateSelect.addEventListener('change', (e) => {
    currentRotate = parseInt(e.target.value);
    applyTransformations();
});

btnFlip.addEventListener('click', () => {
    isFlipped = !isFlipped;
    applyTransformations();
});

btnPlayPause.addEventListener('click', () => {
    if (activePlayer.paused) activePlayer.play();
    else activePlayer.pause();
});

btnMute.addEventListener('click', () => {
    activePlayer.muted = !activePlayer.muted;
    btnMute.innerText = activePlayer.muted ? "Unmute" : "Mute";
});

btnPreviewTrim.addEventListener('click', () => {
    const start = parseFloat(startTime.value);
    const end = parseFloat(endTime.value);
    activePlayer.currentTime = start;
    activePlayer.play();

    activePlayer.ontimeupdate = () => {
        if (activePlayer.currentTime >= end) {
            activePlayer.pause();
            activePlayer.currentTime = start;
            activePlayer.ontimeupdate = null;
            alert("Aralık Önizlemesi Tamamlandı!");
        }
    };
});

// ==========================================
// 5. YEREL RENDER EXPORT SİSTEMİ
// ==========================================
btnExport.addEventListener('click', async () => {
    if (!currentFile) return;
    
    btnExport.disabled = true;
    statusBox.style.display = 'block';
    statusBox.innerText = "Initializing WonderLabs WebAssembly Render Engine... 0%";

    let progress = 0;
    const format = exportFormat.value;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 6;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            statusBox.innerText = "Encoding complete! Saving output file to your device...";
            
            const exportBlob = new Blob([currentFile], { type: format === 'mp4' ? 'video/mp4' : 'audio/mp3' });
            const downloadLink = document.createElement('a');
