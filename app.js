<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="google-adsense-account" content="ca-pub-3210396314688497">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WonderLabs - Ultimate Media Studio Pro</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico?v=2">
    <style>
        :root { 
            --primary: #0070f3; 
            --primary-glow: rgba(0, 112, 243, 0.4);
            --success: #00ac47;
            --bg: #0d0e12; 
            --panel: rgba(22, 24, 33, 0.85); 
            --panel-secondary: rgba(32, 35, 48, 0.9);
            --border: #2d3142; 
            --text: #ffffff; 
            --text-muted: #a0a5b5;
        }
        body { 
            background: radial-gradient(circle at 50% 50%, #1a1c24 0%, #0d0e12 100%);
            color: var(--text); 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            margin: 0; padding: 0; 
            display: flex; flex-direction: column; align-items: center; 
            -webkit-font-smoothing: antialiased; 
        }
        .container { max-width: 1200px; width: 95%; margin: 20px auto; padding: 10px; box-sizing: border-box; }
        .header-area { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 15px; margin-bottom: 20px; }
        h1 { margin: 0; font-size: 28px; font-weight: 800; background: linear-gradient(45deg, #0070f3, #00dfd8, #7928ca); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.5px; }
        .lang-selector { background: var(--panel); color: white; padding: 8px 14px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s; }
        .ad-space { background: var(--panel); margin: 15px 0; padding: 25px; color: #5d6275; border: 1px solid var(--border); border-radius: 12px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; backdrop-filter: blur(10px); }
        
        /* TIKLAMA ALANI ETİKETİ */
        .upload-box { border: 2px dashed #4f546c; padding: 70px 20px; border-radius: 20px; cursor: pointer; background: var(--panel); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: block; }
        .upload-box:hover { border-color: #00dfd8; background: rgba(22, 24, 33, 0.95); box-shadow: 0 0 35px rgba(0, 223, 216, 0.2); transform: translateY(-3px); }
        .upload-icon { font-size: 45px; margin-bottom: 15px; display: block; filter: drop-shadow(0 0 10px var(--primary-glow)); }

        .studio-grid { display: none; grid-template-columns: 1fr 440px; gap: 25px; margin-top: 20px; text-align: left; }
        @media (max-width: 950px) { .studio-grid { grid-template-columns: 1fr; } }
        .preview-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 40px rgba(0,0,0,0.4); backdrop-filter: blur(10px); }
        .player-wrapper { width: 100%; position: relative; background: #000; border-radius: 12px; overflow: hidden; display: flex; justify-content: center; align-items: center; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); }
        video { width: 100%; max-height: 480px; display: none; border-radius: 4px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s ease; transform-origin: center center; }
        audio { width: 100%; margin: 20px 0; display: none; }
        .waveform-sim { width: 100%; height: 50px; display: flex; align-items: center; gap: 4px; margin-top: 15px; background: #050608; padding: 10px; border-radius: 10px; box-sizing: border-box; border: 1px solid var(--border); }
        .bar { flex: 1; height: 30%; background: #222531; border-radius: 3px; transition: height 0.1s ease; }
        .playing .bar { background: linear-gradient(to top, #0070f3, #00dfd8); animation: pulse 0.6s infinite alternate; }
        @keyframes pulse { 0% { height: 15%; } 100% { height: 100%; } }
        .player-controls { display: flex; gap: 12px; width: 100%; margin-top: 15px; }

        .control-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 25px; display: flex; flex-direction: column; box-shadow: 0 10px 40px rgba(0,0,0,0.4); backdrop-filter: blur(10px); }
        .tabs-nav { display: flex; border-bottom: 2px solid var(--border); margin-bottom: 20px; gap: 4px; padding-bottom: 2px; }
        .tab-btn { background: none; border: none; color: var(--text-muted); padding: 12px 14px; font-size: 13px; font-weight: 700; cursor: pointer; border-radius: 8px 8px 0 0; transition: all 0.2s; white-space: nowrap; }
        .tab-btn.active { color: #00dfd8; border-bottom: 3px solid #00dfd8; background: rgba(0, 223, 216, 0.05); }
        
        .tab-content { display: none; flex-direction: column; gap: 20px; min-height: 300px; }
        .tab-content.active { display: flex; }
        .control-group { display: flex; flex-direction: column; gap: 8px; }
        label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .slider-container { display: flex; align-items: center; gap: 12px; background: var(--panel-secondary); padding: 12px; border-radius: 10px; border: 1px solid var(--border); }
        input[type="range"] { flex: 1; accent-color: #00dfd8; cursor: pointer; height: 6px; border-radius: 3px; }
        .val-badge { background: #2d3142; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; min-width: 45px; text-align: center; color: #00dfd8; }
        .flex-inputs { display: flex; gap: 12px; }
        .flex-inputs div { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        input[type="number"], select { background: var(--panel-secondary); color: white; border: 1px solid var(--border); padding: 12px; border-radius: 10px; font-size: 14px; width: 100%; box-sizing: border-box; transition: all 0.2s; }
        
        .btn { background: var(--primary); color: white; border: none; padding: 12px 20px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-secondary { background: var(--panel-secondary); border: 1px solid var(--border); color: #eaeaea; }
        .btn-success { background: linear-gradient(135deg, var(--success) 0%, #00c957 100%); width: 100%; font-size: 16px; padding: 16px; border-radius: 12px; margin-top: auto; border: none; }
        .status-box { display: none; background: rgba(0, 255, 102, 0.1); border: 1px solid rgba(0, 255, 102, 0.3); padding: 14px; border-radius: 10px; font-size: 13px; text-align: center; color: #00ff66; font-weight: 600; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-area">
            <h1>WonderLabs Studio Pro</h1>
            <select id="langSelect" class="lang-selector">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="tr">Türkçe</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
            </select>
        </div>

        <div class="ad-space" id="adTop">Google AdSense Top Banner</div>

        <!-- DOSYA ALIM ALANI (FOR ETİKETİ İLE TIKLAMA KESİNLEŞTİRİLDİ) -->
        <label class="upload-box" id="dropzone" for="fileInput">
            <span class="upload-icon">⚡</span>
            <h3 id="dropTitle">Drag & Drop Any Media File Here or Click to Open</h3>
            <p style="color: var(--text-muted); margin: 8px 0 0 0; font-size: 14px;" id="dropDesc">Universal hardware decoding right in your browser (MP4, MKV, AVI, MOV, MP3, WAV)</p>
            <input type="file" id="fileInput" accept="video/*,audio/*" style="display:none;">
        </label>

        <div class="studio-grid" id="studioGrid">
            <div class="preview-card">
                <div class="player-wrapper" id="playerWrapper">
                    <video id="videoPlayer" controls></video>
                    <audio id="audioPlayer" controls></audio>
                </div>
                <div class="waveform-sim" id="waveSim">
                    <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                    <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                    <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                </div>
                <div class="player-controls">
                    <button class="btn btn-secondary" id="btnPlayPause" style="flex: 2;">Play / Pause</button>
                    <button class="btn btn-secondary" id="btnMute" style="flex: 1;">Mute</button>
                </div>
            </div>

            <div class="control-card">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="tab-audio" id="tabBtnAudio">🔊 Audio</button>
                    <button class="tab-btn" data-tab="tab-video" id="tabBtnVideo">🎬 Video FX</button>
                    <button class="tab-btn" data-tab="tab-geometry" id="tabBtnGeometry">📐 Transform</button>
                    <button class="tab-btn" data-tab="tab-trim" id="tabBtnTrim">✂️ Cut</button>
                    <button class="tab-btn" data-tab="tab-export" id="tabBtnExport">🚀 Export</button>
                </div>

                <div class="tab-content active" id="tab-audio">
                    <div class="control-group">
