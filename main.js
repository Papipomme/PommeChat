navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
)

document.querySelector('#overbtn').addEventListener('click', function (e) {
    let vid = document.getElementById('emitter-video')
    if(vid.muted){
        vid.muted = false
        document.getElementById("sound-unmute").hidden = false
        document.getElementById("sound-mute").hidden = true
    } else {
        vid.muted = true
        document.getElementById("sound-unmute").hidden = true
        document.getElementById("sound-mute").hidden = false
    }
})


function handleVideo(stream) {
    let emitterVideo = document.getElementById('emitter-video')
    emitterVideo.srcObject = stream
    emitterVideo.play()
}

function errorHandler(err) {
  console.log(err)
}

document.getElementById('startmic').addEventListener('click', function (e) {
    let startMicButton = document.getElementById("startmic")
    const constrains = {
        audio: true
    }
    startMicButton.innerHTML = "Arrêter le micro"
    startMicButton.className = "btn btn-danger"
    if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        navigator.mediaDevices.getUserMedia(constrains, handleVideo, errorHandler)
    } else {
        navigator.mediaDevices.getUserMedia(constrains).then(handleVideo).catch(errorHandler);
    }
})


// To add - and to reduce

//document.querySelector('#startvid').addEventListener('click', function (e) {
//    const constrains = {
//        video: true
//    }
//
//    if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
//        navigator.mediaDevices.getUserMedia(constrains, handleVideo, errorHandler)
//    } else {
//        navigator.mediaDevices.getUserMedia(constrains).then(handleVideo).catch(errorHandler);
//    }
//})
