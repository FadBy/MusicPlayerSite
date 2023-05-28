var musics = ["music/murder.mp3", "music/gigachad.mp3", "music/amongus.mp3", "music/dr_livesey.mp3", "music/rave.mp3"];
var icons = ["music-icons/murder.jpg", "music-icons/gigachad.jpg", "music-icons/amongus.jpg", "music-icons/dr-livesey.jpg", "music-icons/rave.jpg"];
var current_index = 0;
var current_audio;
var isPlaying = false;
var progress_bar;

function setMusic(index) {
    if (index < 0 || index > musics.length - 1)
        return;

    current_index = index;

    document.getElementById("icon").src = icons[current_index];
    current_audio.src = musics[current_index];

    current_audio.addEventListener("timeupdate", updateProgressBar);
}

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function play() {
    if (isPlaying) return;
    current_audio.play();
    isPlaying = true;
    document.getElementById("play-pause-button").src = "ui/pause.svg";
}

function pause() {
    if (!isPlaying) return;
    current_audio.pause();
    isPlaying = false;
    document.getElementById("play-pause-button").src = "ui/play.svg";
}

function previous() {
    progress_bar.value = 0;
    if (isPlaying) {
        pause();
        setMusic(current_index - 1);
        play();
    } else {
        setMusic(current_index - 1);
    }

}

function next() {
    progress_bar.value = 0;
    if (isPlaying) {
        pause();
        setMusic(current_index + 1);
        play();
    } else {
        setMusic(current_index + 1);
    }
}

function updateProgressBar() {
    if (!current_audio.duration) {
        return;
    }
    var progress = (current_audio.currentTime / current_audio.duration) * 100;
    if (progress >= 100 && current_index != musics.length - 1) {
        next();
    } else if (progress >= 100) {
        pause();
    }
    progress_bar.value = progress;
}

function seek() {
    var slider = document.getElementById("progress-bar");
    var seekTime = (slider.value / 100) * current_audio.duration;
    current_audio.currentTime = seekTime;
}

window.onload = function () {
    current_audio = document.getElementById('player');
    progress_bar = document.getElementById('progress-bar');
    progress_bar.value = 0;
    setMusic(0);
};

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        togglePlayPause();
    }
    if (event.code === "ArrowLeft") {
        next();
    } if (event.code === "ArrowRight") {
        previous();
    }
});

