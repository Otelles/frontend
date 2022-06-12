import { ParsedUrlQuery } from "querystring"
import useSWRImmutable from "swr"
import { BulletinData, NewBulletinForm } from "../../../modules/bulletins/types"
import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { MDEditorProps } from "@uiw/react-md-editor"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { TextField } from "@mui/material"
import { Save } from "@mui/icons-material"
import { useManager } from "../../../modules/state/manager"
import axios from "axios"
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()
import LoadingButton from "@mui/lab/LoadingButton"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

interface BulletinDetailParams extends ParsedUrlQuery {
  bulletinId: string
}

interface BulletinDetailProps {
  bulletinId: string
  fallback: { [k: string]: any }
}

export const BulletinDetail = ({ bulletinId, fallback }: BulletinDetailProps) => {
  const { data: bulletin } = useSWRImmutable<BulletinData>(`/bulletins/${bulletinId}`, { fallback })

  const [text, setText] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const { api } = useManager().stores.networkStore

  useEffect(() => {
    if (bulletin) {
      setText(bulletin.text)
      setTitle(bulletin.title)
    }
  }, [bulletin])

  if (!bulletin) return null
  const saveBulletin = async () => {
    setIsSaving(true)
    const { status } = await api.put<NewBulletinForm>(`/bulletins/${bulletinId}`, { title, text })
    if (status === 200) {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Tittel"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <MDEditor value={text} onChange={setText} />
      <LoadingButton
        loading={isSaving}
        loadingPosition="end"
        variant="contained"
        endIcon={<Save />}
        onClick={saveBulletin}
      >
        Publiser
      </LoadingButton>
    </div>
  )
}

export const getStaticProps: GetStaticProps<BulletinDetailProps> = async (ctx) => {
  const { bulletinId } = ctx.params as BulletinDetailParams
  const bulletinURL = `/bulletins/${bulletinId}`

  const { data: bulletin } = await axios.get<BulletinData>(publicRuntimeConfig.FK_API + bulletinURL)

  return { props: { bulletinId, fallback: { bulletinURL: bulletin } } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export default BulletinDetail