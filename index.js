// seleccionar el primer elemento
const button = document.querySelector('button')

// agregar un event listener para el clic en el botón
button.addEventListener('click', async () => {
  // obtener acceso a la pantalla del usuario
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: {
      width: { ideal: 1920 }, // Ancho deseado
      height: { ideal: 1080 }, // Altura deseada
      frameRate: { ideal: 30 },
    },
    audio: true,
  })

  // crear un objeto mediaRecoder para la grabación de la pantalla
  const mediaRecoders = new MediaRecorder(media, {
    mimeType: 'video/webm;codecs=vp8,opus',
  })

  //iniciar la grabación
  mediaRecoders.start()

  // obtener la pista de video de la captura de pantalla
  const [video] = media.getVideoTracks()

  // Agregar un event listener para detener la grabación al finalizar
  video.addEventListener('ended', () => {
    mediaRecoders.stop()
  })

  // Agregar un event listener para manejar datos disponibles durante la grabación
  mediaRecoders.addEventListener('dataavailable', (e) => {
    //crear un enlace para descargar
    const link = document.createElement('a')
    link.href = URL.createObjectURL(e.data)
    link.download = 'captura.webm'

    // simular un clic en el enlace para iniciar la descarga
    link.click()
  })
})
