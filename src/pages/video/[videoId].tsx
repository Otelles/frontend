import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetVideoDocument, GetVideoQuery } from "../../generated/graphql"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { GetServerSideProps } from "next"
import assert from "assert"
import { client } from "../../modules/apollo/client"
import { ModuleHeading } from "../../refactor/moduleHeading"
import { ParsedUrlQuery } from "querystring"

export interface VideoPageParams extends ParsedUrlQuery {
  videoId: string
}

interface VideoPageProps {
  video: GetVideoQuery["video"]
}

export const VideoPage = ({ video }: VideoPageProps) => (
  <div className={"flex gap-5 flex-col lg:flex-row "}>
    <Meta
      meta={{
        title: video.title,
        description: video.description,
        author: video.organization.name,
      }}
    />
    <div className={"flex flex-col max-w-[1280px]  "}>
      <ModuleHeading className={"py-3 text-slate-900 "}>{video.title}</ModuleHeading>
      <div className="bg-slate-800">
        <VideoPlayer video={video} />
        <VideoPageMetaBar video={video} />
      </div>
    </div>
    <LatestVideosSidebar className={"lg:w-1/3 pt-16"} latestVideos={video.organization} />
  </div>
)

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoPageParams

  assert(videoId)

  const {
    data: { video },
  } = await client.query({ query: GetVideoDocument, variables: { videoId: videoId as string } })

  return { props: { video } }
}

export default VideoPage
