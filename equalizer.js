var source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height,
    audio;

window.addEventListener(
    "load",
    function() {
        audio = this.document.getElementById("player");

        audio.onplay = function() {
            if (typeof(context) === "undefined") {
                context = new AudioContext();
                analyser = context.createAnalyser();
                
                source = context.createMediaElementSource(audio);
                
                canvas = document.getElementById("equalizer");
                canvas.width = window.innerWidth * 0.80;
                canvas.height = window.innerHeight * 0.60;

                canvas = document.getElementById("equalizer2");
                canvas.width = window.innerWidth * 0.80;
                canvas.height = window.innerHeight * 0.60;

                source.connect(analyser);
                analyser.connect(context.destination);
            }
            
            FrameLooper();
        };
    },
    false
);

function FrameLooper() {
    canvas = document.getElementById("equalizer");
    ctx = canvas.getContext("2d");
    window.RequestAnimationFrame =
        window.requestAnimationFrame(FrameLooper) ||
        window.msRequestAnimationFrame(FrameLooper) ||
        window.mozRequestAnimationFrame(FrameLooper) ||
        window.webkitRequestAnimationFrame(FrameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    bar_count = 128;

    analyser.getByteFrequencyData(fbc_array);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    for (var i = 0; i < bar_count; i++) {
        bar_pos = canvas.width / bar_count * i;
        bar_width = 6;
        bar_height = -(fbc_array[i * 8] * 0.66);

        ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }

    canvas = document.getElementById("equalizer2");
    ctx = canvas.getContext("2d");
    bar_count = 64;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e323be";

    for (var i = 0; i < bar_count; i++) {
        bar_pos = canvas.width / bar_count * i;
        bar_width = 16;
        bar_height = -(fbc_array[i * 16] * 1.5);

        ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }
}