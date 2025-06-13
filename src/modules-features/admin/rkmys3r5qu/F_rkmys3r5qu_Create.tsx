"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
interface ICreateUserViewModel {
    id?: number;
    maMonHoc?: string;
    tenMonHoc?: string;
    soTiet?: number;
    donViQuanLy?: number;
    tinhChatPhong?: number;
    note?: string;
}
export default function F_rkmys3r5qu_Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            maMonHoc: "",
            tenMonHoc: "",
            soTiet: 0,
            tinhChatPhong: 0,
            donViQuanLy: 0
        },
        validate: {
            maMonHoc: (value) => value ? null : 'Không được để trống',
            tenMonHoc: (value) => value ? null : 'Không được để trống',
            soTiet: (value) => value ? null : 'Không được để trống',
            tinhChatPhong: (value) => value ? null : 'Không được để trống',
            donViQuanLy: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyButtonCreate
                objectName='danh mục môn học'
                form={form}
                onSubmit={
                    () => {
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>
                <MyTextInput label="Mã môn học" {...form.getInputProps("maTrungTam")} />
                <MyTextInput label="Tên môn học" {...form.getInputProps("tenTrungTam")} />
                <MyNumberInput label="Nhập số tiết" {...form.getInputProps("tenTrungTam")} />
                <Select
                    label="Đơn vị quản lý"
                    data={[
                        { value: "1", label: "Khoa công nghệ thông tin" },
                        { value: "2", label: "Khoa ngoại ngữ" },
                        { value: "3", label: "Khoa kinh tế" },
                    ]}
                    defaultValue={1?.toString()}
                    onChange={(value) => form.setFieldValue("donViQuanLy", parseInt(value?.toString()!))}
                />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    )
}

