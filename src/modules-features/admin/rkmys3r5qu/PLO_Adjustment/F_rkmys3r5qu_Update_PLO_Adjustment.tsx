'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
interface IF_rkmys3r5qu_Read {
    id?: number;
    code?: string;
    name?: string;
    courseCode?: string;
    falcutyCode?: string;
    PLOCode?: string;
    PLOPercentage?: number;
    descriptionPage1?: string;
    PIsCode?: string;
    PIsPercentage?: number;
    descriptionPage2?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_rkmys3r5qu_Update_PLO_Adjustment({ data }: { data: IF_rkmys3r5qu_Read }) {
    const form = useForm<IF_rkmys3r5qu_Read>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã PLO' {...form.getInputProps("PLOCode")} readOnly />
            <MyTextArea label='Mô tả' {...form.getInputProps("descriptionPage1")} />
            <MyNumberInput label='Tỷ trọng PLO' {...form.getInputProps("PLOPercentage")} />
        </MyActionIconUpdate>
    )
}