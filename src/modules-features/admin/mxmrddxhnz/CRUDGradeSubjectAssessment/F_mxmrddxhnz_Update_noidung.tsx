"use client"
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
export default function F_mxmrddxhnz_Update_noidung({ data }: { data: any }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<any>({
        initialValues: data,
        validate: {

            hinhThucDanhGia: (value) => value ? null : 'Không được để trống',

            noiDungDanhGia: (value) => value ? null : 'Không được để trống',
            CLOi: (value) => value ? null : 'Không được để trống',
            thoiDiemDanhGia: (value) => value ? null : 'Không được để trống',
            phuongPhapDanhGia: (value) => value ? null : 'Không được để trống',
            congCuDanhGia: (value) => value ? null : 'Không được để trống',
            thoiGianDanhGia: (value) => value ? null : 'Không được để trống',
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
            <MyActionIconUpdate form={form} onSubmit={() => { }} >
                <MySelect label="Hình thức đánh giá"
                    data={[
                        { value: "Chuyên cần", label: 'CC - Chuyên cần' },
                        { value: "Quá trình", label: 'QT - Quá trình' },
                        { value: "Cuối kỳ", label: 'CK - Cuối kỳ' },
                    ]}
                    defaultValue={data.hinhThucDanhGia}
                    onChange={(value) => form.setFieldValue("hinhThucDanhGia", value?.toString()!)}
                />
                <MyTextInput label="Nội dung đánh giá" {...form.getInputProps("noiDungDanhGia")} />
                <MyTextInput label="Thời điểm đánh giá" {...form.getInputProps("thoiDiemDanhGia")} />

                <MySelect label="Phương pháp đánh giá"
                    data={[
                        { value: "Trắc nghiệm", label: 'Trắc nghiệm' },
                        { value: "Tự luận", label: 'Tự luận' },
                        { value: "Trắc nghiệm + tự luận", label: 'Trắc nghiệm + tự luận' },
                        { value: "Tiểu luận", label: 'Tiểu luận' },
                        { value: "Vấn đáp", label: 'Vấn đáp' },
                        { value: "Điểm danh", label: 'Điểm danh' },
                    ]}
                    defaultValue={data.phuongPhapDanhGia}
                    onChange={(value) => form.setFieldValue("phuongPhapDanhGia", value?.toString()!)}
                />
                <MyTextInput label="CLO" {...form.getInputProps("CLOi")} />
                <MyTextInput label="Thời gian đánh giá (phút)" {...form.getInputProps("thoiGianDanhGia")} />
                <MySelect label="Loại công cụ đánh giá"
                    data={[
                        { value: "Rubrics", label: 'Rubrics' },
                        { value: "Ma trận câu hỏi", label: 'Ma trận câu hỏi' },

                    ]}
                    defaultValue={data.congCuDanhGia}
                    onChange={(value) => form.setFieldValue("congCuDanhGia", value?.toString()!)}
                />
            </MyActionIconUpdate>
        </Group>
    )
}

