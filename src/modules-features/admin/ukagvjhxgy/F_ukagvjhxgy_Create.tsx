'use client';

import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import baseAxios from "@/api/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { U0MyValidateEmpty } from "@/utils/validateForm";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MySelect from "@/components/Combobox/Select/MySelect";
import { useEffect } from "react";

export interface I_ukagvjhxgy_Create {
    id?: number; // STT
    code?: string; // Mã khóa
    name?: string; // Tên khóa
    coeSemesterStartId?: number; // Học kì bắt đầu
    coeSemesterEndId?: number; // Học kì kết thúc
    coeTrainingLevelId?: number; // 
    coeProgramId?: number;
    coeUnitId?: number;
    note?: string; // Ghi chú
    concurrencyStamp?: string; // ID thay đổi
    isEnabled?: boolean; // Đã xóa
    grade?: Array<any>;
    trainingLevels?: Array<any>; // Bậc đào tạo
    semesters?: Array<any>; // Học kì
    programs?: Array<any>; // Chương trình
}


export default function F_ukagvjhxgy_Create() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["combinedData"],
        queryFn: async () => {
            const [trainingLevelsResponse, semestersResponse, programsResponse, yearResponse, gradeResponse] = await Promise.all([
                baseAxios.get("/COETrainingLevel/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
                baseAxios.get("/COESemester/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
                baseAxios.get("/COEProgram/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
                baseAxios.get("/COESchoolYear/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
                baseAxios.get("/COEGrade/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            const semestersWithYearName = semestersResponse.data.data.map((item: any) => {
                item.coeSemmesterSchoolYearName = item.name;
                return item;
            });

            return {
                grades: gradeResponse.data.data,
                trainingLevels: trainingLevelsResponse.data.data,
                semesters: semestersWithYearName,
                programs: programsResponse.data.data,
            };
        },
    });

    useEffect(() => {
        if (data) {
            form.setValues({
                coeSemesterStartId: data.semesters?.[0]?.id || '',
                coeSemesterEndId: data.semesters?.[0]?.id || '',
                coeTrainingLevelId: data.trainingLevels?.[0]?.id || '',
                coeProgramId: data.programs?.[0]?.id || '',
            });
        }
    }, [data]);

    const form = useForm<I_ukagvjhxgy_Create>({
        initialValues: {
            code: '',
            name: '',
            coeSemesterStartId: data?.semesters[0]?.id,
            coeSemesterEndId: data?.semesters[0]?.id,
            coeTrainingLevelId: data?.trainingLevels && data.trainingLevels[0].id,
            coeProgramId: data?.programs && data.programs[0]?.id,
            note: '',
        },
        validate: {
            code: (value) => {
                if (!value) {
                    return 'Mã không được để trống';
                }

                if (data?.grades && data.grades.some((grade: any) => grade.code === value)) {
                    return 'Mã đã tồn tại';
                }
            },
            name: U0MyValidateEmpty("Tên khóa không được để trống") as any,
            coeSemesterStartId: U0MyValidateEmpty("Học kì không được để trống") as any,
            coeSemesterEndId: (value, values) => {
                if (!value) {
                    return 'Học kì không được để trống';
                }

                const semesterInDate = new Date(data?.semesters.find((item: any) => item.id === values.coeSemesterStartId)?.startDate);
                const semesterOutDate = new Date((data?.semesters.find((item: any) => item.id === value))?.startDate);

                if (semesterOutDate <= semesterInDate) {
                    return 'Học kì ra phải lớn hơn học kì vào';
                }
                return null;
            },
            coeTrainingLevelId: U0MyValidateEmpty("Bậc đào tạo không được để trống") as any,
            coeProgramId: U0MyValidateEmpty("Chương trình không được để trống") as any,
        }
    });

    const handleSubmit = async () => {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return;
        }

        // Gửi dữ liệu lên server
        try {
            const formData = {
                id: 0,
                code: form.values.code,
                name: form.values.name,
                concurrencyStamp: 'string',
                isEnabled: true,
                coeSemesterStartId: form.values.coeSemesterStartId,
                coeSemesterEndId: form.values.coeSemesterEndId,
                coeTrainingLevelId: form.values.coeTrainingLevelId,
                coeProgramId: form.values.coeProgramId,
                note: form.values.note,
            };

            await baseAxios.post("/COEGrade/Create", formData);

            queryClient.invalidateQueries({ queryKey: ["F_ukagvjhxgy_Read"] })

        } catch (error) {
            console.log(error);
            notifications.show({
                message: "Có lỗi xảy ra khi thêm khóa học.",
                color: "red",
            });
        }
    };

    return (
        <MyButtonCreate
            label="Thêm"
            modalSize={"40%"}
            title="Chi tiết Danh mục Khóa"
            onSubmit={handleSubmit}
            form={form}        >
            <MyTextInput
                label="Mã khóa:"
                withAsterisk
                {...form.getInputProps("code")}
                error={form.errors.code} // Show error for 'code'
            />
            <MyTextInput
                label="Tên khóa:"
                withAsterisk
                {...form.getInputProps("name")}
                error={form.errors.name} // Show error for 'name'
            />
            {/* <Select w={"100%"} label="Khoa quản lý:" data={["Ngoại ngữ"]} defaultValue="Ngoại ngữ" /> */}

            <MySelect w={"100%"}
                label="Năm học - Học kì vào:"
                value={form.values.coeSemesterStartId?.toString() || ""}
                error={form.errors.coeSemesterStartId}
                data={data?.semesters?.map((semester: any) => ({
                    value: semester.id.toString(),
                    label: semester.name
                })) || []}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue("coeSemesterStartId", Number(value));
                    }
                }} />
            <MySelect w={"100%"}
                label="Năm học - Học kì ra:"
                value={form.values.coeSemesterEndId?.toString() || ""}
                error={form.errors.coeSemesterEndId}
                data={data?.semesters?.map((semester: any) => ({
                    value: semester.id.toString(),
                    label: semester.name
                })) || []}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue("coeSemesterEndId", Number(value));
                    }
                }}
            />
            <MySelect
                w={"100%"}
                label="Bậc đào tạo:"
                value={form.values.coeTrainingLevelId?.toString() || ""}
                error={form.errors.coeTrainingLevelId}
                data={data?.trainingLevels?.map((level: any) => ({
                    value: level.id.toString(),
                    label: level.name
                })) || []}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue("coeTrainingLevelId", Number(value));
                    }
                }}
            />
            <MySelect
                w={"100%"}
                label="Chương trình"
                value={form.values.coeProgramId?.toString()}
                error={form.errors.coeProgramId}
                data={data?.programs?.map((program: any) => ({
                    value: program.id.toString(),
                    label: program.name
                })) || []}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue("coeProgramId", Number(value));
                    }
                }}

            />
            <MyTextInput
                label="Ghi chú:"
                {...form.getInputProps("note")}
                onChange={(event) => form.setFieldValue("note", event.target.value)} />

        </MyButtonCreate>
    );
}