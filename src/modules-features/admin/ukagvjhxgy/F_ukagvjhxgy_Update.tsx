
'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { U0MyValidateEmpty } from "@/utils/validateForm"
import { Select } from '@mantine/core'
import { useForm, UseFormReturnType } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

interface ICreateUserViewModel {
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
    trainingLevels?: Array<any>; // Training Levels
    semesters?: Array<any>; // Semesters
    programs?: Array<any>; // Programs
}

export default function F_ukagvjhxgy_Update(
    { values }: { values: ICreateUserViewModel }
) {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["combinedData"],
        queryFn: async () => {
            const [trainingLevelsResponse, semestersResponse, programsResponse, yearResponse] = await Promise.all([
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
            ]);

            const semestersWithYearName = semestersResponse.data.data.map((item: any) => {
                item.coeSemmesterSchoolYearName = item.name + " - " + yearResponse.data.data.find((year: any) => year.id === item.coeSchoolYearId)?.name;
                return item;
            });

            semestersWithYearName.sort((a: any, b: any) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);

                return dateA.getTime() - dateB.getTime();
            });

            return {
                trainingLevels: trainingLevelsResponse.data.data,
                semesters: semestersWithYearName,
                programs: programsResponse.data.data,
            };
        },
    });

    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            ...values
        },
        validate: {
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
    })

    const handleSubmit = async () => {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return;
        }

        // Gửi dữ liệu lên server
        try {
            const formData = {
                id: form.values.id,
                code: form.values.code,
                name: form.values.name,
                concurrencyStamp: form.values.concurrencyStamp,
                isEnabled: true,
                coeSemesterStartId: form.values.coeSemesterStartId,
                coeSemesterEndId: form.values.coeSemesterEndId,
                coeTrainingLevelId: form.values.coeTrainingLevelId,
                coeProgramId: form.values.coeProgramId,
                note: form.values.note,
            };

            await baseAxios.post("/COEGrade/Update", formData);

            queryClient.invalidateQueries({ queryKey: ["F_ukagvjhxgy_Read"] })

        } catch (error) {
            notifications.show({
                message: "Có lỗi xảy ra khi sửa khóa học.",
                color: "red",
            });
        }
    };

    useEffect(() => {
        if (values) {
            form.setValues(values);
        }
    }, [values]);

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={handleSubmit}
            modalSize={"40%"}
        >
            <MyFlexColumn>
                <MyTextInput
                    disabled
                    label="Mã khóa"
                    withAsterisk
                    {...form.getInputProps("code")}
                    error={form.errors.code}
                />
                <MyTextInput
                    label="Tên khóa"
                    withAsterisk
                    {...form.getInputProps("name")}
                    error={form.errors.name}
                />
                {/* <Select 
                    w={"100%"} 
                    label="Khoa quản lý:" 
                    data={[
                            {value: "1",label: "Khoa công nghệ thông tin"},
                            {value: "2",label: "Khoa ngoại ngữ"}
                    ]} 
                    defaultValue={form.getInputProps("manageUnit").value?.toString()} 
                /> */}
                <Select w={"100%"}
                    label="Năm học - Học kì vào:"
                    value={form.getInputProps("coeSemesterStartId").value?.toString()}
                    error={form.errors.coeSemesterStartId}
                    data={data?.semesters?.map((semester: any) => ({
                        value: semester.id.toString(),
                        label: semester.name
                    }))}
                    onChange={(value) => {
                        if (value) {
                            form.setFieldValue("coeSemesterStartId", Number(value));
                        }
                    }} />
                <Select w={"100%"}
                    label="Năm học - Học kì ra:"
                    value={form.getInputProps("coeSemesterEndId").value?.toString()}
                    error={form.errors.coeSemesterEndId}
                    data={data?.semesters?.map((semester: any) => ({
                        value: semester.id.toString(),
                        label: semester.name
                    }))}
                    onChange={(value) => {
                        if (value) {
                            form.setFieldValue("coeSemesterEndId", Number(value));
                        }
                    }}
                />
                <Select
                    w={"100%"}
                    label="Bậc đào tạo:"
                    value={form.getInputProps("coeTrainingLevelId").value?.toString()}
                    error={form.errors.coeTrainingLevelId}
                    data={data?.trainingLevels?.map((level: any) => ({
                        value: level.id.toString(),
                        label: level.name
                    }))}
                    onChange={(value) => {
                        if (value) {
                            form.setFieldValue("coeTrainingLevelId", Number(value));
                        }
                    }}
                />
                <Select
                    w={"100%"}
                    label="Chương trình"
                    value={form.getInputProps("coeProgramId").value?.toString()}
                    error={form.errors.coeProgramId}
                    data={data?.programs?.map((program: any) => ({
                        value: program.id.toString(),
                        label: program.name
                    }))}
                    onChange={(value) => {
                        if (value) {
                            form.setFieldValue("coeProgramId", Number(value));
                        }
                    }}

                />
                <MyTextInput
                    label="Ghi chú"
                    {...form.getInputProps("note")}
                    onChange={(event) => form.setFieldValue("note", event.target.value)}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

