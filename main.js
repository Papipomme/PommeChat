navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
)

function handleVideo(stream) {
    let emitterVideo = document.querySelector('#emitter-video')
    emitterVideo.srcObject = stream
    emitterVideo.play()
}

function errorHandler(err) {
  console.log(err)
}

document.querySelector('#start').addEventListener('click', function (e) {
  const constrains = {
      video: true,
      audio: true
  }

  if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
      navigator.mediaDevices.getUserMedia(constrains, handleVideo, errorHandler)
  } else {
      navigator.mediaDevices.getUserMedia(constrains).then(handleVideo).catch(errorHandler);
  }
})
