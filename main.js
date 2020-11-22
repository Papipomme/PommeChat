navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
)

document.querySelector('#overbtn').addEventListener('click', function (e) {
    let vid = document.getElementById('emitter-video')
    let mutebtn = document.getElementById("mutebtn")
    if(vid.muted){
        vid.muted = false
        mutebtn.className = "fas fa-volume-up"
    } else {
        vid.muted = true
        mutebtn.className = "fas fa-volume-mute"
    }
})


function handleVideo(stream) {
    let emitterVideo = document.querySelector('#emitter-video')
    emitterVideo.srcObject = stream
    emitterVideo.play()
}

function errorHandler(err) {
  console.log(err)
}

document.querySelector('#startmic').addEventListener('click', function (e) {
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
