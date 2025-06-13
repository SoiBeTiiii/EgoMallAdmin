"use client"
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { ICreateAssessmentViewModel } from "./Interface";

// interface ICreateAssessmentViewModel {
//     id?: number;
//     code?: string;
//     name?: string;
//     concurrencyStamp?: string;
//     isEnabled?: boolean;
//     coeSubjectFormulaId?: number;
//     content?: string;
//     assessmentWhen?: string;
//     assessmentDuration?: string;
//     assessmentTool?: number;
//     questionType?: number;
//     coeGradeSubjectId?: number;
//     coeSubjectMethods?: {
//         id?: number;
//         code?: string;
//         name?: string;
//         concurrencyStamp?: string;
//         isEnabled?: boolean;
//         coeSubjectAssessmentId?: number;
//         coecloId?: number;
//         questionQuantity?: number;
//         maxPoint?: number;
//     }[];
// }

export default function CreateAssessment() {
    const form = useForm<ICreateAssessmentViewModel>({
        initialValues: {
            id: 0,
            code: null,
            name: null,
            isEnabled: true,
            content: null,
            assessmentWhen: null,
            assessmentDuration: null,
            assessmentTool: null,
            questionType: null,
            coeSubjectFormulaId: null,
            coeGradeSubjectId: null,
            coeSubjectMethods: []
        },
        validate: {
        }
    })
    const disc = useDisclosure(false)

    return (
        <Group>
            <MyButtonModal
                label="Thêm"
                modalSize={"40%"}
                disclosure={disc}
                title="Chi tiết nội dung đánh giá"
                onSubmit={() => {

                }}
            >
                <MySelect label="Hình thức đánh giá"
                    data={[
                        { value: "CC", label: 'CC - Chuyên cần' },
                        { value: "QT", label: 'QT - Quá trình' },
                        { value: "CK", label: 'CK - Cuối kỳ' },
                    ]}
                    defaultValue={"CC"}
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
                    defaultValue={"Trắc nghiệm"}
                    onChange={(value) => form.setFieldValue("phuongPhapDanhGia", value?.toString()!)}
                />
                <MyTextInput label="CLO" {...form.getInputProps("CLOi")} />
                <MyTextInput label="Thời gian đánh giá (phút)" {...form.getInputProps("thoiGianDanhGia")} />
                <MySelect label="Loại công cụ đánh giá"
                    data={[
                        { value: "Rubrics", label: 'Rubrics' },
                        { value: "Ma trận câu hỏi", label: 'Ma trận câu hỏi' },

                    ]}
                    defaultValue={"Rubrics"}
                    onChange={(value) => form.setFieldValue("congCuDanhGia", value?.toString()!)}
                />
                <Button>
                    Thêm
                </Button>
            </MyButtonModal>
        </Group>
    )
}

