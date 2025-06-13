import baseAxios from "@/api/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import useQ_COESubject_GetAll from "@/hooks/query-hooks/COESubject/useQ_COESubject_GetAll";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export default function F_hlnya90qi9_CreateSubjects({
    availableSemester,
    trainingProgramId,
    subjectGroupData
}: {
    availableSemester: ICoeSemester[],
    trainingProgramId: number,
    subjectGroupData: ICoeSubjectGroup[]
}) {
    const form = useForm<ICoeGradeSubject>({
        initialValues: {
            "id": 0,
            "code": "string",
            "name": "string",
            "concurrencyStamp": "string",
            "isEnabled": true,
            "coeGradeId": trainingProgramId,
            "coeSubjectId": 0,
            "coeSemesterId": 0,
            "coeSubjectGroupId": 0,
            "coeSubject": {
                nameEg: "",
                numberPeriod: 0,
                numberCredit: 0,
                coeUnitId: 0,
                note: "",
                coeUnit: {
                    name: ""
                }
            },
            "order": 0,
            "isCore": null,
            courseSectionQuantity: 0
        },
        validate: {
            "coeSubjectId": (value) => (value === 0) && 'Vui lòng chọn môn học',
            "coeSemesterId": (value) => (value === 0) && 'Vui lòng chọn học kì',
            "coeSubjectGroupId": (value) => (value === 0) && 'Vui lòng chọn nhóm môn học',
            "order": (value) => (value === 0) && 'Không được có giá trị 0',
        }
    }
    );
    const params = `?COEGradeId=${trainingProgramId}&cols=COESemester,COESubjectGroup,COESubject`
    const ENDPOINT = "/COEGradeSubject/GetSubjectByGrade"
    const SubjectAllQuery = useQ_COESubject_GetAll(true);
    const queryClient = useQueryClient();
    const disAddCourse = useDisclosure();  // Add course modal

    useEffect(() => {
        console.log('coeSubjectGroupId', form.values.coeSubjectGroupId);
        if (!SubjectAllQuery.data) return;
        const selectedId = Number(form.values.coeSubjectId);
        const selectedSubject = SubjectAllQuery.data && SubjectAllQuery.data.find((item) => item.id === selectedId)
        if (selectedSubject) {
            form.setFieldValue("coeSubject", {
                nameEg: selectedSubject.nameEg || "",
                numberPeriod: selectedSubject.numberPeriod || 0,
                numberCredit: selectedSubject.numberCredit || 0,
                coeUnitId: selectedSubject.coeUnitId || 0,
                note: selectedSubject.note || "",
                coeUnit: {
                    name: selectedSubject.coeUnit?.name || ""
                }
            });
        } else {
            form.setFieldValue("coeSubject", {
                nameEg: "",
                numberPeriod: 0,
                numberCredit: 0,
                coeUnitId: 0,
                note: "",
                coeUnit: {
                    name: ""
                }
            });
        }
    }, [form.values.coeSubjectId, SubjectAllQuery.data])
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await baseAxios.post(`/COEGradeSubject/Create`, form.values);
            if (res.data.isSuccess == 0) throw new Error(res.data.data[""])
            return res
        },
        onSuccess: (response) => {
            if (response && response.data.isSuccess !== 0) {
                queryClient.invalidateQueries({ queryKey: [`${ENDPOINT}${params}`] });
                queryClient.invalidateQueries({ queryKey: [`/COEGrade/GetSource`] });
                notifications.show({
                    message: "Lưu thành công",
                });
            } else {
                const errorMessage = response?.data || 'Lỗi khi lưu dữ liệu';
                notifications.show({
                    message: errorMessage,
                    color: 'red',
                });
            }
        },
        onError: (error) => {
            let errorMessage = 'Có lỗi xảy ra!';
            if (error instanceof AxiosError) {
                if (error.response) {
                    errorMessage = error.response.data?.message || 'Lỗi từ server!';
                } else if (error.request) {
                    errorMessage = 'Không thể kết nối với server';
                } else {
                    errorMessage = error.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = 'Lỗi không xác định';
            }
        },
    })
    return (
        <>
            <MyButtonModal
                label="Thêm"
                modalSize={"75%"}
                disclosure={disAddCourse}
                title="Chi tiết môn học thuộc chương trình đào tạo khóa"
                onSubmit={() => {
                }}
            >
                <Select
                    w={"100%"}
                    data={SubjectAllQuery.data?.map((item) => {
                        console.log('item', item);
                        return ({
                            value: item.id?.toString() || "",
                            label: item.name || ""
                        })
                    }) || []}
                    label="Môn học"
                    {...form.getInputProps("coeSubjectId")}
                />
                <TextInput
                    w={"100%"}
                    label="Tên môn học Eg"
                    {...form.getInputProps("coeSubject.nameEg")}
                    readOnly
                    disabled
                />
                <NumberInput
                    w={"100%"}
                    label="Thứ tự"
                    {...form.getInputProps("order")}
                />
                <Select
                    w={"100%"}
                    label="Năm học - Học kỳ"
                    data={
                        availableSemester
                        && availableSemester.map((s) => ({
                            value: s.id?.toString() || "",
                            label: s.name || ""
                        })) || []}
                    {...form.getInputProps("coeSemesterId")}
                />
                <Select
                    w={"100%"}
                    label="Nhóm môn học"
                    data={subjectGroupData && subjectGroupData.map((item) => ({
                        value: item.id?.toString() || "",
                        label: item.name || ""
                    })) || []}
                    {...form.getInputProps("coeSubjectGroupId")} />
                <TextInput
                    w={"100%"}
                    label="Số tiết"
                    {...form.getInputProps("coeSubject.numberPeriod")}
                    readOnly
                    disabled
                />
                <TextInput
                    w={"100%"}
                    label="Số tín chỉ"
                    readOnly
                    disabled
                    {...form.getInputProps("coeSubject.numberCredit")}
                />
                <TextInput
                    w={"100%"}
                    label="Khoa quản lý"
                    readOnly
                    disabled
                    {...form.getInputProps("coeSubject.coeUnit.name")}
                />
                <Button
                    leftSection={<IconPlus />}
                    onClick={async () => {
                        const validationResult = form.validate();
                        if (validationResult.hasErrors) {
                            notifications.show({
                                message: 'Vui lòng kiểm tra các trường nhập liệu',
                                color: 'red',
                            });
                            return;
                        }
                        try {
                            disAddCourse[1].close()
                            await mutation.mutateAsync();
                        } catch (error) {
                            let errorMessage = 'Có lỗi xảy ra!';
                            if (error instanceof AxiosError) {
                                if (error.response) {
                                    errorMessage = error.response.data?.message || 'Lỗi từ server!';
                                } else if (error.request) {
                                    errorMessage = 'Không thể kết nối với server';
                                } else {
                                    errorMessage = error.message;
                                }
                            } else if (error instanceof Error) {

                                errorMessage = error.message;
                            } else {
                                errorMessage = 'Lỗi không xác định';
                            }
                            notifications.show({
                                message: errorMessage,
                                color: 'red'
                            });
                        }
                    }}>
                    Lưu
                </Button>
            </MyButtonModal>

        </>
    )
}

