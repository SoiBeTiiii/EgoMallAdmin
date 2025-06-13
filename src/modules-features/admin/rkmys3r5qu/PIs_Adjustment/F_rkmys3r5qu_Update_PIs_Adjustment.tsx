'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
interface IF_rkmys3r5qu_PIs {
    id: number,
    PIsCode: string;
    PIsPercentage: number;
    descriptionPage2: string
}
interface IF_rkmys3r5qu_PIs_Adjustment {
    id?: number;
    code?: string;
    name?: string;
    courseCode?: string;
    falcutyCode?: string;
    PLOCode?: string;
    PLOPercentage?: number;
    descriptionPage1?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
    PIs: IF_rkmys3r5qu_PIs[];
}
interface IF_rkmys3r5qu_Update_PIs_Adjustment {
    PLOId?: number,
    PIsId?: number
    PLOCode?: string,
    PLOPercentage?: number,
    PIsCode?: string,
    PIsPercentage?: number,
    descriptionPage2?: string
}

export default function F_rkmys3r5qu_Update_PIs_Adjustment({ dataPi, dataPLO }: { dataPi: IF_rkmys3r5qu_PIs, dataPLO: IF_rkmys3r5qu_PIs_Adjustment }) {
    const form = useForm<IF_rkmys3r5qu_Update_PIs_Adjustment>({
        initialValues: {
            PIsId: dataPi.id,
            PLOId: dataPLO.id,
            PLOCode: dataPLO.PLOCode,
            PLOPercentage: dataPLO.PLOPercentage,
            PIsCode: dataPi.PIsCode,
            PIsPercentage: dataPi.PIsPercentage,
            descriptionPage2: dataPi.descriptionPage2
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã PLO' {...form.getInputProps("PLOCode")} readOnly />
            <MyTextInput disabled label='Mã PIs' {...form.getInputProps("PIsCode")} readOnly />
            <MyTextArea label='Mô tả' {...form.getInputProps("descriptionPage2")} />
            <MyNumberInput label='Tỷ trọng PI' {...form.getInputProps("PIsPercentage")} />
        </MyActionIconUpdate>
    )
}