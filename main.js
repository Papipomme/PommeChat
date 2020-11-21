// Compat
navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia)

document.querySelector('#start').addEventListener('click', function (e) {

    MediaDevices.getUserMedia({
        video: true,
        audio: true
    }, function (stream) {
        let emitterVideo = document.querySelector('#emitter-video')
        emitterVideo.srcObject = stream
        emitterVideo.play()
    }, function () {})

})
