import { useCallback, useEffect, useRef, useState } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null)
  const loadingRef = useRef(false)
  const isLoadedRef = useRef(false)
  const [isLoaded, setIsLoaded] = useState(isLoadedRef.current)
  const [extracting, setExtracting] = useState(false)
  const [cropping, setCropping] = useState(false)

  /// 提取音频，返回 wav 文件
  const extractAudio = useCallback(async (inFile: File): Promise<File | null> => {
    if (!ffmpegRef.current || !isLoadedRef.current || loadingRef.current) {
      console.warn('「useFFmpeg」核心文件未加载完成，无法提取音频')
      return null
    }
    try {
      console.log('「useFFmpeg」音频提取开始...')
      setExtracting(true)
      const ffmpeg = ffmpegRef.current
      const inputName = 'input.mp4'
      const outputName = 'output.wav'

      const rt = await ffmpeg.writeFile(inputName, await fetchFile(inFile))
      if (!rt ) {
        console.error('「useFFmpeg」写入文件失败: ', rt)
        return null
      }
      const et = await ffmpeg.exec([
        '-i', inputName,
        '-vn',
        '-acodec',
        'pcm_s16le',
        outputName
      ])
      if (et !== 0) {
        if (et === 1) { // 超时
          console.error('「useFFmpeg」执行命令超时: ', et)
        } else {
          console.warn('「useFFmpeg」执行命令失败: ', et)
        }
        return null
      }
      const outData = await ffmpeg.readFile(outputName)
      const outFile = new File([outData], outputName, { type: 'audio/wav' })
      if (!outFile) {
        console.error('「useFFmpeg」读取输出文件失败: ', outFile)
        return null
      }
      console.log('「useFFmpeg」音频提取完成！！！')

      return outFile
    } catch (error) {
      console.error('「useFFmpeg」提取音频失败: ', error)
      return null
    } finally {
      setExtracting(false)
    }
  }, [isLoaded])

  /// 裁剪音频，返回 wav 文件
  const cropAudio = useCallback(async (inFile: File, start: number, end: number): Promise<File | null> => {
      if (!ffmpegRef.current || !isLoadedRef.current || loadingRef.current) {
        console.warn('「useFFmpeg」核心文件未加载完成，无法裁剪音频')
        return null
      }
      if (start < 0 || end <= start) {
        console.warn('「useFFmpeg」裁剪时间参数错误: ', start, end)
        return null
      }

      try {
        console.log('「useFFmpeg」音频裁剪开始...(', start, end, ')')
        setCropping(true)
        const ffmpeg = ffmpegRef.current
        const inputName = "input.wav"
        const outputName = "output.wav"

        const rt = await ffmpeg.writeFile(inputName, await fetchFile(inFile))
        if (!rt) {
          console.error('「useFFmpeg」写入文件失败: ', rt)
          return null
        }
        const et = await ffmpeg.exec([
          "-i", inputName,
          "-ss", `${start}`,
          "-to", `${end}`,
          "-acodec",
          "copy",
          outputName
        ])
        if (et !== 0) {
          if (et === 1) { // 超时
            console.error('「useFFmpeg」执行命令超时: ', et)
          } else {
            console.warn('「useFFmpeg」执行命令失败: ', et)
          }
          return null
        }
        const outData = await ffmpeg.readFile(outputName)
        const outFile = new File([outData], outputName, { type: 'audio/wav' })
        if (!outFile) {
          console.error('「useFFmpeg」读取输出文件失败: ', outFile)
          return null
        }
        console.log('「useFFmpeg」音频裁剪完成！！！')
        return outFile
      } finally {
        setCropping(false)
      }
    },
    [isLoaded]
  )



  useEffect(() => {
    if (!ffmpegRef.current) {
      const ffmpeg = new FFmpeg()
      // ffmpeg.on('progress', (p) => {
      //   console.log('「useFFmpeg」进度: ', p);
      // })
      // ffmpeg.on('log', (log) => {
      //   console.log('「useFFmpeg」日志: ', log);
      // })
      ffmpegRef.current = ffmpeg
    }

    const loadFFmpeg = async () => {
      if (loadingRef.current || isLoadedRef.current) {
        return
      }
      loadingRef.current = true
      if (ffmpegRef.current && !ffmpegRef.current.loaded) {
        try {
          await ffmpegRef.current.load()
          isLoadedRef.current = true
          setIsLoaded(true)
        } catch (error) {
          console.error("「useFFmpeg」核心文件加载失败: ", error)
        } finally {
          loadingRef.current = false
        }
      }
    }

    loadFFmpeg()
  }, [])

  return { extractAudio, extracting, cropAudio, cropping }
}