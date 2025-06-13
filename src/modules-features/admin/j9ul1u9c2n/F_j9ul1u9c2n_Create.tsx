'use client'
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { I_j9ul1u9c2n_Read } from './F_j9ul1u9c2n_Read';

export default function F_j9ul1u9c2n_Create() {
    const form = useForm<I_j9ul1u9c2n_Read>({
        initialValues: {
            code: "",
            name: "",
            nameEg: "",
            regulationId: null,
            note: "",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        },
    })

    const GetAllRegulation = useQuery<I_j9ul1u9c2n_Read[]>({
        queryKey: ["F_j9ul1u9c2n_GetAllRegulation"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_j9ul1u9c2n_Read[] }>('/COERegulation/getall');
            return result.data?.data || [];
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/COERegulation/create",
                {
                    ...values,
                })
        }} objectName='Chi tiết Danh mục quy chế'>
            <MyTextInput label='Mã quy chế' {...form.getInputProps("code")} />
            <MyTextInput label='Tên quy chế' {...form.getInputProps("name")} />
            <MyTextInput label='Tên quy chế Eg' {...form.getInputProps("nameEg")} />
            <MySelect label='Trực thuộc' {...form.getInputProps("regulationId")} data={GetAllRegulation.data?.map((item: I_j9ul1u9c2n_Read) => ({
                value: item.id?.toString() || "",
                label: item.name || ""
            })) || []}
                error={form.errors.regulationId}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


