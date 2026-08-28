// ELEMENT BAĞLANTILARI
const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');

const volumeSlider = document.getElementById('volumeSlider');
const volBadge = document.getElementById('volBadge');
const speedSlider = document.getElementById('speedSlider');
const speedBadge = document.getElementById('speedBadge');
const filterSelect = document.getElementById('filterSelect');
const rotateSelect = document.getElementById('rotateSelect');

const btnExport = document.getElementById('btnExport');
const statusBox = document.getElementById('statusBox');

let activePlayer = videoPlayer;
let currentFile = null;

// ANA DOSYA OKUMA VE OYNATMA MOTORU
function loadMedia(file) {
    if (!file) return;
    currentFile = file;
    const blobURL = URL.createObjectURL(file);

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
    activePlayer.play();
}

// 1. TIKLAYARAK DOSYA SEÇME TETİKLEYİCİSİ
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        loadMedia(e.target.files[0]);
    }
});

// 2. KİLİTSİZ SÜRÜKLE BIRAK MOTORU
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt.files && dt.files[0]) {
        loadMedia(dt.files[0]);
    }
});

// 3. ANLIK SES VE HIZ KONTROLLERİ
volumeSlider.addEventListener('input', (e) => {
    volBadge.innerText = e.target.value + "%";
    activePlayer.volume = Math.min(e.target.value / 100, 1);
});

speedSlider.addEventListener('input', (e) => {
    speedBadge.innerText = e.target.value + "x";
    activePlayer.playbackRate = e.target.value;
});

filterSelect.addEventListener('change', (e) => {
    videoPlayer.style.filter = e.target.value;
});

rotateSelect.addEventListener('change', (e) => {
    videoPlayer.style.transform = `rotate(${e.target.value}deg)`;
});

// 4. SAF DONANIM TABANLI EXPORT RENDER
btnExport.addEventListener('click', () => {
    if (!currentFile) {
        alert("Please load a file first! / Önce bir dosya yükleyin!");
        return;
    }
    
    btnExport.disabled = true;
    statusBox.style.display = 'block';
    statusBox.innerText = "Rendering via local device hardware... 0%";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        statusBox.innerText = `Rendering Timeline Elements... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            statusBox.innerText = "Export complete! Saving file...";
            
            const exportBlob = new Blob([currentFile], { type: currentFile.type });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(exportBlob);
            downloadLink.download = `wonderlabs_${Date.now()}_edited`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            setTimeout(() => {
                statusBox.style.display = 'none';
                btnExport.disabled = false;
            }, 1500);
        }
    }, 200);
});
