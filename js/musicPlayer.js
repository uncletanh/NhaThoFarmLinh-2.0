document.addEventListener('DOMContentLoaded', () => {
    if (typeof musicPlaylist === 'undefined') return;

    // --- Core Audio Elements (Dual Audio for Crossfade) ---
    const audio1 = new Audio();
    const audio2 = new Audio();
    audio1.crossOrigin = 'anonymous';
    audio2.crossOrigin = 'anonymous';
    
    let activeAudio = audio1;
    let nextAudio = audio2;
    
    // Global volume
    let globalVolume = 1.0;

    // --- DOM Elements ---
    const playPauseBtn = document.getElementById('btn-play-pause');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const loopBtn = document.getElementById('btn-loop');
    const crossfadeBtn = document.getElementById('btn-crossfade');
    const pipBtn = document.getElementById('btn-pip');
    const lyricsBtn = document.getElementById('btn-lyrics');
    const lyricsPanel = document.getElementById('lyrics-panel');
    const lyricsContent = document.getElementById('lyrics-content');
    
    const seekBar = document.getElementById('seek-bar');
    const volumeBar = document.getElementById('volume-bar');
    
    const titleEl = document.getElementById('main-title');
    const artworkEl = document.getElementById('main-artwork');
    const timeCurrentEl = document.getElementById('time-current');
    const timeTotalEl = document.getElementById('time-total');
    const playlistContainer = document.getElementById('playlist-container');
    const ambientBg = document.getElementById('ambient-bg');
    const playerContainer = document.querySelector('.player-artwork-container');

    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const iconLoop = document.getElementById('icon-loop');
    const iconLoopOne = document.getElementById('icon-loop-one');

    // --- State Variables ---
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let loopMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
    let isCrossfadeEnabled = false;
    let shuffledIndices = [];
    let isSeeking = false;
    
    // Lyrics State
    let isLyricsOpen = false;
    let parsedLyrics = [];
    let currentLyricIndex = -1;
    
    // Crossfade State
    const CROSSFADE_DURATION = 5; // seconds
    let isCrossfading = false;
    let crossfadeCheckInterval = null;

    // --- Visualizer Setup ---
    const canvas = document.getElementById('audio-visualizer');
    const canvasCtx = canvas.getContext('2d');
    let audioCtx = null;
    let analyser = null;
    let source1 = null;
    let source2 = null;
    let visualizerAnimationFrame = null;

    function initWebAudio() {
        if (audioCtx) return; // already initialized
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            
            source1 = audioCtx.createMediaElementSource(audio1);
            source2 = audioCtx.createMediaElementSource(audio2);
            
            source1.connect(analyser);
            source2.connect(analyser);
            analyser.connect(audioCtx.destination);
            
            drawVisualizer();
        } catch(e) {
            console.log("Web Audio API error", e);
        }
    }

    function drawVisualizer() {
        if (!analyser) return;
        visualizerAnimationFrame = requestAnimationFrame(drawVisualizer);
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw circular visualizer around the album cover
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.75; 
        
        let barWidth = (2 * Math.PI) / bufferLength;
        
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * (radius * 0.4); 
            
            drawBar(centerX, centerY, radius, barHeight, barWidth, i, bufferLength, true);
            drawBar(centerX, centerY, radius, barHeight, barWidth, i, bufferLength, false);
        }
    }

    function drawBar(x, y, radius, height, width, index, total, mirror) {
        const angle = (index / total) * Math.PI * (mirror ? -1 : 1) - (Math.PI / 2);
        const startX = x + Math.cos(angle) * radius;
        const startY = y + Math.sin(angle) * radius;
        const endX = x + Math.cos(angle) * (radius + height);
        const endY = y + Math.sin(angle) * (radius + height);
        
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY);
        canvasCtx.lineTo(endX, endY);
        canvasCtx.lineWidth = width * radius * 0.8;
        
        // Extract dominant color from ambient bg to color the visualizer
        canvasCtx.strokeStyle = 'rgba(200, 200, 200, 0.4)'; 
        if (ambientBg.style.backgroundColor && ambientBg.style.backgroundColor !== 'var(--bg-color)') {
            let rgb = ambientBg.style.backgroundColor.match(/\d+/g);
            if(rgb) {
                canvasCtx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`;
            }
        }
        canvasCtx.lineCap = 'round';
        canvasCtx.stroke();
    }

    // --- Shuffle Logic ---
    function initShuffle() {
        shuffledIndices = musicPlaylist.map((_, i) => i);
        if (isShuffle) {
            for (let i = shuffledIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
            }
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // --- Playlist Rendering ---
    function renderPlaylist() {
        playlistContainer.innerHTML = musicPlaylist.map((track, i) => `
            <div class="playlist-row ${i === currentTrackIndex ? 'active' : ''}" data-index="${i}">
                ${track.cover ? `<img src="${track.cover}" class="playlist-row-thumb" alt="Cover">` : `<div class="playlist-row-thumb" style="background:#555"></div>`}
                <div class="playlist-row-info">
                    <span class="playlist-row-title">${track.title}</span>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.playlist-row').forEach(row => {
            row.addEventListener('click', () => {
                const idx = parseInt(row.getAttribute('data-index'));
                loadTrack(idx, true); 
            });
        });
    }

    function updatePlaylistHighlight() {
        document.querySelectorAll('.playlist-row').forEach(row => row.classList.remove('active'));
        const activeRow = document.querySelector(`.playlist-row[data-index="${currentTrackIndex}"]`);
        if (activeRow) {
            activeRow.classList.add('active');
        }
    }

    // --- Dominant Color ---
    function applyDominantColor() {
        if (typeof ColorThief !== 'undefined') {
            try {
                const colorThief = new ColorThief();
                const color = colorThief.getColor(artworkEl);
                ambientBg.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            } catch (e) {
                console.log("ColorThief error:", e);
            }
        }
    }

    // --- Lyrics Logic ---
    async function loadLyrics(track) {
        parsedLyrics = [];
        currentLyricIndex = -1;
        lyricsContent.innerHTML = '';
        
        if (!track.lrc) {
            lyricsContent.innerHTML = '<p class="lyric-line active">No lyrics available</p>';
            return;
        }

        try {
            const response = await fetch(track.lrc);
            if (!response.ok) throw new Error("Lyrics fetch failed");
            const text = await response.text();
            parseLRC(text);
        } catch (e) {
            console.error("Failed to load lyrics", e);
            lyricsContent.innerHTML = '<p class="lyric-line active">Failed to load lyrics</p>';
        }
    }

    function parseLRC(text) {
        const lines = text.split('\n');
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
        
        let hasTimestamps = false;
        
        lines.forEach(line => {
            const match = timeRegex.exec(line);
            if (match) {
                hasTimestamps = true;
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const ms = parseInt(match[3]);
                const time = minutes * 60 + seconds + (ms / (match[3].length === 2 ? 100 : 1000));
                
                const textContent = line.replace(timeRegex, '').trim();
                if (textContent) {
                    parsedLyrics.push({ time, text: textContent });
                }
            } else if (line.trim() !== '') {
                if (!line.startsWith('[')) {
                    parsedLyrics.push({ time: -1, text: line.trim() });
                }
            }
        });
        
        if (hasTimestamps) {
            parsedLyrics.sort((a, b) => a.time - b.time);
        }
        
        renderLyrics(hasTimestamps);
    }
    
    function renderLyrics(hasTimestamps) {
        lyricsContent.innerHTML = parsedLyrics.map((line, idx) => `
            <p class="lyric-line" data-index="${idx}">${line.text}</p>
        `).join('');
        
        if (!hasTimestamps) {
            document.querySelectorAll('.lyric-line').forEach(el => el.classList.add('active'));
        } else {
            document.querySelectorAll('.lyric-line').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.getAttribute('data-index'));
                    const time = parsedLyrics[idx].time;
                    if (time >= 0 && !isNaN(activeAudio.duration)) {
                        activeAudio.currentTime = time;
                        if (!isPlaying) playTrack();
                    }
                });
            });
        }
    }

    // --- Audio Loading & Playback ---
    function getNextTrackIndex() {
        if (isShuffle) {
            let currentIndexInShuffle = shuffledIndices.indexOf(currentTrackIndex);
            let nextIndex = (currentIndexInShuffle + 1) % musicPlaylist.length;
            return shuffledIndices[nextIndex];
        } else {
            return (currentTrackIndex + 1) % musicPlaylist.length;
        }
    }
    
    function getPrevTrackIndex() {
        if (isShuffle) {
            let currentIndexInShuffle = shuffledIndices.indexOf(currentTrackIndex);
            let prevIndex = (currentIndexInShuffle - 1 + musicPlaylist.length) % musicPlaylist.length;
            return shuffledIndices[prevIndex];
        } else {
            return (currentTrackIndex - 1 + musicPlaylist.length) % musicPlaylist.length;
        }
    }

    function loadTrack(index, forcePlay = false) {
        if (isCrossfading) {
            clearInterval(crossfadeCheckInterval);
            nextAudio.pause();
            isCrossfading = false;
        }

        currentTrackIndex = index;
        const track = musicPlaylist[index];
        
        activeAudio.pause();
        activeAudio.src = track.src;
        activeAudio.volume = globalVolume;
        
        titleEl.textContent = track.title;
        if (track.cover) {
            artworkEl.src = track.cover;
            artworkEl.style.display = 'block';
            if (artworkEl.complete) {
                applyDominantColor();
            } else {
                artworkEl.addEventListener('load', applyDominantColor, { once: true });
            }
        } else {
            artworkEl.style.display = 'none';
            ambientBg.style.backgroundColor = 'var(--bg-color)';
        }
        updatePlaylistHighlight();
        updateMediaSession();
        
        seekBar.value = 0;
        timeCurrentEl.textContent = "0:00";

        if (forcePlay || isPlaying) {
            playTrack();
        }
        
        loadLyrics(track);
    }

    function playTrack() {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        initWebAudio();
        
        activeAudio.play().then(() => {
            isPlaying = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            artworkEl.classList.add('playing');
            startCrossfadeMonitor();
        }).catch(e => console.log('Autoplay prevented', e));
    }

    function pauseTrack() {
        activeAudio.pause();
        if (isCrossfading) nextAudio.pause();
        
        isPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        artworkEl.classList.remove('playing');
        clearInterval(crossfadeCheckInterval);
    }

    function togglePlay() {
        if (isPlaying) pauseTrack();
        else playTrack();
    }

    function nextTrack() {
        loadTrack(getNextTrackIndex(), true);
    }

    function prevTrack() {
        if (activeAudio.currentTime > 3) {
            activeAudio.currentTime = 0;
            if (isPlaying) playTrack();
            return;
        }
        loadTrack(getPrevTrackIndex(), true);
    }

    // --- Crossfade Logic ---
    function startCrossfadeMonitor() {
        clearInterval(crossfadeCheckInterval);
        if (!isCrossfadeEnabled) return;
        
        crossfadeCheckInterval = setInterval(() => {
            if (!activeAudio.duration) return;
            
            const timeRemaining = activeAudio.duration - activeAudio.currentTime;
            
            if (timeRemaining <= CROSSFADE_DURATION && timeRemaining > 0 && !isCrossfading && loopMode !== 2) {
                initiateCrossfade();
            }
        }, 500);
    }
    
    function initiateCrossfade() {
        isCrossfading = true;
        
        const nextIndex = getNextTrackIndex();
        
        let isLastTrack = false;
        if (isShuffle) isLastTrack = shuffledIndices.indexOf(currentTrackIndex) === musicPlaylist.length - 1;
        else isLastTrack = currentTrackIndex === musicPlaylist.length - 1;
        
        if (loopMode === 0 && isLastTrack) {
            isCrossfading = false;
            return;
        }
        
        const track = musicPlaylist[nextIndex];
        nextAudio.src = track.src;
        nextAudio.volume = 0;
        
        nextAudio.play().then(() => {
            const oldAudio = activeAudio;
            activeAudio = nextAudio;
            nextAudio = oldAudio;
            
            currentTrackIndex = nextIndex;
            titleEl.textContent = track.title;
            if (track.cover) {
                artworkEl.src = track.cover;
                if (artworkEl.complete) applyDominantColor();
                else artworkEl.addEventListener('load', applyDominantColor, { once: true });
            }
            updatePlaylistHighlight();
            updateMediaSession();
            
            const fadeInterval = 50;
            const steps = (CROSSFADE_DURATION * 1000) / fadeInterval;
            let currentStep = 0;
            
            const crossfader = setInterval(() => {
                currentStep++;
                const ratio = currentStep / steps;
                
                if (activeAudio.volume < globalVolume) {
                    activeAudio.volume = Math.min(globalVolume, globalVolume * ratio);
                }
                if (nextAudio.volume > 0) {
                    nextAudio.volume = Math.max(0, globalVolume * (1 - ratio));
                }
                
                if (currentStep >= steps) {
                    clearInterval(crossfader);
                    nextAudio.pause();
                    nextAudio.volume = globalVolume;
                    isCrossfading = false;
                    startCrossfadeMonitor();
                }
            }, fadeInterval);
            
        }).catch(e => {
            console.log("Crossfade failed", e);
            isCrossfading = false;
        });
    }

    // --- Event Listeners (UI) ---
    const musicPageWrapper = document.querySelector('.music-page-wrapper');
    lyricsBtn.addEventListener('click', () => {
        isLyricsOpen = !isLyricsOpen;
        lyricsBtn.classList.toggle('active', isLyricsOpen);
        if (isLyricsOpen) {
            lyricsPanel.classList.remove('hidden');
            musicPageWrapper.classList.add('lyrics-active');
        } else {
            lyricsPanel.classList.add('hidden');
            musicPageWrapper.classList.remove('lyrics-active');
        }
    });

    playPauseBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        initShuffle();
    });

    loopBtn.addEventListener('click', () => {
        loopMode = (loopMode + 1) % 3;
        loopBtn.classList.toggle('active', loopMode > 0);
        if (loopMode === 0) {
            iconLoop.style.display = 'block';
            iconLoopOne.style.display = 'none';
            loopBtn.classList.remove('active');
        } else if (loopMode === 1) {
            iconLoop.style.display = 'block';
            iconLoopOne.style.display = 'none';
        } else if (loopMode === 2) {
            iconLoop.style.display = 'none';
            iconLoopOne.style.display = 'block';
        }
    });
    
    crossfadeBtn.addEventListener('click', () => {
        isCrossfadeEnabled = !isCrossfadeEnabled;
        crossfadeBtn.classList.toggle('active', isCrossfadeEnabled);
        if (isCrossfadeEnabled && isPlaying) startCrossfadeMonitor();
        else clearInterval(crossfadeCheckInterval);
    });

    pipBtn.addEventListener('click', async () => {
        if (!('documentPictureInPicture' in window)) {
            alert('Your browser does not support Document Picture-in-Picture API yet.');
            return;
        }
        
        try {
            if (window.documentPictureInPicture.window) {
                window.documentPictureInPicture.window.close();
                return;
            }
            
            const pipWindow = await window.documentPictureInPicture.requestWindow({
                width: 400,
                height: 130
            });
            
            const pipTarget = document.querySelector('.music-page-wrapper');
            const originalParent = pipTarget.parentNode;
            const originalNextSibling = pipTarget.nextSibling;

            pipWindow.document.body.append(pipTarget);
            pipWindow.document.body.classList.add('pip-mode');
            pipWindow.document.body.style.background = 'var(--bg-color)';
            pipWindow.document.body.style.display = 'flex';
            pipWindow.document.body.style.justifyContent = 'center';
            pipWindow.document.body.style.alignItems = 'center';
            pipWindow.document.body.style.margin = '0';
            pipWindow.document.body.style.height = '100vh';
            
            const meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
            pipWindow.document.head.appendChild(meta);
            
            const syncTheme = () => {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme) pipWindow.document.documentElement.setAttribute('data-theme', theme);
                else pipWindow.document.documentElement.removeAttribute('data-theme');
            };
            syncTheme();
            
            const themeObserver = new MutationObserver(syncTheme);
            themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
            
            [...document.styleSheets].forEach((styleSheet) => {
                try {
                    const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('');
                    const style = document.createElement('style');
                    style.textContent = cssRules;
                    pipWindow.document.head.appendChild(style);
                } catch (e) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = styleSheet.type;
                    link.media = styleSheet.media;
                    link.href = styleSheet.href;
                    pipWindow.document.head.appendChild(link);
                }
            });
            
            pipWindow.addEventListener("pagehide", () => {
                themeObserver.disconnect();
                if (originalNextSibling) {
                    originalParent.insertBefore(pipTarget, originalNextSibling);
                } else {
                    originalParent.appendChild(pipTarget);
                }
            });
            
        } catch (e) {
            console.error(e);
        }
    });

    // --- Audio Event Syncing ---
    function syncAudioEvents(audioEl) {
        audioEl.addEventListener('timeupdate', () => {
            if (audioEl !== activeAudio) return; 
            if (!isNaN(audioEl.duration) && !isSeeking) {
                seekBar.value = (audioEl.currentTime / audioEl.duration) * 100;
                timeCurrentEl.textContent = formatTime(audioEl.currentTime);
            }
            
            // Sync Lyrics
            if (isLyricsOpen && parsedLyrics.length > 0 && parsedLyrics[0].time !== -1) {
                const currentTime = audioEl.currentTime;
                let newIndex = -1;
                for (let i = 0; i < parsedLyrics.length; i++) {
                    if (currentTime >= parsedLyrics[i].time) {
                        newIndex = i;
                    } else {
                        break;
                    }
                }
                
                if (newIndex !== currentLyricIndex && newIndex !== -1) {
                    const oldLine = document.querySelector(`.lyric-line[data-index="${currentLyricIndex}"]`);
                    if (oldLine) oldLine.classList.remove('active');
                    
                    const newLine = document.querySelector(`.lyric-line[data-index="${newIndex}"]`);
                    if (newLine) {
                        newLine.classList.add('active');
                        lyricsPanel.scrollTo({
                            top: newLine.offsetTop - lyricsPanel.clientHeight / 2 + newLine.clientHeight / 2,
                            behavior: 'smooth'
                        });
                    }
                    currentLyricIndex = newIndex;
                }
            }
        });

        audioEl.addEventListener('loadedmetadata', () => {
            if (audioEl !== activeAudio) return;
            timeTotalEl.textContent = formatTime(audioEl.duration);
        });

        audioEl.addEventListener('ended', () => {
            if (audioEl !== activeAudio) return; 
            
            if (loopMode === 2) {
                audioEl.currentTime = 0;
                playTrack();
            } else if (loopMode === 1) {
                nextTrack();
            } else {
                let isLastTrack = false;
                if (isShuffle) isLastTrack = shuffledIndices.indexOf(currentTrackIndex) === musicPlaylist.length - 1;
                else isLastTrack = currentTrackIndex === musicPlaylist.length - 1;
                
                if (isLastTrack) {
                    pauseTrack();
                    seekBar.value = 0;
                    audioEl.currentTime = 0;
                } else {
                    nextTrack();
                }
            }
        });
    }

    syncAudioEvents(audio1);
    syncAudioEvents(audio2);

    seekBar.addEventListener('mousedown', () => isSeeking = true);
    seekBar.addEventListener('touchstart', () => isSeeking = true);
    seekBar.addEventListener('change', (e) => {
        if (!isNaN(activeAudio.duration)) {
            activeAudio.currentTime = (e.target.value / 100) * activeAudio.duration;
        }
        isSeeking = false;
    });
    seekBar.addEventListener('input', (e) => {
        if (!isNaN(activeAudio.duration)) {
            timeCurrentEl.textContent = formatTime((e.target.value / 100) * activeAudio.duration);
        }
    });

    volumeBar.addEventListener('input', (e) => {
        globalVolume = e.target.value / 100;
        activeAudio.volume = globalVolume;
        if (!isCrossfading) {
            nextAudio.volume = globalVolume; 
        }
    });

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (e.shiftKey) nextTrack();
                else activeAudio.currentTime = Math.min(activeAudio.currentTime + 10, activeAudio.duration);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (e.shiftKey) prevTrack();
                else activeAudio.currentTime = Math.max(activeAudio.currentTime - 10, 0);
                break;
            case 'KeyM':
                e.preventDefault();
                activeAudio.muted = !activeAudio.muted;
                nextAudio.muted = activeAudio.muted; // sync
                break;
        }
    });

    // --- Media Session API ---
    function updateMediaSession() {
        if ('mediaSession' in navigator) {
            const track = musicPlaylist[currentTrackIndex];
            let urlOrigin = window.location.origin;
            if (urlOrigin === "null" || !urlOrigin) urlOrigin = ""; 
            let artworkUrl = track.cover ? urlOrigin + "/" + track.cover : '';
            
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: 'Notebook Original',
                album: 'Nhà Thơ Farm Lính',
                artwork: artworkUrl ? [{ src: artworkUrl, sizes: '512x512', type: 'image/png' }] : []
            });

            navigator.mediaSession.setActionHandler('play', playTrack);
            navigator.mediaSession.setActionHandler('pause', pauseTrack);
            navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
        }
    }

    // --- Initialization ---
    initShuffle();
    renderPlaylist();
    loadTrack(0);
});
