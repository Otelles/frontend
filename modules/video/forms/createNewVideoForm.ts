import { ObservableForm } from "modules/form/classes/ObservableForm"
import { file } from "modules/form/fields/file"
import { Option, select } from "modules/form/fields/select"
import { string } from "modules/form/fields/string"
import { Manager } from "modules/state/types"

export const createNewVideoForm = (manager: Manager) => {
  const { configStore } = manager.stores

  const categoryOptions: Option[] = configStore.config.categories.map((c) => ({
    value: c.id,
    label: c.name,
  }))

  return new ObservableForm(
    {
      title: string().required(),
      description: string(),
      mediaId: file({
        path: "/upload/video",
        value: undefined,
      }),
      categories: select({
        options: categoryOptions,
        multiple: true,
        value: [],
      }).required(),
    },
    manager
  )
}

export type NewVideoForm = ReturnType<typeof createNewVideoForm>
