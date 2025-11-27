const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration)
        URL.revokeObjectURL(url)
      })
      audio.addEventListener('error', (error) => {
        reject(error)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export { getAudioDuration }