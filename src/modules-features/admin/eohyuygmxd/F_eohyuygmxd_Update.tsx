'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from '@mantine/form'

export interface Ieohyuygmxd {
    id?: number //STT
    CDR?: number // CDR
    PIsCode?: number // PI
    moTa?: string //Mô tả
    nhomDoLuong?: string // Nhóm đo lường
    courseCode?: string //Mã khóa
    weight?: number
    courseName?: string //Tên khóa 
    chuongTrinh?: string
    khoaQuanLy?: number //Khoa quản lý  
}

export default function F_eohyuygmxd_Update({ dtuong }: { dtuong: Ieohyuygmxd }) {
    const form = useForm<Ieohyuygmxd>({
        initialValues: dtuong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <Select
                label="CĐR"
                data={[
                    { value: "1", label: "PLO1" },
                    { value: "2", label: "PLO2" },
                    { value: "3", label: "PLO3" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("CDR", parseInt(value?.toString()!))}
            />
            <Select
                label="PI"
                data={[
                    { value: "1", label: "PI1.1" },
                    { value: "2", label: "PI1.2" },
                    { value: "3", label: "PI1.3" },
                ]}
                defaultValue={form.values.PIsCode?.toString()}
                onChange={(value) => form.setFieldValue("PIs", parseInt(value?.toString()!))}
            />
            <MyTextInput label='Mô tả' {...form.getInputProps("moTa")} />
            <MySelect label='Nhóm đo lường' data={['Kiến thức', 'Kỹ năng', ' Mức độ tự chủ và trách nhiệm']} {...form.getInputProps("nhomDoLuong")} />
            <MySelect label='Mã Khoá' data={['MKT21', dtuong.courseCode || '']} {...form.getInputProps("maKhoa")} defaultValue={dtuong.courseCode || ''} readOnly />
            <MyTextInput label='Tỷ trọng %' {...form.getInputProps("weight")} />
            <MyTextInput label='Tên khóa' {...form.getInputProps("courseName")} />
            <Select
                label="Khoa quản lý"
                data={[
                    { value: "1", label: "Khoa ngôn ngữ Anh" },
                    { value: "2", label: "Khoa công nghệ thông tin" },
                    { value: "3", label: "Khoa kinh tế" },
                ]}
                defaultValue={form.values.khoaQuanLy?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLy", parseInt(value?.toString()!))}
            />
        </MyActionIconUpdate>
    )
}

