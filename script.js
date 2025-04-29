
let audioElement = null;
let isPlaying = false;
let isMuted = false;

// อ้างอิง DOM
const playBtn = document.getElementById('play-btn');
const muteBtn = document.getElementById('mute-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress');

// แสดง/ซ่อนสไลด์เมื่อกดปุ่มลำโพง
muteBtn.addEventListener('click', () => {
    if (volumeSlider.style.display === "block") {
        volumeSlider.style.display = "none"; // ซ่อนสไลด์
    } else {
        volumeSlider.style.display = "block"; // แสดงสไลด์
    }
});

// อัปเดตระดับเสียงเมื่อเลื่อนสไลด์
volumeSlider.addEventListener('input', () => {
    if (audioElement) {
        audioElement.volume = volumeSlider.value;
        muteBtn.textContent = audioElement.volume === "0" ? "🔇" : "🔊";
    }
});

// ฟังก์ชันเล่นเสียง
function playAudio() {
    if (!audioElement) {
        audioElement = new Audio("https://radio14.plathong.net/7034/;stream.mp3");
        audioElement.crossOrigin = "anonymous";
        audioElement.volume = volumeSlider.value;
        audioElement.addEventListener('timeupdate', updateProgress);
        audioElement.addEventListener('error', handleError);
    }
    audioElement.play()
        .then(() => {
            isPlaying = true;
            playBtn.textContent = "⏸";
        })
        .catch(error => console.error("Playback failed:", error));
}

// ฟังก์ชันหยุดเสียง
function pauseAudio() {
    if (audioElement) {
        audioElement.pause();
        isPlaying = false;
        playBtn.textContent = "▶";
    }
}

// ฟังก์ชันปิดเสียง
muteBtn.addEventListener('click', () => {
    if (audioElement) {
        isMuted = !isMuted;
        audioElement.volume = isMuted ? 0 : volumeSlider.value;
        muteBtn.textContent = isMuted ? "🔇" : "🔊";
    }
});

// ฟังก์ชันเปลี่ยนธีม
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggleBtn.textContent = document.body.classList.contains('light-theme') ? "🌙" : "☀️";
});

// ฟังก์ชันอัปเดต Progress Bar
function updateProgress() {
    if (audioElement) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = progress + "%";
    }
}

// ฟังก์ชันจัดการข้อผิดพลาด
function handleError() {
    console.error("Playback Error");
    isPlaying = false;
    playBtn.textContent = "▶";
}

// สลับระหว่างเล่น/หยุดเสียง
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

const swiper = new Swiper('.mySwiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000, // เลื่อนอัตโนมัติทุก 3 วินาที
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
    },
});

