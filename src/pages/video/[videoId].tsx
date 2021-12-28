import styled from "@emotion/styled"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { createResourcePageWrapper } from "src/modules/state/helpers/createResourcePageWrapper"
import { Video } from "src/modules/video/resources/Video"
import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import Link from "next/link"
import React from "react"
import { useResourceList } from "src/modules/state/hooks/useResourceList"
import { useStores } from "src/modules/state/manager"
import { RecentVideoItem } from "../../modules/video/components/RecentVideoItem"
import { Meta } from "src/modules/core/components/Meta"

const breakpoint = 900

const Container = styled.div`
  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const Content = styled.div`
  flex: 1;
`

const PrimaryInfo = styled.div`
  margin-top: 16px;
`

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 2px;
`

const Organization = styled.h3`
  font-size: 1.1em;
  font-weight: 400;

  margin-bottom: 12px;
`

const Description = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
`

const UploadedDate = styled.span`
  font-size: 1em;
  color: ${(props) => props.theme.fontColor.muted};
`

const Sidebar = styled.div`
  width: 380px;
  margin-left: 32px;

  @media (max-width: ${breakpoint}px) {
    width: 100%;

    margin-left: 0px;
    margin-top: 32px;
  }
`

const SidebarTitle = styled.h5`
  font-size: 1.2em;
  font-weight: 500;

  margin-bottom: 16px;
`

export type ContentProps = {
  video: Video
}

function VideoView(props: ContentProps) {
  const { videoStore, configStore } = useStores()
  const { video } = props
  const { title, description, organization, createdAt } = video.data

  const videos = useResourceList(video.latestVideosByOrganization, videoStore)

  const thumbnail = video.getAsset("thumbnail-large")
  const stream = video.getAsset("webm")

  return (
    <Container>
      <Meta
        meta={{
          title,
          description,
          author: organization.name,
        }}
      />
      <Content>
        <VideoPlayer
          key={video.data.id}
          width={1280}
          height={720}
          src={configStore.media + stream.url}
          thumbnail={configStore.media + thumbnail.url}
        />
        <PrimaryInfo>
          <Title>{title}</Title>
          <Organization>
            <Link href={`/organization/${organization.id}`} passHref>
              <a>{organization.name}</a>
            </Link>
          </Organization>
        </PrimaryInfo>
        <Description>{description}</Description>
        <UploadedDate>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</UploadedDate>
      </Content>
      <Sidebar>
        <SidebarTitle>Nyeste videoer fra {video.organization.data.name}</SidebarTitle>
        {videos.map((x) => (
          <RecentVideoItem key={x.data.id} video={x} />
        ))}
      </Sidebar>
    </Container>
  )
}

const VideoPage = createResourcePageWrapper<Video>({
  getFetcher: (query, manager) => {
    const { videoStore } = manager.stores
    const { videoId } = query

    const safeVideoId = Number(videoId) ?? 0
    return videoStore.fetchById(safeVideoId)
  },
  renderContent: (v) => <VideoView video={v} />,
  getInitialProps: async (v) => {
    const { latestVideosByOrganization } = v

    if (latestVideosByOrganization.items.length === 0) {
      await v.latestVideosByOrganization.more()
    }
  },
})

export default VideoPage