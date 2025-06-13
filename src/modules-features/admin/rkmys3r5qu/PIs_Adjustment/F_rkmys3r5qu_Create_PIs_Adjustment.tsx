'use client'
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

interface IF_rkmys3r5qu_Create_PIs_Adjustment {
    PLOId?: number,
    PIsId?: number
    PLOCode?: string,
    PLOPercentage?: number,
    PIsCode?: string,
    PIsPercentage?: number,
    descriptionPage2?: string
}

export default function F_rkmys3r5qu_Create_PIs_Adjustment() {
    const form = useForm<IF_rkmys3r5qu_Create_PIs_Adjustment>({
    })
    const dis = useDisclosure()
    return (
        <MyButtonModal crudType='create' onSubmit={() => { }} disclosure={dis} mt={10} mb={10} ml={10}>
            <MyTextInput label='Mã PLO' {...form.getInputProps("PLOCode")} />
            <MyTextInput label='Mã PIs' {...form.getInputProps("PIsCode")} />
            <MyTextArea label='Mô tả' {...form.getInputProps("descriptionPage2")} />
            <MyNumberInput label='Tỷ trọng PI' {...form.getInputProps("PIsPercentage")} />
            <Button>Lưu </Button>
        </MyButtonModal>
    )
}