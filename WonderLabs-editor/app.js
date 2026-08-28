// DİL VERİTABANI (Dünyada En Çok Kullanılan Diller)
const languages = {
    en: { title: "WonderLabs Media Editor", desc: "No downloads. No limits. Pure browser-powered free editing.", dropTitle: "Drop or Select Your Video / Audio File Here", dropDesc: "(Supports MKV, AVI, MP4, MOV, MP3, WAV)", adTop: "Google AdSense Top Banner", adBottom: "Google AdSense Bottom Banner" },
    es: { title: "Editor de Medios WonderLabs", desc: "Sin descargas. Sin límites. Edición gratuita impulsada por el navegador.", dropTitle: "Suelte o Seleccione su Archivo de Video / Audio Aquí", dropDesc: "(Soporta MKV, AVI, MP4, MOV, MP3, WAV)", adTop: "Banner Publicitario Superior", adBottom: "Banner Publicitario Inferior" },
    tr: { title: "WonderLabs Medya Düzenleyici", desc: "İndirme yok. Sınır yok. Sadece tarayıcınızın saf gücüyle ücretsiz düzenleyin.", dropTitle: "Videoyu veya Ses Dosyasını Buraya Bırakın veya Seçin", dropDesc: "(MKV, AVI, MP4, MOV, MP3, WAV formatları desteklenir)", adTop: "Google AdSense Üst Reklam Alanı", adBottom: "Google AdSense Alt Reklam Alanı" },
    de: { title: "WonderLabs Medieneditor", desc: "Keine Downloads. Keine Limits. Kostenlose Bearbeitung direkt im Browser.", dropTitle: "Zieh deine Video- oder Audiodatei hierher oder wähle sie aus", dropDesc: "(Unterstützt MKV, AVI, MP4, MOV, MP3, WAV)", adTop: "Oberer Werbebanner", adBottom: "Unterer Werbebanner" },
    fr: { title: "Éditeur Médias WonderLabs", desc: "Pas de téléchargement. Pas de limites. Édition gratuite via le navigateur.", dropTitle: "Déposez ou Sélectionnez votre Fichier Vidéo / Audio Ici", dropDesc: "(Prend en charge MKV, AVI, MP4, MOV, MP3, WAV)", adTop: "Bannière Publicitaire Supérieure", adBottom: "Bannière Publicitaire Inférieure" }
};

const langSelect = document.getElementById('langSelect');
function changeLanguage(lang) {
    if (!languages[lang]) lang = 'en'; // Dil yoksa varsayılan İngilizce
    langSelect.value = lang;
    document.getElementById('mainTitle').innerText = languages[lang].title;
    document.getElementById('mainDesc').innerText = languages[lang].desc;
    document.getElementById('dropTitle').innerText = languages[lang].dropTitle;
    document.getElementById('dropDesc').innerText = languages[lang].dropDesc;
    document.getElementById('adTop').innerText = languages[lang].adTop;
    document.getElementById('adBottom').innerText = languages[lang].adBottom;
}

// KULLANICININ TARAYICI DİLİNİ OTOMATİK ALGILAMA
const userLang = navigator.language || navigator.userLanguage;
const shortLang = userLang.substring(0, 2);
changeLanguage(shortLang);

langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

// Medya Oynatma Kodları
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');

dropzone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const blobURL = URL.createObjectURL(file);
    videoPlayer.style.display = 'none'; audioPlayer.style.display = 'none';
    videoPlayer.src = ''; audioPlayer.src = '';
    if (file.type.startsWith('video/')) {
        videoPlayer.src = blobURL; videoPlayer.style.display = 'block'; videoPlayer.play();
    } else if (file.type.startsWith('audio/')) {
        audioPlayer.src = blobURL; audioPlayer.style.display = 'block'; audioPlayer.play();
    }
});
