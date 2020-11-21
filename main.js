document.querySelector('#start').addEventListener('click', function (e) {

    navigator.getUserMedia({
        video: true,
        audio: true
    }, function (stream) {
        let emitterVideo = document.querySelector('#emitter-video')
        emitterVideo.srcObject = stream
        emitterVideo.play()
    }, function () {})

})