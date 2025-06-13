"use client"
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import useM_COEClassStudent_Create from '@/hooks/mutation-hooks/COEClassStudent/useM_COEClassStudent_Create';
import { utils_notification_show } from '@/utils/notification';
import { Group, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';


export default function F_4ltk4f68a8_Student_Create({ data }: { data: ICOEClass }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure()
    const studentMutation = useM_COEClassStudent_Create()

    const form = useForm<any>({
        initialValues: {
            coeCourseSection: {
                code: data.code
            },
            code: "",
            fullName: "",
            dateOfBirth: undefined,
            gender: 1
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            fullName: (value) => value ? null : 'Không được để trống',
        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);

    return (
        <Group>
            <MyButtonModal
                crudType='create'
                title='Chi tiết sinh viên' disclosure={disc}>

                <form onSubmit={form.onSubmit(value => {
                    const body = {
                        id: 0,
                        email: '',
                        code: value.code,
                        username: `coe${value.code}`,
                        passwordHash: ``,
                        name: value.fullName,
                        isEnabled: true,
                        passWord: "123456",
                        gender: value.gender,
                        fullName: value.fullName,
                        dateOfBirth: value.dateOfBirth,
                        coeClassId: data.id,
                        isBlocked: true,
                        roleId: null,
                        address: null,
                        avatarPath: null,
                        lockoutEnd: "2025-04-02T06:50:09.401Z",
                        securityStamp: "string",
                        expiresDate: "2025-04-02T06:50:09.401Z",
                        facultyId: null,
                        majorsId: null,
                        classId: null,
                        workingUnitId: null,
                        aqModuleId: 5,
                        educationLevel: 0,
                        teachingStatus: 0,
                        userBranch: null
                    }


                    studentMutation.mutate(body, {
                        onSuccess: () => {
                            utils_notification_show({ crudType: 'create', })
                            form.reset()
                            disc[1].close()
                        }
                    })
                })}>
                    <MyTextInput disabled label="Mã lớp" {...form.getInputProps("coeCourseSection.code")} />
                    <MyTextInput label="Mã sinh viên" {...form.getInputProps("code")} />
                    <MyTextInput label="Họ tên" {...form.getInputProps("fullName")} />
                    <DateInput label="Ngày sinh" {...form.getInputProps("dateOfBirth")} />
                    <Select
                        label="Giới tính"
                        data={[
                            { value: "1", label: "Nam" },
                            { value: "2", label: "Nữ" },
                        ]}
                        defaultValue={1?.toString()}
                        onChange={(value) => form.setFieldValue("gender", parseInt(value?.toString()!))}
                    />
                    <Group grow mt={5}>

                        <MyButton crudType="create" type="submit" />
                    </Group>
                </form>
            </MyButtonModal>
        </Group>
    );
}