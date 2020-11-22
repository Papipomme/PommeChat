navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
)

document.getElementById("incoming").value=""
document.getElementById("outgoing").value=""

document.getElementById('overbtn').addEventListener('click', () => {
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

function errorHandler(err) {
  console.log("error",err)
}

function assignVideo(video, stream) {
  if ('srcObject' in video) {
    video.srcObject = stream
  } else {
    video.src = window.URL.createObjectURL(stream) // for older browsers
  }
}

function setupNodeEvents(node){
  node.on('connect', () => {
    console.log("got connection")
  })

  node.on('error', errorHandler)

  node.on("signal", (signal) => {
    if (signal.type == "answer" || signal.type == "offer") {
      console.log("got signal")
      document.getElementById("outgoing").value = JSON.stringify(signal)
    }
  })

  node.on('stream', stream => {
    console.log("got stream")
    // got remote video stream, now let's show it in a video tag
    let video = document.getElementById('receiver-video')

    assignVideo(video,stream)

    video.play()
  })
}

function handleVideo(stream) {
  let emitterVideo = document.getElementById('emitter-video')
  assignVideo(emitterVideo,stream)
  emitterVideo.play()

  const incoming = document.getElementById("incoming")
  if (incoming.value) {
    // Non empty we are receiving
    let sdp = JSON.parse(incoming.value)

    if(!sdp) {
      alert("Error decoding SDP json")
      return
    }

    if (window.node) {
      window.node.signal(sdp)
      return
    }

    window.node = new SimplePeer({
      trickle: false,
      stream: stream
    })
    setupNodeEvents(window.node)
    window.node.signal(sdp)
  } else {
    // Empty, we are sending
    window.node = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    setupNodeEvents(window.node)
  }
}

document.getElementById("do-exchange").addEventListener("click", () => {
  const constrains = {
      audio: true,
      video: true
  }
  if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
      navigator.mediaDevices.getUserMedia(constrains, handleVideo, errorHandler)
  } else {
      navigator.mediaDevices.getUserMedia(constrains).then(handleVideo).catch(errorHandler);
  }
})
