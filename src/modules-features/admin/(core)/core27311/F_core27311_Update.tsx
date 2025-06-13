import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { OBJECT_DOCUMENT_TYPES } from "@/constants/object/documentTypes"
import F12_1Select from "@/modules-features/admin/(core)/core18256/F_core18256_Select"
import { utils_file_fileToAQDocumentType } from "@/utils/file"
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
export default function F_core27311_Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: {
            ...values,
            file: new File([], values.path?.split("/")[values.path.split("/").length - 1]!),
            promulgateDate: new Date(values.promulgateDate!),
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/Document/Update", {
                ...values,
                fileDetail: await utils_file_fileToAQDocumentType(values.file!)
            })
        }} >
            <MyTextInput label="Số quy định" {...form.getInputProps("decisionCode")} />
            <MyDateInput label="Ngày ban hành" {...form.getInputProps("promulgateDate")} />
            <MyTextInput label="Tên tài liệu" {...form.getInputProps("name")} />
            <F12_1Select label="Loại văn bản" documentTypeId={OBJECT_DOCUMENT_TYPES.Regulations} {...form.getInputProps("documentAttributeId")} />
            <MyFileInput label="Văn bản" {...form.getInputProps("file")} />
            <MyNumberInput label="Thứ tự hiển thị trên danh sách" {...form.getInputProps("orderBy")} />
        </MyActionIconUpdate>

    )
}
