import MyTextEditor from '@/components/Inputs/TextEditor/MyTextEditor'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow'
import { Button, Fieldset, FileInput, MultiSelect } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconMail } from '@tabler/icons-react'


interface I {
  tieuDe: string,
  danhSachNguoiNhanId: number[],
  noiDungThongBao: string
}
export default function FieldsetFormTemplate() {
  const form = useForm<I>({
    initialValues: {
      tieuDe: "",
      danhSachNguoiNhanId: [],
      noiDungThongBao: ""
    }
  })

  return (
    <Fieldset legend="Thông báo đăng ký đề tài nghiên cứu khoa học">
      <MyTextInput label="Tiêu đề thogn báo" />
      <MultiSelect multiple data={[{ value: "1", label: "thieutran411@gmail.com" }, { value: "2", label: "phamtien@gmail.com" }]} {...form.getInputProps("danhSachNguoiNhanId")} />
      <MyTextEditor label='Nôi dung thông báo' {...form.getInputProps("noiDungThongBao")} />
      <MyFlexRow>
        <FileInput />
        <Button leftSection={<IconMail />}>Gửi thông báo</Button>
      </MyFlexRow>
    </Fieldset>
  )
}
