import React, { useEffect, useRef, useState } from "react"
import JSMpeg from "@cycjimmy/jsmpeg-player"
import { styled } from "@mui/system"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"

const Content = styled("div")`
  width: 100%;
  height: 100%;
`

export const MonitoringStream = () => {
  const [videoElement, setVideoElement] = useState<JSMpeg.VideoElement | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return

    if (!videoElement)
      setVideoElement(
        new JSMpeg.VideoElement(containerRef.current, "wss://monitoring.frikanalen.no/", {
          videoBufferSize: 512 * 1024 * 20,
          audioBufferSize: 128 * 1024 * 20,
        })
      )

    return () => {
      videoElement?.destroy()
    }
  }, [videoElement])

  const toggleMute = () => {
    if (!videoElement?.player) return

    const { player } = videoElement
    player.setVolume(player.getVolume() > 0 ? 0 : 1)
  }

  return (
    <AspectRatio.Root ratio={1.777}>
      <Content ref={containerRef} onClick={toggleMute} />
    </AspectRatio.Root>
  )
}
