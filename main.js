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

document.querySelector('#startmic').addEventListener('click', function (e) {
  const constrains = {
      audio: true
  }

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
