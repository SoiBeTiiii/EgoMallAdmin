import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import { utils_file_fileToAQDocumentType } from "@/utils/file"
import { FileInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
interface IDocument {
    path?: string;
    orderBy?: number;
    documentType?: number;
    promulgateDate?: Date;
    decisionCode?: string;
    departmentName?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    conclusion?: string;
    note?: string;
    documentAttributeId?: number;
    documentAttributeName?: string;
    isCycleCheck?: boolean;
    meetingDate?: Date;
    fileDetail?: {
        fileBase64String?: string,
        fileExtension?: string,
        fileName?: string
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    ngayChinhSua?: Date;
    nguoiChinhSua?: string;
}
interface I extends IDocument {
    file?: File
}
export default function F_core76318_Update({ values }: { values: I }) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            ...values,
            file: new File([], values.path?.split("/")[values.path.split("/").length - 1]!),
            promulgateDate: new Date(values.promulgateDate!)
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/Document/Update", {
                ...values,
                fileDetail: await utils_file_fileToAQDocumentType(values.file!)
            })
        }} >
            <TextInput label="Số quy định" {...form.getInputProps("decisionCode")} />
            <MyDateInput label="Ngày ban hành" {...form.getInputProps("promulgateDate")} />
            <TextInput label="Tên tài liệu" {...form.getInputProps("name")} />
            <FileInput label="Chọn file" {...form.getInputProps("file")} />
        </MyActionIconUpdate>

    )
}
